import React from "react";
import deleteImg from "../common/image/trash.svg";
import newCreate from "../common/image/plus-lg.svg";

export const Setting = () => {
  const addElement = () => {
    const inputname = document.getElementById("elementcolor-name") as HTMLInputElement;
    const inputcode = document.getElementById("elementcolor-code") as HTMLInputElement;
    const templateElement = document.getElementById("template-element") as HTMLElement;
    const elementsContainer = document.getElementById("elements") as HTMLElement;

    if (inputname && inputcode && templateElement && elementsContainer && inputname.value !== "" && inputcode.value !== "") {
      const newelement = templateElement.cloneNode(true) as HTMLElement;
      const name = inputname.value;
      const colorcode = inputcode.value;
      const elements = document.querySelectorAll('[data-name="colorelements"]');
      const index = elements.length + 1;
      const nameInput = newelement.children[1] as HTMLInputElement;
      const codeInput = newelement.children[2] as HTMLInputElement;
      newelement.children[0].children[0].innerHTML = name;
      (newelement.children[0].children[0] as HTMLElement).style.backgroundColor = colorcode;
      nameInput.id = "element-name-" + index;
      nameInput.setAttribute("name", "element-name-" + index);
      nameInput.value = name;
      codeInput.id = "element-code-" + index;
      codeInput.setAttribute("name", "element-code-" + index);
      codeInput.value = colorcode;
      newelement.id = "element-" + index;
      newelement.setAttribute("data-name", "colorelements");
      newelement.style.display = "";
      const deleteButton = newelement.children[0].children[1] as HTMLButtonElement;
      deleteButton.onclick = () => deleteElement(index);
      newelement.classList.remove("setting-template");
      elementsContainer.appendChild(newelement);
      inputname.value = "";
      inputcode.value = "";
    }
  };

  const deleteElement = (index: number) => {
    const element = document.getElementById("element-" + index);
    if (element) {
      element.remove();
      const elements = document.querySelectorAll('[data-name="colorelements"]');
      for (let i = 0; i < elements.length; i++) {
        const currentElement = elements[i] as HTMLElement;
        currentElement.id = "element-" + (i + 1);
        if (currentElement.children[1]) currentElement.children[1].id = "element-name-" + (i + 1);
        if (currentElement.children[2]) currentElement.children[2].id = "element-code-" + (i + 1);
      }
    }
  };

  const save_submit = () => {
    const elements = document.querySelectorAll('[data-name="colorelements"]');
    let elementsValue = "";
    for (let i = 1; i < elements.length + 1; i++) {
      const nameElement = document.getElementById(`element-name-${i}`) as HTMLInputElement;
      const codeElement = document.getElementById(`element-code-${i}`) as HTMLInputElement;
      if (nameElement && codeElement) {
        elementsValue += `${nameElement.value}=${codeElement.value}*`;
      }
    }
    const colorValueElement = document.getElementById("elements-color-value") as HTMLInputElement;
    const settingsForm = document.getElementById("settingsform") as HTMLFormElement;
    if (colorValueElement && settingsForm) {
      colorValueElement.value = elementsValue;
      settingsForm.submit();
    }
  };

  return (
    <>
      <section style={{ display: "flex", paddingBottom: "200px" }}>
        <div className="flex-grow-1 d-flex justify-content-center align-items-center p-4">
          <div className="w-100 sky-Setting-content">
            <h2 className="text-center">Setting</h2>
            <div className="card border-warning rounded sky-Setting-card">
              <div className="card-body">
                <form id="settingsform" name="settingsform" action="/webadmin/setting_post" method="post">
                  <h5 className="fw-bold ms-2">elementColor</h5>
                  <div className="d-sm-flex">
                    <input className="form-control sky-input" id="elementcolor-name" type="text" placeholder="要素名 例:header" />
                    <input className="form-control sky-input" id="elementcolor-code" type="text" placeholder="Code 例:#000000" />
                    <button className="btn btn-warning fw-bold sky-bg-2" id="add-element-button" type="button" onClick={addElement} style={{ minWidth: "100px" }}>
                      <img className="sky-list-newCreate-img" src={newCreate} alt="newCreate" />
                    </button>
                    <input id="elements-color-value" name="elements-color-value" type="hidden" />
                  </div>

                  <div id="elements">
                    <div id="element-1" data-name="colorelements">
                      <div className="d-sm-flex">
                        <div className="d-flex justify-content-center align-items-center w-100" style={{ backgroundColor: "#FFF" }}>
                          name
                        </div>
                        <button className="btn btn-warning fw-bold sky-bg-2" type="button" onClick={() => deleteElement(1)} style={{ minWidth: "100px" }}>
                          <img src={deleteImg} alt="delete" />
                        </button>
                      </div>
                      <input type="hidden" id="element-name-1" name="element-name-1" value="name" />
                      <input type="hidden" id="element-code-1" name="element-code-1" value="code" />
                    </div>
                  </div>

                  <div id="template-element" className="flex setting-delete" style={{ display: "none" }}>
                    <div className="d-sm-flex">
                      <div className="d-flex justify-content-center align-items-center w-100" style={{ backgroundColor: "" }}></div>
                      <button className="btn btn-warning fw-bold sky-bg-2" type="button" style={{ minWidth: "100px" }}>
                        <img src={deleteImg} alt="delete" />
                      </button>
                    </div>
                    <input type="hidden" id="" name="" value="" />
                    <input type="hidden" id="" name="" value="" />
                  </div>
                  <div className="text-center">
                    <button type="button" className="btn btn-warning w-100 mb-2 mt-5 sky-submit sky-bg-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                      Save
                    </button>
                  </div>
                </form>

                {/* modal */}
                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          登録しますか？
                        </h5>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn me-2" data-bs-dismiss="modal">
                          キャンセル
                        </button>
                        <button type="button" className="btn btn-warning px-4" onClick={save_submit}>
                          登録
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
