$(function(){

  var searchlist = $('#user-search-result')

  function appendUserToSearchList(user){
    var html = `<div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${user.name}</p>
    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
    </div>`
    searchlist.append(html);
  }


  function appendNoUserToSearchList(user){
    var html =
    `<div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${ user }</p>
    </div>`
    searchlist.append(html);
  }

  var memberlist = $('#chat-group-users')

  function appendUserToMemberList(id, name){
    var html = `<div class='chat-group-user clearfix js-member'>
    <input name='group[user_ids][]' type='hidden' value=${id}>
    <p class='chat-group-user__name'>${name}</p>
    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
    </div>`
    memberlist.append(html);
  }


  $("#user-search-field.chat-group-form__input").on('keyup', function() {
    var input = $("#user-search-field.chat-group-form__input").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $('#user-search-result').empty();
      if (users.length !== 0){
        users.forEach(function(user){
          appendUserToSearchList(user)
        });
      } else {
        appendNoUserToSearchList('一致するユーザーが見つかりません');
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    })
  });
  $(document).on('click', '.user-search-add', function(){
    $(this).parent()[0].remove();
    var user_id = $(this).data("user-id");
    var user_name = $(this).data("user-name");
    appendUserToMemberList(user_id, user_name);
  });

  $(document).on("click", '.user-search-remove', function(){
    $(this).parent().remove();
  });
});

