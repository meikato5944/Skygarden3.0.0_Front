function addelement() {
  var inputname = document.getElementById('elementcolor-name');
  var inputcode = document.getElementById('elementcolor-code');
  if (inputname.value != "" && inputcode.value != "") {
    var newelement = document.getElementById('template-element').cloneNode(true);
    var name = inputname.value;
    var colorcode = inputcode.value;
    var index = 0;
    var elements = document.getElementsByName('colorelements');
    index = elements.length + 1;
    newelement.children[0].children[0].innerHTML = name
    newelement.children[0].children[0].style.backgroundColor = colorcode;
    newelement.children[1].id = "element-name-" + index;
    newelement.children[1].name = "element-name-" + index;
    newelement.children[1].value = name;
    newelement.children[2].id = "element-code-" + index;
    newelement.children[2].name = "element-code-" + index;
    newelement.children[2].value = colorcode;
    newelement.id = "element-" + index;
    newelement.setAttribute('name', 'colorelements');
    newelement.style.display = "";
    newelement.children[0].children[1].setAttribute('onclick', 'deleteElement(' + index + ')');
    newelement.classList.remove('setting-template');
    document.getElementById('elements').appendChild(newelement);
    inputname.value = "";
    inputcode.value = "";
  }
}

function deleteElement(index) {
  document.getElementById('element-' + index).remove();
  var elements = document.getElementsByName("colorelements");
  for (var i = 0; i < elements.length; i++) {
    elements[i].id = "element-" + (i + 1);
    elements[i].children[1].id = "element-name-" + (i + 1);
    elements[i].children[2].id = "element-code-" + (i + 1);
  }
}

function save_submit() {
  var elements = document.getElementsByName("colorelements");
  var elementsValue = "";
  for (var i = 1; i < elements.length + 1; i++) {
    var name = document.getElementById('element-name-' + i).value;
    var code = document.getElementById('element-code-' + i).value;
    elementsValue += name + "=" + code + "*";
  }
  document.getElementById('elements-color-value').value = elementsValue;
  document.settingsform.submit();
}