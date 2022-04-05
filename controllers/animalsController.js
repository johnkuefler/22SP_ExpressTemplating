let Animal = require('../models/animalSchema');

exports.get_animals = function (req, res) {
    Animal.find({}, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            res.render('animals/index', { animals: data });
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
        createDate: req.body.createDate
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


exports.get_update_animal = function (req, res) {
    Animal.findOne({ _id: req.query.id }, function (err, animal) {
        if (err) {
            console.log(err);
        } else {
            console.log(animal);
            res.render('animals/update', { data: animal });
        }
    });
};

exports.post_update_animal = function (req, res) {

    const updateData = {
        status: req.body.status,
        nickName: req.body.nickName,
        species: req.body.species,
    };

    Animal.findOneAndUpdate({ _id: req.body.id }, updateData, function (err, data) {
        if (err) {
            // handle error
            console.log(err);
        } else {
            res.redirect('/animals');
        }
    });
};


exports.get_delete_animal = function (req, res) {
    Animal.findOneAndDelete({ _id: req.query.id }, function (err) {
        if (err) {
            // handle error
            console.log(err);
        } else {
            res.redirect('/animals');
        }
    });
};