exports.get_home = function (req, res) {
    res.render('index',
        {
            title: 'Express',
            body: 'Heres some content',
            author: 'John K',
            active: false
        });
}