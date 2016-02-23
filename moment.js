var moment = require('moment');

var now = moment();

//console.log(now.format('MMM Do, YYYY, h:mm A')); // x:xx pm

var timestamp = now.valueOf();
var timestampMoment = moment.utc(timestamp).local();
console.log(timestampMoment.format('h:mm A'));