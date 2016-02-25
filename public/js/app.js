var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');

var socket = io();

$('.room-title').text(room);

socket.on('connect', function() {
   console.log('Connected to Server'); 
    
    socket.emit('joinRoom', {
        name: name,
        room: room
    });
});

socket.on('message', function(message) {
    var momentTimestamp = moment.utc(message.timestamp).local();
    console.log('New Message: ' + message.text);
    var formattedTime = momentTimestamp.format('h:mm A');
    var $messages = jQuery('.messages');
    var $message = jQuery('<li class="list-group-item"></li>');
    
    $message.append('<p><strong>' + message.name + ' ' + formattedTime + '</strong></p>');
    $message.append('<p>' + message.text + '</p>');
    
    $messages.append($message);
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