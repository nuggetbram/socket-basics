var socket = io();

socket.on('connect', function() {
   console.log('Connected to Server'); 
});

socket.on('message', function(message) {
    console.log('New Message: ' + message.text);
});

// Message Submit
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
    event.preventDefault();
    
    var $message = $form.find('input[name=message]');
    
    socket.emit('message', {
       text: $message.val()
    });
    
    $message.val('');
});