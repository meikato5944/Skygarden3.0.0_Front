var elementItem;
var elementnumber;
var parameters;
parameters = new URL(window.location.href).searchParams;
elementnumber = parameters.get('elementnumber');
elementItem = window.opener.elementItems[Number(elementnumber)];

function elementSelect(index) {
  $('.entry').css('box-shadow', 'none');
  $('.element-' + index).css('box-shadow', '0 0 0 .25rem rgba(13, 110, 253, .25)');
  document.getElementById("selected-index").value = index;
}

function doSubmit() {
  var selectedIndex = document.getElementById("selected-index").value;
  var selectedId = document.getElementById("element-" + selectedIndex + "-id").value;
  var selectedTitle = document.getElementById("element-" + selectedIndex + "-title").value;
  var selectedcode = document.getElementById("element-" + selectedIndex + "-code").value;
  elementItem["id"] = selectedId;
  elementItem["title"] = selectedTitle;
  elementItem["code"] = selectedcode;
  window.opener.reElements();
  window.close();
}