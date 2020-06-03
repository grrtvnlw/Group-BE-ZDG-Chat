let user
let typing=false
let timeout=undefined

$(document).ready(() => {
  const socket = io();
  const room = $('.chat-form').data('room') || 'Main Room'
  socket.emit('join', room);
  $('.chat-form').submit(function(e) {
    e.preventDefault();
    const value = $('.chat-input').val();
    switch ($(this).data('room')) {
      case 'Pet Room':
        socket.emit('pet message', value);
        break;
      case 'Atlanta Room':
        socket.emit('Atlanta message', value);
        break;
      case 'Coding Room':
        socket.emit('coding message', value);
        break;
      default:
        socket.emit('chat message', value);
        break;
    }
    $('.chat-input').val('');
  });

  $(".chat-input").keypress((e) => {
    if (e.which != 13) {
      typing = true
      socket.emit('typing', {user:user, typing:true})
      clearTimeout(timeout)
      timeout = setTimeout(typingTimeout, 1500)
    } else {
      clearTimeout(timeout)
      typingTimeout()
    }
  });

  socket.on('display', (data)=>{
    if (data.typing == true) {
      $('.typing').text(`${data.user} is typing 💻`)
    }
    else {
      $('.typing').text("")
    }
    });

  function typingTimeout(){
    typing = false
    socket.emit('typing', {user:user, typing:false})
  }

  socket.on('chat message', (message) => {
    const $newChat = $(`<li class="list-group-item">${message}</li>`);
    $('#messages').append($newChat);
  });

  socket.on('pet message', (message) => {
    const $newChat = $(`<li class="list-group-item">${message}</li>`);
    $('#petMessages').append($newChat);
  });

  socket.on('Atlanta message', (message) => {
    const $newChat = $(`<li class="list-group-item">${message}</li>`);
    $('#atlantaMessages').append($newChat);
  });

  socket.on('coding message', (message) => {
    const $newChat = $(`<li class="list-group-item">${message}</li>`);
    $('#codingMessages').append($newChat);
  });

  $(document).on('click', '.name', function(e) {
      const id = $(this).data('id');
      $('.private-form').data('id', id);
      $('.room-form').data('id', id);
  });

  $('.private-form').on('submit', function(e) {
    e.preventDefault();
    const message = $('.privatechat-input').val();
    const id = $(this).data('id');
    $('.privatechat-input').val('');
    socket.emit('private message', { id, message })
  });

  $('.room-form').on('submit', function(e) {
    e.preventDefault();
    const id = $(this).data('id');
    socket.emit('room message', id);
  });
  
  socket.on('private message', (data) => {
    alert(`${data.name} says ${data.message}`)
  })

  socket.on('room message', (data) => {
    if (window.confirm(`${data.name} wants you to join them in a private room! If you click "ok" you will be redirected. Click cancel to reject ${data.name}.`))
    {
      socket.emit('confirm message', data);
      window.location.href='http://localhost:3000/private';
    };
  })
  
  socket.on('confirm message', (data) => {
    if (window.confirm(`${data.name} agreed to the private session! Click "ok" to go meet them, or click cancel to break their heart.`))
    {
      socket.emit('privateRoom message', data);
      window.location.href='http://localhost:3000/private';
    };
  })
  
  $('.privateRoom-form').on('submit', function(e) {
    e.preventDefault();
    const message = $('#privateRoom-message').val();
    console.log(message)
    $('#privateRoom-message').val('');
    // socket.emit('privateRoom message', { id, message })
    socket.emit('privateRoom message', message);
  });

  socket.on('privateRoom message', (message) => {
    const $newChat = $(`<li class="list-group-item">${message}</li>`);
    $('#privateRoom').append($newChat);
  });

  socket.on('emitParticipants', (people) => {
    $('#online').html('');
      for (let [key, value] of Object.entries(people)) {
        const $newName = $(`<li class="list-group-item">🌐 ${value.name} is in the ${value.room} <button type="button" class="name btn btn-secondary p-0" data-toggle="modal" data-target="#exampleModal" data-id="${key}">Chat</button></li>`);
        $('#online').append($newName);
      };
  });
});
