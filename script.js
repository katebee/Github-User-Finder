// github user finder example

function getGithubUserInfo(username){
  var requestToGithub = new XMLHttpRequest();
  requestToGithub.open("GET", "https://api.github.com/users/" + username, false);
  requestToGithub.send();
  return requestToGithub;
}

function showUser(user){
  $("#profile h2").text(user.login + " is GitHub user #" + user.id);
  $('#profile .information').html('<a href="' + user.html_url + '">LINK</a>');
  $('#profile .avatar').html('<img src="' + user.avatar_url + '"/>');
}

$(document).ready(function(){
  $(document).on('keypress', '#username', function(e){
    if (e.which === 13) {
      var name = $('#username').val();
      var response = getGithubUserInfo(name);
      if (response.status === 200){
        var userJson = response.responseText;
        var user = JSON.parse(userJson);
        showUser(user);
      }
      else if(response.status === 404){
          $("#profile h2").text('No such username: ' + name);
      }
      else {
          console.error("Something else broke");
      }
    }
  })
});
