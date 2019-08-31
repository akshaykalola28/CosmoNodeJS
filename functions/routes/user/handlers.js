const {database} = require('./../../connection');
const {responseToClient} = require('./../../response');

let postRegisterHandler = (req, res, next) => {

    let phone = req.body.phone;

    let jsonRegisterData = req.body;
    console.log(jsonRegisterData);

    let ref = database.ref('users/farmer');

    return ref.once('value', (snapshot) => {
        if (snapshot.hasChild(phone)) {
            res.json(responseToClient('dup', 'User Already Exists.'));
        } else {
            return ref.child(phone).set(jsonRegisterData, (error) => {
                if (error) {
                    res.json(responseToClient('error', error));
                } else {
                    res.json(responseToClient('success', jsonRegisterData));
                }
            });
        }
    });
};

let postLoginHandler = (req, res, next) => {

    const loginData = {
        username: req.body.username
    };

    let ref = database.ref('users/farmer');
    let data = [];

    return ref.orderByChild("phone").equalTo(loginData.username)
        .on('value', (snapshot) => {
            if (snapshot.val() == null) {
                return ref.orderByChild("email").equalTo(loginData.username)
                    .on('value', (snapshot) => {
                        if (snapshot.val() == null) {
                            res.json(responseToClient('fail', "User Doesn't Exists."));
                        } else {
                            for (let k in snapshot.val()) {
                                data.push(snapshot.val()[k]);
                            }
                            res.json(responseToClient('success', data));
                        }
                    });
            } else {
                for (let k in snapshot.val()) {
                    data.push(snapshot.val()[k]);
                }
                res.json(responseToClient('success', data));
            }
        });
};

module.exports.postLoginHandler = postLoginHandler;
module.exports.postRegisterHandler = postRegisterHandler;