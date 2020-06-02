const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const db = require('./models');
const bcrypt = require('bcrypt');
const PORT = process.env.PORT || 3000;
const SequelizeStore = require('connect-session-sequelize')(session.Store);

var app = express();
const http = require('http').createServer(app);
const io = require('socket.io').listen(http);
let people = {};
let sockets = {};
let rooms = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

function checkAuthentication(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/');
    }
}

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const store = new SequelizeStore({ db: db.sequelize });
const socketMiddleware = session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      // secure: true,
        maxAge: 31536000000,
    }
});

io.use((socket, next) => {
    socketMiddleware(socket.request, socket.request.res || {}, next);
});

app.use(socketMiddleware);

store.sync();

app.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/mainroom')
    } else {
        res.render('index', {
            title: 'Welcome to ZDG Chat',
        })
    }
})

app.get('/logout', function (req, res, next) {
    if (req.session) {
        req.session.destroy(function(err) {
        if(err) {
            return next(err);
        } else {
            return res.redirect('/');
        }
    });
    }
})

app.get('/mainroom', checkAuthentication, (req, res) => {
    const username = req.session.user.username
    db.User.findOne( {where: { username: username } })
    .then((User) => {
        res.render('mainchat', {
            title: 'ZDG Chat Main Room',
            name: username
        })
    })
});

app.get('/codingroom', function (req, res, next) {
    const username = req.session.user.username
    db.User.findOne( {where: { username: username } })
    db.Message.findAll({
        where: {
            RoomId: 1
        }, 
        include: [
            db.User
        ]})
        .then((results) => {
            res.render('codingchat', {
                title: 'Coding Room',
                messages: results,
                name: username
            })
        })
    
})

app.get('/atlantaroom', function (req, res, next) {
    const username = req.session.user.username
    db.User.findOne( {where: { username: username } })
    db.Message.findAll({
        where: {
            RoomId: 3
        }, 
        include: [
            db.User
        ]})
    .then((results) => {
        res.render('atlantachat', {
            title: 'Atlanta Room',
            messages: results,
            name: username
        })
    })
});

app.get('/petroom', function (req, res, next) {
    const username = req.session.user.username
    db.User.findOne( {where: { username: username } })
    db.Message.findAll({
        where: {
            RoomId: 2
        }, 
        include: [
            db.User
        ]
    })
    .then((results) => {
        res.render('petchat', {
            title: 'Pet Room',
            messages: results,
            name: username
        })
    })
});

app.get('/private', (req, res) => {
    const username = req.session.user.username
    res.render('private', {
        title: 'Private Chat',
        name: username
    })
})

app.post('/signup', (req, res) => {
    const { username, email, password } = req.body
    bcrypt.hash(password, 10, (err, hash) => {
        db.User.create({
            username: username,
            email: email, 
            password: hash,
        }).then((result) => {
            res.redirect('/');
        });
    });
});

app.post('/signin', (req, res) => {
    const { username, password } = req.body;
    db.User.findOne( {where: { username: username } })
        .then(User => {
            bcrypt.compare(password, User.password, (err, match) => {
                if (match) {
                    req.session.user = {
                        userID: User.id,
                        username: User.username,
                        email: User.email
                    };
                    res.redirect('/mainroom');
                }
                else {
                    res.send('Incorrect Password')
                }
            })
        })
        .catch(() => {
            res.send('Username not found');
        })
});

io.on('connection', (socket) => {
    let name = "";
    let id = "";
    if (socket.request.session.user) {
        name = socket.request.session.user.username
        id = socket.request.session.user.userID
        socket.on('join', (room) => {  
            people[id] = { name, room };
            sockets[id] = socket.id;
            socket.emit('chat message', `You have joined the chat. Hi ${people[id].name}!`);
            // socket.broadcast.emit('chat message', `${people[id].name} has joined the ${room}.`)
            io.emit('emitParticipants', people);
        });

        socket.on('disconnect', () => {
            if (sockets[id] != undefined) {
                // io.emit('chat message', `${name} has left the room.`);
                delete sockets[id];
                delete people[id];
                io.emit('emitParticipants', people);
            }
        });

        socket.on('chat message', (data) => {
            io.emit('chat message', `${name} says: ${data}`);
        });

        socket.on('private message', (data) => {
            io.to(sockets[data.id]).emit('private message', {
                name: people[id].name,
                message: data.message
            });
        });

        socket.on('pet message', (data) => {
            db.Message.create({
                content: data,
                RoomId: 2, 
                UserId: id,
            }).then((result) => {
                io.emit('pet message', `${name} says: ${data}`);
            });
        });

        socket.on('Atlanta message', (data) => {
            db.Message.create({
                content: data,
                RoomId: 3, 
                UserId: id,
            }).then((result) => {
                io.emit('Atlanta message', `${name} says: ${data}`);
            });
        });

        socket.on('coding message', (data) => {
            db.Message.create({
                content: data,
                RoomId: 1, 
                UserId: id,
            }).then((result) => {
                io.emit('coding message', `${name} says: ${data}`);
            });
        });
    
        socket.on('typing', (data) => {
            if (data.typing == true) {
            data.user = name;
            io.emit('display', data)
            } else {
            io.emit('display', data);
            }
        })
    };
});

http.listen(PORT, () => {
    console.log(`Listening. Open http://localhost:${PORT} to view.`);
});