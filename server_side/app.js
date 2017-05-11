/**
 * Created by mohib on 5/11/2017.
 */

/*
module.exports = {
    message: 'hello',
    sayHello: function () {
        console.log('hello');
    }
}
*/

/*
module.exports = function(message) {
    console.log(message);
};
*/

module.exports = function (app) {

    var todos = [
        {title: 'todo 123', details: 'details 123'},
        {title: 'todo 456', details: 'details 456'}
    ];

    app.get('/api/todo/:index', function(req, res) {
        var index = req.params['index'];
        res.json(todos[index]);
    });

    app.get('/api/todo', function(req, res) {
        //res.send('here are the todos'); //You can't have res.json after a send...
        res.json(todos);
    });
};

console.log('hello from app.js on server-side');