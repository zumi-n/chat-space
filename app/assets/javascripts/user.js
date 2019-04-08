$(function(){

  var search_list = $("#user-search-result");
  var member_list = $(".chat-group-user__name");

  function appendUserToSearchList(user){
    var html = `<div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${user.name}</p>
    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
    </div>`
    search_list.append(html);
  }


  function appendNoUserToSearchList(user) {
    var html =
    `<div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${ user }</p>
    </div>`
    search_list.append(html);
  }


  function appendUserToMemberList(user_id, user_name) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id="${user_id}">
    <input name='group[user_ids][]' type='hidden' value="${user_id}">
    <p class='chat-group-user__name'>${user_name}</p>
    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
    </div>`
    member_list.append(html);
  }


  $("#user-search-field").on('keyup', function() {
    var input = $("#user-search-field").val();


    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })


    .done(function(user) {
      $('#user-search-result').empty();
      if (user.length !== 0){
        user.forEach(function(user){
          appendUserToSearchList(user);
        });
      }
      else {
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

    $(document).on("click", '.user-search-remove', function(){
      $(this).parent().remove();
    });
  })
});

