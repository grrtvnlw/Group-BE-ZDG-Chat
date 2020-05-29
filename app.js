const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const bcrypt = require('bcrypt');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.set('view engine', 'ejs')
app.set('views', 'views')

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Welcome to ZDG Chat',
    })
})

app.get('/mainroom', (req, res) => {
    res.render('mainchat', {
        title: 'ZDG Chat Main Room',
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
                    // req.session.user = User;
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







app.listen(PORT, () => {
    console.log(`Listening. Open http://localhost:${PORT} to view.`);
});