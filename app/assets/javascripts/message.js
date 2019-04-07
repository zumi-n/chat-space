$(function(){
  function buildHTML(message){
    var insertImage = '';
    if (message.image.url) {
      insertImage = `<img src="${message.image.url}">`;
    }
    console.log(insertImage)
    var html = `<div class="message", id="${message.id}">
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
      $('#new_message')[0].reset()
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
      $('.form__submit').prop('disabled', false);
     })
      .fail(function(){
      alert('メッセージを入力してください');
    })
  })

  // 以下、自動更新機能
  $(function(){
    var buildMessageHTML = function(message) {
    if (message.content && message.image) {
      //data-idが反映されるようにしている
      var html = '<div class="message" data-id=' + message.id + '>' +
        '<div class="upper-message">' +
          '<div class="upper-message__user-name">' +
            message.user_name +
          '</div>' +
          '<div class="upper-message__date">' +
            message.created_at +
          '</div>' +
        '</div>' +
        '<div class="lower-message">' +
          '<p class="lower-message__content">' +
            message.content +
          '</p>' +
          '<img src="' + message.image + '" class="lower-message__image" >' +
        '</div>' +
      '</div>'
    } else if (message.content) {
      //同様に、data-idが反映されるようにしている
      var html = '<div class="message" data-id=' + message.id + '>' +
        '<div class="upper-message">' +
          '<div class="upper-message__user-name">' +
            message.user_name +
          '</div>' +
          '<div class="upper-message__date">' +
            message.created_at +
          '</div>' +
        '</div>' +
        '<div class="lower-message">' +
          '<p class="lower-message__content">' +
            message.content +
          '</p>' +
        '</div>' +
      '</div>'
    } else if (message.image) {
      //同様に、data-idが反映されるようにしている
      var html = '<div class="message" data-id=' + message.id + '>' +
        '<div class="upper-message">' +
          '<div class="upper-message__user-name">' +
            message.user_name +
          '</div>' +
          '<div class="upper-message__date">' +
            message.created_at +
          '</div>' +
        '</div>' +
        '<div class="lower-message">' +
          '<img src="' + message.image + '" class="lower-message__image" >' +
        '</div>' +
      '</div>'
    };
    return html;
  };
    setInterval(reloadMessages, 5000);
    function reloadMessages(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
    var last_message_id = $('.message:last').attr('id');

     console.log(last_message_id);

    $.ajax({
      url: location.href,
      type: 'GET',
      data: { id: last_message_id },
      dataType: 'json'
    })
    .done(function(data){
      // console.log("doneroot");
      var insertHTML = '';
      $.each(data, function(i, data){

        insertHTML = buildMessageHTML(data);
        // console.log(insertHTML)
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
});
