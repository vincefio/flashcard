var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    projectName: String,
    cards: [{ front: String, back: String }]
});

//create model
var Project = mongoose.model('Project', projectSchema);

module.exports = Project