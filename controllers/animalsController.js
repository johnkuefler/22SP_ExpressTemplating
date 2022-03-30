let Animal = require('../models/animalSchema');

exports.get_animals = function (req, res) {
    Animal.find({ }, function (err, data) {
        if (err) {
           console.log(err);
        } else {
            console.log(data);
            res.render('animals/index', {animals: data} );
        }
    })
}

exports.get_create_animal = function (req, res) {
    res.render('animals/create');
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