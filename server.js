const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Simulasi database pengguna
const users = [];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    users.push({ username, password });
    res.redirect('/');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.redirect('/home');
    } else {
        res.send('<h1>Login Gagal!</h1><a href="/">Coba Lagi</a>');
    }
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/todo', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'todo.html'));
});

// Jalankan server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
 