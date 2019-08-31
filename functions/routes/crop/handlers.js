const {database} = require('./../../connection');
const {responseToClient} = require('./../../response');

let postCropHandler = (req, res, next) => {
    let ref = database.ref('crop/').child(req.body.username);
    let landRef = database.ref('land/').child(req.body.username);
    let key = ref.push().key;

    let cropData = req.body;
    cropData['keyId'] = key;
    const landKey = cropData['landKeyId'];

    return ref.child(key).set(cropData, (error) => {
        if (error) {
            res.json(responseToClient('fail', 'Crop not Added.'));
        } else {
            return landRef.orderByChild('keyId').equalTo(landKey)
                .once('value', (snapshot) => {
                    let land = Number(snapshot.val()[landKey]['availableLand']);
                    let aLand = (land - Number(cropData['cropArea'])).toFixed(4);

                    return landRef.child(landKey).child('availableLand')
                        .set(aLand, (error) => {
                            if (error) {
                                res.json(responseToClient('fail', 'Crop not Added.'));
                            } else {
                                return res.json(responseToClient('success', 'Crop Added Successfully.'));
                            }
                        });
                });
        }
    });
};

let getCropHandler = (req, res, next) => {
    let username = req.params.username;
    let ref = database.ref('crop/' + username);
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

module.exports.postCropHandler = postCropHandler;
module.exports.getCropHandler = getCropHandler;