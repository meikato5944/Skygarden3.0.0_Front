import React, { useState, useEffect } from "react";
import previewImg from "../common/image/preview.svg";
import elementAddImg from "../common/image/plus-lg.svg";

interface ContentData {
  screenName: string;
  schedule_published: string;
  schedule_unpublished: string;
  title: string;
  head: string;
  content: string;
  url: string;
  elementcolor: string;
  templateOutput: string;
  colorOutput: string;
  eleResults: Array<{
    id: string;
    title: string;
    code: string;
  }>;
}

export const Content = () => {
  let screenName = "";
  const [schedule_published, setSchedule_published] = useState("");
  const [schedule_unpublished, setSchedule_unpublished] = useState("");
  const [head, setHead] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [mode, setMode] = useState("");
  let elementcolor = "";
  let templateOutput = "";
  let colorOutput = "";
  let eleResults = [
    {
      id: "",
      title: "",
      code: "",
    },
  ];

  const [result, setResult] = useState<ContentData>({
    screenName: "",
    schedule_published: "",
    schedule_unpublished: "",
    title: "",
    head: "",
    content: "",
    url: "",
    elementcolor: "",
    templateOutput: "",
    colorOutput: "",
    eleResults: [
      {
        id: "",
        title: "",
        code: "",
      },
    ],
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setMode(params.get("mode") || "");
    const id = params.get("id") || "";
    if (id != "") {
      fetch("http://localhost:8080/webadmin/getcontent?mode=" + mode + "&id=" + id, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setResult(data);
          screenName = data.screenName || "";
          setSchedule_published(data.schedule_published || "");
          setSchedule_unpublished(data.schedule_unpublished || "");
          setHead(data.head || "");
          setTitle(data.title || "");
          setContent(data.content || "");
          setUrl(data.url || "");
          elementcolor = data.elementcolor || "";
          templateOutput = data.templateOutput || "";
          colorOutput = data.colorOutput || "";
          eleResults = data.eleResults || [{ id: "", title: "", code: "" }];
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []);

  const publishedCheckbox = () => {
    // console.log("Checkbox toggled");
  };

  const preview = () => {
    const preview = document.getElementById("contentform") as HTMLFormElement;
    if (preview) {
      preview.action = "/webadmin/preview.jsp";
      preview.target = "_blank";
      preview.submit();
      preview.target = "";
      preview.action = "/webadmin/update_post.jsp";
    }
  };

  function colorchange() {
    // var color = $(".element-color-option").val();
    // $(".element-color-option").css("background-color", color);
  }

  const doSubmit = () => {
    const contentForm = document.forms.namedItem("contentform") as HTMLFormElement;
    if (contentForm) {
      contentForm.submit();
    } else {
      console.error("Form with name 'contentform' not found");
      return;
    }
  };

  var elementItems: Array<{ id: string; title: string; code: string }> = [];
  createElementItems();

  //一覧から配列作成
  function createElementItems() {
    var elements = document.getElementsByName("element-content");
    elementItems = []; //初期化
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var elementItem: { id: string; title: string; code: string } = { id: "", title: "", code: "" };
      const inputElement = element.children[6] as HTMLInputElement;
      if (inputElement.value === "1") {
        elementItem.id = "content";
        elementItem.title = "";
        elementItem.code = "";
      } else {
        elementItem.id = (element.children[3] as HTMLInputElement).value;
        elementItem.title = (element.children[4] as HTMLInputElement).value;
        elementItem.code = (element.children[5] as HTMLInputElement).value;
      }
      elementItems.push(elementItem);
    }
  }

  //配列を一覧に反映
  function reElements() {
    var elements = document.getElementsByName("element-content");
    for (var i = 0; i < elementItems.length; i++) {
      var element = elements[i];
      if (elementItems[i]["id"] == "content") {
        var id = elementItems[i]["id"];
        var title = elementItems[i]["title"];
        var code = elementItems[i]["code"];
        element.id = "element-" + (i + 1);
        element.children[1].id = "element-" + (i + 1) + "-title";
        element.style.backgroundColor = "#dc143c";
        element.children[0].children[0].children[0].setAttribute("onclick", "upButton(" + (i + 1) + ")");
        element.children[0].children[1].children[0].setAttribute("onclick", "downButton(" + (i + 1) + ")");
        element.children[2].children[0].setAttribute("onclick", "");
        element.children[1].innerHTML = "コンテンツ部分";
        (element.children[3] as HTMLInputElement).value = id;
        element.children[3].id = "element-" + (i + 1) + "-id";
        (element.children[4] as HTMLInputElement).value = title;
        (element.children[4] as HTMLInputElement).id = "element-" + (i + 1) + "-title";
        (element.children[5] as HTMLInputElement).value = code;
        (element.children[5] as HTMLInputElement).id = "element-" + (i + 1) + "-code";
        (element.children[6] as HTMLInputElement).value = "1";
        (element.children[6] as HTMLInputElement).id = "element-" + (i + 1) + "-content";
      } else {
        var id = elementItems[i]["id"];
        var title = elementItems[i]["title"];
        var code = elementItems[i]["code"];
        element.id = "element-" + (i + 1);
        element.children[1].id = "element-" + (i + 1) + "-title";
        element.style.backgroundColor = code;
        element.children[0].children[0].children[0].setAttribute("onclick", "upButton(" + (i + 1) + ")");
        element.children[0].children[1].children[0].setAttribute("onclick", "downButton(" + (i + 1) + ")");
        element.children[2].children[0].setAttribute("onclick", "eleDelete(" + (i + 1) + ")");
        element.children[1].innerHTML = title;
        (element.children[3] as HTMLInputElement).value = id;
        element.children[3].id = "element-" + (i + 1) + "-id";
        (element.children[4] as HTMLInputElement).value = title;
        (element.children[4] as HTMLInputElement).id = "element-" + (i + 1) + "-title";
        (element.children[5] as HTMLInputElement).value = code;
        (element.children[5] as HTMLInputElement).id = "element-" + (i + 1) + "-code";
        (element.children[6] as HTMLInputElement).value = "0";
        (element.children[6] as HTMLInputElement).id = "element-" + (i + 1) + "-content";
      }
    }
  }

  function upButton(index: number) {
    if (0 < index - 1) {
      $("#element-" + index).insertBefore("#element-" + (index - 1));
      createElementItems();
      reElements();
    }
  }

  function downButton(index: number) {
    if (index + 1 <= elementItems.length) {
      $("#element-" + index).insertAfter("#element-" + (index + 1));
      createElementItems();
      reElements();
    }
  }

  function eleDelete(index: number) {
    $("#element-" + index).remove();
    createElementItems();
  }

  function elementAdd() {
    var elements = document.getElementById("elements");
    if (!elements) {
      console.error("Element with id 'elements' not found");
      return;
    }
    var elementTemplate = document.getElementById("element-template");
    if (!elementTemplate) {
      console.error("Element with id 'element-template' not found");
      return;
    }
    var element = elementTemplate.cloneNode(true) as HTMLElement;
    var elementnumber = elementItems.length;
    element.style.display = "";
    element.setAttribute("data-name", "element-content");
    element.id = "element-" + (elementnumber + 1);
    elements.append(element);
    var newElement: { id: string; title: string; code: string } = { id: "", title: "", code: "" };
    newElement["id"] = "";
    newElement["title"] = "";
    newElement["code"] = "";
    elementItems.push(newElement);
    window.open("/element-item?elementnumber=" + elementnumber, undefined, "top=100,left=100,width=1200,height=1000");
  }

  function doSubmitTemp() {
    var content = "";
    for (var i = 0; i < elementItems.length; i++) {
      if (elementItems[i]["id"] == "content") {
        content += "###content###,";
      } else {
        content += "###element(" + elementItems[i]["id"] + ")###,";
      }
    }
    content = content.slice(0, -1);
    const elementContent = document.getElementById("element-conent");
    if (elementContent) {
      (elementContent as HTMLInputElement).value = content;
    } else {
      console.error("Element with id 'element-conent' not found");
      return;
    }

    const contentForm = document.forms.namedItem("contentform") as HTMLFormElement;
    if (contentForm) {
      contentForm.submit();
    } else {
      console.error("Form with name 'contentform' not found");
    }
  }

  return (
    <>
      <div className="flex-grow-1 d-flex justify-content-center align-items-center p-4 sky-content">
        <div className="w-100">
          <h2 className="text-center mb-3">{screenName}入稿画面</h2>
          <div className="card border-warning rounded sky-bg-1">
            <div className="card-body">
              <form id="contentform" name="contentform" action="http://localhost:8080/webadmin/update_post" method="POST">
                {/* publish&preview  */}
                {mode == "" ? (
                  <>
                    <div className="sky-control mb-2">
                      <div className="sky-control-publish">
                        <div className="me-2">
                          <label htmlFor="schedule_published" className="sky-form-label fw-bold ms-1 mb-1">
                            start
                          </label>
                          <input type="text" className="form-control border-warning sky-input datepicker" id="schedule_published" name="schedule_published" value={schedule_published} onChange={(e) => setSchedule_published(e.target.value)} placeholder="Enter start" required />
                        </div>
                        <div className="me-2">
                          <label htmlFor="schedule_unpublished" className="sky-form-label fw-bold ms-1 mb-1">
                            end
                          </label>
                          <input type="text" className="form-control border-warning sky-input datepicker" id="schedule_unpublished" name="schedule_unpublished" value={schedule_unpublished} onChange={(e) => setSchedule_unpublished(e.target.value)} placeholder="Enter end" required />
                        </div>
                        <div className="form-check form-switch sky-Content-publish">
                          <input className="form-check-input sky-input-switch" type="checkbox" role="switch" id="published" name="published" value="1" onChange={publishedCheckbox} checked />
                          <label className="form-check-label ms-1" htmlFor="published">
                            publish
                          </label>
                        </div>
                      </div>
                      <div className="sky-Content-preview">
                        <a className="btn btn-warning w-100 sky-Content-preview-item" id="preview-bputton" onClick={preview}>
                          <span>preview</span>
                          <img src={previewImg} alt="preview" />
                        </a>
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}

                {/* template select */}
                {mode == "" ? (
                  <>
                    <div className="mb-3 sky-input-pulldown">
                      <label htmlFor="template" className="sky-form-label fw-bold ms-1">
                        template
                      </label>
                      <select className="form-select form-select-lg border-warning" aria-label=".form-select-lg example" id="template" name="template" dangerouslySetInnerHTML={{ __html: templateOutput }}></select>
                    </div>
                  </>
                ) : (
                  ""
                )}

                {/* element select */}
                {mode == "element" ? (
                  <>
                    <div className="mb-3 sky-input-pulldown">
                      <label htmlFor="template" className="sky-form-label fw-bold ms-1">
                        type
                      </label>
                      <select className="form-select form-select-lg border-warning" aria-label=".form-select-lg example" style={{ backgroundColor: elementcolor }} id="elementcolor" name="elementcolor" onChange={() => colorchange()} dangerouslySetInnerHTML={{ __html: result.colorOutput }}></select>
                    </div>
                  </>
                ) : (
                  ""
                )}

                {/* title */}
                <div className="mb-3">
                  <label htmlFor="title" className="sky-form-label fw-bold ms-1">
                    title
                  </label>
                  <input type="text" className="form-control border-warning sky-input" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" required />
                </div>

                {/* head */}
                {mode == "" || mode == "template" ? (
                  <div className="mb-3">
                    <label htmlFor="head" className="sky-form-label fw-bold ms-1">
                      head
                    </label>
                    <textarea id="head" className="form-control border-warning sky-input sky-input-head" name="head" value={head} onChange={(e) => setHead(e.target.value)} placeholder="Enter head" rows={10}></textarea>
                  </div>
                ) : (
                  ""
                )}

                {/* content */}
                {mode == "template" ? (
                  <>
                    <div className="mb-3">
                      <label htmlFor="url" className="sky-form-label fw-bold ms-1">
                        content
                      </label>
                      <div className="form-control border-warning" id="elements" data-name="content">
                        {eleResults.map((eleResult: any, index: number) =>
                          eleResult.content != null && eleResult.content == "1" ? (
                            <div className="sky-Content-element-card justify-content-between" data-name="element-content" id={`element-${index + 1}`}>
                              <div className="">
                                <a href="javascript:void();">
                                  <div className="btn btn-warning" onClick={() => upButton(index + 1)}>
                                    ▲
                                  </div>
                                </a>
                                <a href="javascript:void();">
                                  <div className="btn btn-warning" onClick={() => downButton(index + 1)}>
                                    ▼
                                  </div>
                                </a>
                              </div>
                              <h5 className="d-flex justify-content-center align-items-center" id={`element-${index + 1}-title`}>
                                子コンテンツ部分
                              </h5>
                              <div>
                                <button className="btn btn-warning" type="button" onClick={() => eleDelete(index + 1)}>
                                  削除
                                </button>
                              </div>
                              <input type="hidden" id={`element-${index + 1}-id`} value={eleResult.id} />
                              <input type="hidden" id={`element-${index + 1}-title`} value={eleResult.title} />
                              <input type="hidden" id={`element-${index + 1}-code`} value={eleResult.code} />
                              <input type="hidden" id={`element-${index + 1}-content`} value="1" />
                            </div>
                          ) : (
                            <div className="sky-Content-element-card justify-content-between" data-name="element-content" id={`element-${index + 1}`} style={{ backgroundColor: eleResult.code }}>
                              <div className="">
                                <a href="javascript:void(0);">
                                  <div className="btn btn-warning" onClick={() => upButton(index + 1)}>
                                    ▲
                                  </div>
                                </a>
                                <a href="javascript:void();">
                                  <div className="btn btn-warning" onClick={() => downButton(index + 1)}>
                                    ▼
                                  </div>
                                </a>
                              </div>
                              <h5 className="d-flex justify-content-center align-items-center" id={`element-${index + 1}-title`}>
                                {eleResult.title}
                              </h5>
                              <div>
                                <button className="btn btn-warning" type="button" onClick={() => eleDelete(index + 1)}>
                                  削除
                                </button>
                              </div>
                              <input type="hidden" id={`element-${index + 1}-id`} value={eleResult.id} />
                              <input type="hidden" id={`element-${index + 1}-title`} value={eleResult.title} />
                              <input type="hidden" id={`element-${index + 1}-code`} value={eleResult.code} />
                              <input type="hidden" id="element-<%=(i + 1)%>-content" value="0" />
                            </div>
                          )
                        )}
                      </div>
                      <div>
                        <a href="#" onClick={elementAdd}>
                          <div className="d-flex justify-content-center align-items-center btn btn-warning p-3 my-2">
                            <img className="sky-list-newCreate-img" src={elementAddImg} alt="elementAdd" />
                          </div>
                        </a>
                      </div>
                      {/* template-element start */}
                      <div className="sky-Content-element-card justify-content-between" data-name="" id="element-template" style={{ display: "none", backgroundColor: "" }}>
                        <div className="">
                          <div className="btn btn-warning">
                            <a href="javascript:void();" id="up-element-1">
                              ▲
                            </a>
                          </div>
                          <div className="btn btn-warning">
                            <a href="javascript:void();" id="down-element-1">
                              ▼
                            </a>
                          </div>
                        </div>
                        <h5 className="d-flex justify-content-center align-items-center">タイトル</h5>
                        <div>
                          <button className="btn btn-warning" type="button" onClick={() => {}}>
                            削除
                          </button>
                        </div>
                        <input type="hidden" id="element-id" value="" />
                        <input type="hidden" id="element-title" value="" />
                        <input type="hidden" id="element-code" value="" />
                        <input type="hidden" id="element-content" value="" />
                      </div>
                      {/* template-element end */}
                    </div>
                    <input type="hidden" name="id" value="" />
                    <input type="hidden" id="element-conent" name="content" value="" />
                    <input type="hidden" name="type" value="template" />
                    <input type="hidden" id="published" name="published" value="1" />
                  </>
                ) : (
                  <div className="mb-3">
                    <label htmlFor="content" className="sky-form-label fw-bold ms-1">
                      content
                    </label>
                    <textarea id="content" className="form-control border-warning sky-input sky-input-content" name="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Enter content" rows={10}></textarea>
                  </div>
                )}

                {/* url */}
                <div className="mb-3">
                  <label htmlFor="url" className="sky-form-label fw-bold ms-1">
                    url
                  </label>
                  <input type="text" className="form-control border-warning sky-input" id="url" name="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter url" required />
                </div>

                {/* save */}
                <button type="button" className="btn btn-warning w-100 mb-2 mt-5 sky-submit" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Save
                </button>
                <input type="hidden" name="id" value="5" />
                <input type="hidden" name="type" value="" />

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
                        <button type="button" className="btn btn-warning px-4" onClick={doSubmit}>
                          登録
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
