/**
 * Created by tianyingzhang on 6/10/17.
 */
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var hw2schema = new Schema({
    input:String,
    length: Number
});

var hw2module = mongoose.model("hw2module",hw2schema);



module.exports.hw2module = hw2module;