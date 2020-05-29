const express = require('express');
const bodyParser = require('body-parser');
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

<<<<<<< HEAD
app.get('/', (req, res) => {
    res.render('livingroom', {
        title: 'Welcome to ZDG Chat',
    })
});
=======
app.get('/mainroom', (req, res) => {
    res.render('mainchat', {
        title: 'ZDG Chat Main Room',
    })
})


>>>>>>> 234c21dd1ace7e42c0ad71fe3eaf7260d5843d1a







app.listen(PORT, () => {
    console.log(`Listening. Open http://localhost:${PORT} to view.`);
});