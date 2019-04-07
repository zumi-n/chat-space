$(function(){
  function buildHTML(message){
    var insertImage = '';
    if (message.image) {
      insertImage = `<img src="${message.image}">`;
    }
    var html = `<div class="message" id="${message.id}">
                    <div class="upper-message">
                      <p class="upper-message__name">
                        ${ message.user_name }</p>
                      <p class="upper-message__date">
                        ${ message.created_at }</p>
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
      $('#new_message')[0].reset()
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
      $('.form__submit').prop('disabled', false);
     })
      .fail(function(){
      alert('メッセージを入力してください');
    })
  })

  // 以下、自動更新機能
    setInterval(reloadMessages, 5000);
    function reloadMessages(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
    var last_message_id = $('.message:last').attr('id');
    $.ajax({
      url: location.href,
      type: 'GET',
      data: { id: last_message_id },
      dataType: 'json'
    })
    .done(function(message){
      var insertHTML = '';
      $.each(message, function(i, message){
        insertHTML = buildHTML(message);
      });
      $('.messages').append(insertHTML).animate({scrollTop:$('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('自動更新に失敗しました');
    });
  }else{
    clearInterval(update);
  }
 };
});
