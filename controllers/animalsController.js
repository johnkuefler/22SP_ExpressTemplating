let Animal = require('../models/animalSchema');

exports.get_animals = function (req, res) {
    res.render('animals/index');
}

exports.post_animal = function (req, res) {

    let newAnimal = new Animal({
        species: req.body.species,
        nickName: req.body.nickName,
        status: req.body.status,
    });

    newAnimal.save(function (err) {
        if (err) {
            // handle error
            console.log(err);
        } else {
            // saved!
            res.render('animals/thankyou');
        }
    });


}