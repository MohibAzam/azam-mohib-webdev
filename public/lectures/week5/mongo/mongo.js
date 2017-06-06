var mongoose = require('mongoose');
//var q = require('q');

//This tells mongoose to not use its deprecated promise library
//and instead use this new one
mongoose.Promise = require('q').Promise;

//The connection string. The first part is the protocol as to how to connect
//(mongodb has its own unique protocol to  connect to a database)
//followed by the location of the database
mongoose.connect('mongodb://localhost/test/webdev_summer1_2017');

todoSchema = mongoose.Schema({
    title: String,
    dueDate: Date
}, {collection: 'todo'});

//The mongoose model provided must be unique across the framework
//This is because we will use this for references
todoModel = mongoose.model('TodoModel', todoSchema);

var todo1 = {
    title: 'Pickup milk',
    dueDate: new Date()
};

todoModel.create(todo1, function (err, doc) {
    if(err) {
        console.log(err);
    }
    else {
        console.log(doc);
    }
});

createTodo({title: 'Upload videos'})

findAllTodos()
    .then(function (todos) {
        console.log(todos);
    });

function findAllTodos() {
    return todoModel.find();
}

/*
todoModel.create(todo1)
    .then(function (doc) {
        console.log(doc);
    }, function (err) {
        console.log(err);
    })
};
    */