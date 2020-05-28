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

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Welcome to ZDG Chat',
    })
});







app.listen(PORT, () => {
    console.log(`Listening. Open http://localhost:${PORT} to view.`);
});