var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var catalogSchema = new Schema({
	prodname: String,
	prodtype: String,
	prodprice: Number,
	isavailable: Boolean,
	imgname: String,
	tags: [{
	    type: String
	}],
	ratercount: Number,
	rateavg: Number
},{ collection : 'catalogdata' });

var Catalog = mongoose.model('Catalog', catalogSchema);

module.exports = Catalog;