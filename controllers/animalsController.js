let Animal = require('../models/animalSchema');
const excel = require('exceljs');

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

exports.get_exports_animals_csv = async function (req, res) {
    const animals = await Animal.find({});

    let csv = 'Species,Nickname,Status,Create Date\r\n';
    animals.forEach((animal) => {
        csv += "\"" + animal.species + "\"" + ','
            + "\"" + animal.nickName + "\"" + ','
            + "\"" + animal.status + "\"" + ','
            + "\"" + animal.createDate + "\"" + '\r\n';
    });

    res.header('Content-Type', 'text/csv');
    res.attachment('output.csv');
    return res.send(csv);
};

exports.get_exports_animals_excel = async function (req, res) {
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Animals');

    const animals = await Animal.find({});

    console.log(animals);

    worksheet.columns = [
        { header: 'Species', key: 'species', width: 15 },
        { header: 'Nickname', key: 'nickName:', width: 25 },
        { header: 'Status', key: 'status:', width: 25 },
        { header: 'Create Date', key: 'createDate:', width: 25 },
    ];

    worksheet.addRows(animals);

    res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
        'Content-Disposition',
        'attachment; filename=' + 'animals.xlsx',
    );
    return workbook.xlsx.write(res).then(function () {
        res.status(200).end();
    });

};


