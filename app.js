const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const db = require('./models');
const bcrypt = require('bcrypt');
const PORT = process.env.PORT || 3000;

var app = express();
const http = require('http').createServer(app);
const io = require('socket.io').listen(http);
let people = [];
let peopleDict = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// function checkAuthentication(req, res, next) {
//     if (req.session.user) {
//         next();
//     } else {
//         res.redirect('/users/login');
//     }
// }

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    // secure: true,
    maxAge: 31536000000,
  }
}));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Welcome to ZDG Chat',
    })
})

app.get('/logout', function(req, res, next) {
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



// app.get('/mainroom', checkAuthentication, (req, res) => {
//     console.log(User)
//     res.render('mainchat', {
//         title: 'ZDG Chat Main Room',
//         name: User.username
//     })
// })

app.get('/mainroom', (req, res) => {
    const username = req.session.user.username
    db.User.findOne( {where: { username: username } })
    .then((User) => {
        // let name = username
        res.render('mainchat', {
            title: 'ZDG Chat Main Room',
            name: username
        })
        return User
    })
});


app.get('/codingroom', function (req, res, next) {
    db.Message.findAll({
        where: {
            RoomId: 1
        }})
        .then((results) => {
            res.render('codingchat', {
                title: 'Coding Room',
                messages: results
            })
        })
    
})


app.get('/atlantaroom', function (req, res, next) {
    db.Message.findAll({
        where: {
            RoomId: 3
        }})
        .then((results) => {
            res.render('atlantachat', {
                title: 'Atlanta Room',
                messages: results
            })
        })
})

app.get('/petroom', function (req, res, next) {
    db.Message.findAll({
        where: {
            RoomId: 2
        }})
        .then((results) => {
            res.render('petchat', {
                title: 'Pet Room',
                messages: results
            })
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
                    req.session.user = User;
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
})

io.on('connection', (socket) => {
    console.log('yooooo!')
    socket.on('join', (name) => {
        console.log('this is a test')
        // console.log(res)
        // console.log(username)
        // people.push(name);
        // peopleDict[socket.id] = name;
        // console.log(peopleDict)
        socket.emit('chat message', `You have joined the chat. Hi ${name}!`);
        socket.broadcast.emit('chat message', `${name} has joined the chat.`)
        io.emit('emitParticipants', people);
    });

    // socket.on('disconnect', () => {
    //     let offline = peopleDict[socket.id];
    //     if (peopleDict[socket.id] != undefined) {
    //     socket.broadcast.emit('chat message', `${peopleDict[socket.id]} has left the chat.`);
    //     let updatedPeople = people.filter(item => {
    //         return item != offline;
    //     });
    //     people = updatedPeople
    //     io.emit('emitParticipants', people);
    //     }
    // });

    socket.on('chat message', (data) => {
        // console.log("helllo i exist")
        socket.emit('chat message', `Joe says: ${data}`);
        // io.emit('chat message', `${username} says: ${data}`);
    });

    // socket.on('typing', (data) => {
    //     if (data.typing == true) {
    //     data.user = peopleDict[socket.id];
    //     io.emit('display', data)
    //     } else {
    //     io.emit('display', data);
    //     }
    // })
});

http.listen(PORT, () => {
    console.log(`Listening. Open http://localhost:${PORT} to view.`);
});