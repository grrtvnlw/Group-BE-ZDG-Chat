let socket = io()
let user
let typing=false
let timeout=undefined

$(document).ready(() => {
  // const socket = io();
  let name = $('.username').text()
  socket.emit('join', name);
  $('.chat-form').submit(e => {
    e.preventDefault();
    const value = $('.chat-input').val();
    socket.emit('chat message', value);
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
      $('.typing').text(`${data.user} is typing...`)
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

  socket.on('emitParticipants', (people) => {
    $('#online').html('');
    people.forEach((person) => {
      const $newName = $(`<li class="list-group-item">${person} is online 🌐</li>`);
      $('#online').append($newName);
    })
  });
});
