let socket = io()
let user
let typing=false
let timeout=undefined

$(document).ready(() => {
  const socket = io();
  socket.emit('join');
  $('.chat-form').submit(function(e) {
    e.preventDefault();
    const value = $('.chat-input').val();
    switch ($(this).data('room')) {
      case 'petroom':
        socket.emit('pet message', value);
        break;
      case 'atlantaroom':
        socket.emit('Atlanta message', value);
        break;
      case 'codingroom':
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

  $(document).on('submit', '.private-form', function(e) {
    e.preventDefault();
    const message = $('.privatechat-input').val();
    console.log(message)
    socket.on('private message', (users) => {
      console.log(name)
      console.log(users[name])
      users[name].emit(alert(message))
    })
    $('.privatechat-input').val('');
  });

  let name = "";
  $(document).on('click', '.name', function() {
      name = $(this).attr('data-name');
      console.log(name)
    });
  
  socket.on('emitParticipants', (people) => {
    $('#online').html('');
    if (Object.keys(people).length == 1) {
      // let personName = Object.values(people);
      const $newName = $(`<li class="list-group-item">🌐 ${Object.values(people)} <button type="button" class="name btn btn-secondary p-0" data-toggle="modal" data-target="#exampleModal" data-name="${Object.values(people)}">Chat</button></li>`);
      $('#online').append($newName);
    } else {
      // console.log(people)
      people.forEach((person) => {
        const $newName = $(`<li class="list-group-item">🌐 ${person} <button type="button" class="btn btn-secondary p-0" data-toggle="modal" data-target="#exampleModal" data-name="${person}">Chat</button></li>`);
        $('#online').append($newName);
      });
    }
  });
});
