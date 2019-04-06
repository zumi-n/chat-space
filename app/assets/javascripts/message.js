$(function(){
  function buildHTML(message){
    var insertImage = '';
    if (message.image.url) {
      insertImage = `<img src="${message.image.url}">`;
    }
    var html = `<div class="message">
                    <div class="upper-message">
                      <p class="upper-message__name">
                        ${ message.name }</p>
                      <p class="upper-message__date">
                        ${ message.time }</p>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${ message.content }
                      </p>
                      <img class="lower-message__image">
                        ${ insertImage }
                    </div>
                </div>`;
    return html;
    }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
  })

    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html)
      $('.form__message').val('')
      // $('.form__submit').prop('disabled', false);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
   })
      .fail(function(){
      alert('メッセージを入力してください');
      // $('.form__submit').prop('disabled', false);
    })

      .always(function(){
      $('.form__submit').prop('disabled', false);
      })
  })
});
