module.exports = function(application) {
    var app = require('express');

    app.get('/wam/index.html', indexHtml);
    app.get('/wam/app.js', appJs);
    app.get('/wam/config.js', configJs);

    app.get('/wam/:entityName/templates/:type/:templateName', templatesHtml);

    function templatesHtml(req, res) {
        var entityName = req.params.entityName;
        var type = req.params.type;
        res.render('lectures/undergraduate/wam/configJs', application);
    }

    function configJs(req, res) {
        res.render('lectures/undergraduate/wam/configJs', application);
    }

    function appJs(req, res) {
        res.render('lectures/undergraduate/wam/appJs', application);
    }

    function indexHtml(req, res) {
        res.render('lectures/undergraduate/wam/index', application);
    }
};