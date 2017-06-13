var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    //You can set additional parameters for each field
    //to specify if they're required fields and/or
    //have default values
    username: {type: String, require: true},
    password: {type: String, require: true},
    firstName: String,
    lastName: String,
    dateCreated: {type: Date, default: Date.now},
    email: String,
    phone: String,
    websites: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'}
    ]
    //you can either have the parents have references to its children
    //or make the children have references to their parent
    //i.e. either user -> websites or website -> user can work
}, {collection: "user"});
module.exports = userSchema;
