const {database} = require('./../../connection');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/signup', (req, res) => {
    res.render('signup', {user: 'Akshay Kalola'});
});

router.post('/auth', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (username === 'admin' && password === 'admin') {
        console.log('Login Success.');
        res.redirect('/dashboard');
    } else {
        res.redirect('/');
    }
    res.end();
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard', {user: 'username'});
});

router.get('/add-product', (req, res) => {
    res.render('add-product');
});

router.get('/farmers', (req, res) => {
    let ref = database.ref('users/farmer');
    let values = [];

    return ref.once('value', (snapshot) => {
        for (let k in snapshot.val()) {
            values.push(snapshot.val()[k]);
        }
        res.render('farmers', {
            users: values
        });
    });
});

router.post('/farmer/details', (req, res) => {
    let ref = database.ref('users/farmer');
    let data = [];

    return ref.orderByChild("phone").equalTo(req.body.id)
        .on('value', (snapshot) => {
            if (snapshot.val() == null) {
                res.end('Done');
            } else {
                for (let k in snapshot.val()) {
                    data.push(snapshot.val()[k]);
                }
                res.render('farmer-details', {
                    value: data[0]
                });
            }
        });
});

router.get('/blank', (req, res) => {
    res.render('blank');
});

router.get('/font', (req, res) => {
    res.render('fontawesome');
});

module.exports = router;