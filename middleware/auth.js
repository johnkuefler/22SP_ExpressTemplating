function ensureAuthenticated(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/account/login');
}

function ensureIsAdmin(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated() && res.locals.user.role === 'Admin')
        return next();

    // if they aren't redirect them to the home page
    if (req.isAuthenticated) {
        res.status(401);
        res.send('You are not authorized to access this page');
    } else {
        res.redirect('/account/login');
    }
}

function ensureIsAdminOrQualityControl(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated() && (res.locals.user.role === 'Admin' || res.locals.user.role === 'Quality Control'))
        return next();

    // if they aren't redirect them to the home page
    if (req.isAuthenticated) {
        res.status(401);
        res.send('You are not authorized to access this page');
    } else {
        res.redirect('/account/login');
    }
}

module.exports = {
    ensureAuthenticated: ensureAuthenticated,
    ensureIsAdmin: ensureIsAdmin,
    ensureIsAdminOrQualityControl: ensureIsAdminOrQualityControl

}