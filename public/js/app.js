var socket = io();

socket.on('connect', function() {
   console.log('Connected to Server'); 
});

socket.on('message', function(message) {
    var momentTimestamp = moment.utc(message.timestamp).local();
    console.log('New Message: ' + message.text);
    
    var formattedTime = momentTimestamp.format('h:mm A');
    
    jQuery('.messages').append('<p><strong>' + formattedTime + '</strong> ' + message.text + '</p>');
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