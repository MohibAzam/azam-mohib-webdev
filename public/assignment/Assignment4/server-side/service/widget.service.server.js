//When installing via npm, don't forget to use --save
//afterwards, otherwise your code will work locally
//but not when it gets deployed!
var app = require('express');
var bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

    //params
    app.get('/api/assignment/widget/:widgetId', findWidgetById);

    app.get('/api/assignment/page/:pageId/widget', findWidgetsForPage);

    //this has the same url as above, but it is able to be handled separately
    //since it's a POST, not a GET
    app.post('/api/assignment/page/:pageId/widget', createWidget);

    //Use put when you're passing large objects as data for updating purposes
    //it will be part of the req.body
    app.put('/api/assignment/widget/:widgetId', updateWidget);

    //Use delete for deletion operations
    app.delete('/api/assignment/widget/:widgetId', deleteWidget);

    app.put('/api/assignment/page/:pageId/widget', updateOrder);

    var multer = require('../../../../../node_modules/multer/'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../../../../public/uploads' });

    app.post ("/api/upload", upload.single('myFile'), uploadImage);


    //Widgets we'll be using for the sample webpage
    var widgets = [
        { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Ever since astronomers <a href="http://gizmodo.com/new-earth-like-exoplanet-could-be-discovery-of-the-cent-1785614793#_ga=2.67003244.390029006.1495112369-1520736541.1475842057" rel="nofollow">announced the discovery</a> of an Earth-sized exoplanet <a href="http://gizmodo.com/there-may-be-an-earth-like-exoplanet-less-than-five-lig-1785457935" rel="nofollow">less than five light years</a> down the cosmic street, the question on every good space cadet’s mind has been whether or not we can colonize it. We’re not going to know if <em>Proxima b</em> is habitable <a href="http://gizmodo.com/how-well-get-our-first-big-clue-about-life-on-proxima-b-1785942106" rel="nofollow">until we can point some very powerful telescopes at it</a>, which won’t happen until next year. But until then, scientists are playing around with models—and one such modeling effort recently came to some promising conclusions.</p>'},
        { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    function updateOrder(req, res) {
        console.log('arrived at function');
        var pageId = req.params['pageId'];
        var firstIndex = req.query['initial'];
        var lastIndex = req.query['final'];
        if (firstIndex < 0 || lastIndex < 0) {
            res.sendStatus(404);
        }
        var pageWidgets = [];
        for(var w in widgets) {
            var widget = widgets[w];
            if(widget.pageId === pageId) {
                resultSet.push(widget);
            }
        }
        var movedWidget = pageWidgets[firstIndex];
        pageWidgets.splice(firstIndex, 1);
        pageWidgets.splice(lastIndex, 0, movedWidget);
        var pageAcc = 0;
        for (var v in widgets) {
            var currWidget = widgets[v];
            if (widget.pageId === pageId) {
                widgets[v] = pageWidgets[pageAcc];
                pageAcc++;
            }
        }
        res.sendStatus(200);
    }

    function uploadImage(req, res) {

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        var widget = widgets.find(function (widget) {
            return widget._id === widgetId;
        });
        widget.url = '/uploads/'+filename;

        var callbackUrl   = "/assignment/Assignment4/index.html#!/user/" + userId
            + "/website/" + websiteId
            + "/page/" + pageId
            + "/widget/" + widgetId;

        res.redirect(callbackUrl);
    }

    //each req represents a "request" object to the server.
    //Specifically, its body is based on the url
    //req.params get the parameter data, for example
    //while req.query allows you to use data enclosed in ?s
    function createWidget(req, res) {
        //the body contains whatever was passed into
        //this as a function input in the $http.post, so to speak
        var widget = req.body;
        widget._id = (new Date()).getTime() + "";
        widget.pageId = req.params['pageId'];
        console.log(widget);
        widgets.push(widget);
        //Echoes the user back to the client
        res.send(widget);
    }

    function updateWidget(req, res) {
        var widget = req.body;
        var widgetId = req.params['widgetId'];
        var oldWidget = widgets.find(function (widget) {
            return widget._id === widgetId;
        });
        if (oldWidget !== null) {
            var index = widgets.indexOf(oldWidget);
            widget._id = oldWidget._id;
            widget.pageId = oldWidget.pageId;
            widgets[index] = widget;
            //Send status allows you to tell the client whether
            //or not the server operation was successful.
            res.sendStatus(200);
            return;
        }
        else {
            res.sendStatus(404);
        }
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = widgets.find(function (widget) {
            return widget._id === widgetId;
        });
        var index = widgets.indexOf(widget);
        widgets.splice(index, 1);
        res.sendStatus(200);
    }

    function findWidgetsForPage(req, res)  {
        var resultSet = [];
        for(var w in widgets) {
            var widget = widgets[w];
            if(widget.pageId === req.params.pageId) {
                resultSet.push(widget);
            }
        }
        res.json(resultSet);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params['widgetId'];
        var widget = widgets.find(function (widget) {
            return widget._id === widgetId;
        });
        res.send(widget);
    }

}