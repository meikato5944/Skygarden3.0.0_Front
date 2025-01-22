var elementItems;
createElementItems();

//一覧から配列作成
function createElementItems() {
  var elements = document.getElementsByName('element-content');
  elementItems = [];//初期化
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var elementItem = [];
    if (element.children[6].value == "1") {
      elementItem["id"] = "content";
      elementItem["title"] = "";
      elementItem["code"] = "";
    } else {
      elementItem["id"] = element.children[3].value;
      elementItem["title"] = element.children[4].value;
      elementItem["code"] = element.children[5].value;
    }
    elementItems.push(elementItem);
  }
}

//配列を一覧に反映
function reElements() {
  var elements = document.getElementsByName('element-content');
  for (var i = 0; i < elementItems.length; i++) {
    var element = elements[i];
    if (elementItems[i]['id'] == "content") {
      var id = elementItems[i]['id'];
      var title = elementItems[i]['title'];
      var code = elementItems[i]['code'];
      element.id = "element-" + (i + 1);
      element.children[1].id = "element-" + (i + 1) + "-title";
      element.style.backgroundColor = "#dc143c";
      element.children[0].children[0].children[0].setAttribute('onclick', "upButton(" + (i + 1) + ")");
      element.children[0].children[1].children[0].setAttribute('onclick', "downButton(" + (i + 1) + ")");
      element.children[2].children[0].setAttribute('onclick', "");
      element.children[1].innerHTML = "コンテンツ部分";
      element.children[3].value = id;
      element.children[3].id = "element-" + (i + 1) + "-id";
      element.children[4].value = title;
      element.children[4].id = "element-" + (i + 1) + "-title";
      element.children[5].value = code;
      element.children[5].id = "element-" + (i + 1) + "-code";
      element.children[6].value = "1";
      element.children[6].id = "element-" + (i + 1) + "-content";
    } else {
      var id = elementItems[i]['id'];
      var title = elementItems[i]['title'];
      var code = elementItems[i]['code'];
      element.id = "element-" + (i + 1);
      element.children[1].id = "element-" + (i + 1) + "-title";
      element.style.backgroundColor = code;
      element.children[0].children[0].children[0].setAttribute('onclick', "upButton(" + (i + 1) + ")");
      element.children[0].children[1].children[0].setAttribute('onclick', "downButton(" + (i + 1) + ")");
      element.children[2].children[0].setAttribute('onclick', "eleDelete(" + (i + 1) + ")");
      element.children[1].innerHTML = title;
      element.children[3].value = id;
      element.children[3].id = "element-" + (i + 1) + "-id";
      element.children[4].value = title;
      element.children[4].id = "element-" + (i + 1) + "-title";
      element.children[5].value = code;
      element.children[5].id = "element-" + (i + 1) + "-code";
      element.children[6].value = "0";
      element.children[6].id = "element-" + (i + 1) + "-content";
    }
  }
}

function upButton(index) {
  if (0 < (index - 1)) {
    $('#element-' + index).insertBefore('#element-' + (index - 1));
    createElementItems();
    reElements();
  }
}

function downButton(index) {
  if ((index + 1) <= elementItems.length) {
    $('#element-' + index).insertAfter('#element-' + (index + 1));
    createElementItems();
    reElements();
  }
}

function eleDelete(index) {
  $('#element-' + index).remove();
  createElementItems();
}


function elementAdd() {
  var elements = document.getElementById('elements');
  var element = document.getElementById('element-template').cloneNode(true);
  var elementnumber = elementItems.length;

  element.style.display = "";
  element.setAttribute('name', "element-content");
  element.id = "element-" + (elementnumber + 1);
  elements.append(element);
  var newElement = [];
  newElement["id"] = "";
  newElement["title"] = "";
  newElement["code"] = "";
  elementItems.push(newElement);
  window.open('/webadmin/elementItem.jsp?elementnumber=' + elementnumber, null, 'top=100,left=100,width=800,height=1000');
}

function doSubmitTemp() {
  var content = "";
  for (var i = 0; i < elementItems.length; i++) {
    if (elementItems[i]['id'] == "content") {
      content += "###content###,";
    } else {
      content += "###element(" + elementItems[i]['id'] + ")###,";
    }
  }
  content = content.slice(0, - 1);
  document.getElementById('element-conent').value = content;
  document.contentform.submit();
}