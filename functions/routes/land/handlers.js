const {database} = require('./../../connection');
const {responseToClient} = require('./../../response');

let postLandHandler = (req, res, next) => {
    let ref = database.ref('land/').child(req.body.username);
    let key = ref.push().key;

    let landData = req.body;
    landData['keyId'] = key;

    return ref.child(key).set(landData, (error) => {
        if (error) {
            res.json(responseToClient('fail', 'Land not Added.'));
        } else {
            res.json(responseToClient('success', 'Land Added Successfully.'));
        }
    });
};

let getLandHandler = (req, res, next) => {
    let username = req.params.username;
    let ref = database.ref('land/' + username);

    let values = [];

    return ref.orderByChild('username').equalTo(username)
        .once('value', (snapshot) => {
            if (snapshot.val() == null) {
                res.status(204).send();
            } else {
                for (let k in snapshot.val()) {
                    values.push(snapshot.val()[k]);
                }
                res.status(200).json(values);
            }
        });
};

module.exports.postLandHandler = postLandHandler;
module.exports.getLandHandler = getLandHandler;