function sortList() {
  var sort = document.getElementById('sort');
  var sortValue = sort.value;
  var url = location.pathname;
  location.href = url + '?sort=' + sortValue;
}

function preview() {
  var myform = document.contentform;
  myform.action = "/webadmin/preview.jsp";
  myform.target = "_blank";
  myform.submit();
  myform.target = "";
  myform.action = "/webadmin/webadmin/update_post.jsp";
}

function doSubmit() {
  document.contentform.submit();
}

function colorchange() {
  var color = $('.element-color-option').val();
  $('.element-color-option').css('background-color', color);
}