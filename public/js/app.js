var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');

var socket = io();

socket.on('connect', function() {
   console.log('Connected to Server'); 
});

socket.on('message', function(message) {
    var momentTimestamp = moment.utc(message.timestamp).local();
    console.log('New Message: ' + message.text);
    
    var formattedTime = momentTimestamp.format('h:mm A');
    
    var $message = jQuery('.messages');
    $message.append('<p><strong>' + message.name + ' ' + formattedTime + '</strong></p>');
    $message.append('<p>' + message.text + '</p>');
});

// Message Submit
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
    event.preventDefault();
    
    var $message = $form.find('input[name=message]');
    
    socket.emit('message', {
        name: name,
        text: $message.val()
    });
    
    $message.val('');
});