import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import previewImg from "../common/image/preview.svg";
import elementAddImg from "../common/image/plus-lg.svg";
import elementDelImg from "../common/image/trash.svg";
import deleteImg from "../common/image/trash.svg";

export interface ContentData {
  screenName: string;
  schedule_published: string;
  schedule_unpublished: string;
  title: string;
  head: string;
  template: string;
  content: string;
  url: string;
  elementcolor: string;
  templateOutput: string;
  colorOutput: string;
  eleResults: Array<{
    elementResult: eleResultData;
  }>;
}

export interface eleResultData {
  id: string;
  title: string;
  code: string;
}

export interface ElementListData {
  pagerOutput: "";
  results: Array<{
    id: string;
    created: string;
    updated: string;
    created_by: string;
    updated_by: string;
    schedule_published: string;
    schedule_unpublished: string;
    title: string;
    content: string;
    head: string;
    url: string;
    type: string;
    elementcolor: string;
    template: string;
  }>;
}

interface ElementItemType {
  id: string;
  title: string;
  code: string;
}

export const Content = () => {
  let screenName = "";
  const [schedule_published, setSchedule_published] = useState("");
  const [schedule_unpublished, setSchedule_unpublished] = useState("");
  const [template, setTemplate] = useState("");
  const [head, setHead] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [id, setId] = useState("");
  const [mode, setMode] = useState("");
  let elementcolor = "";
  const [templateOutput, setTemplateOutput] = useState("");
  let colorOutput = "";
  const [eleResults, setEleResults] = useState<eleResultData[]>([]);
  const [result, setResult] = useState<ContentData>({
    screenName: "",
    schedule_published: "",
    schedule_unpublished: "",
    template: "",
    title: "",
    head: "",
    content: "",
    url: "",
    elementcolor: "",
    templateOutput: "",
    colorOutput: "",
    eleResults: [],
  });
  const elementItems = useRef<eleResultData[]>([]);
  const [isPublished, setIsPublished] = useState(true);

  //elementSelect
  let elementAddIndex = useRef(0);
  const [list, setList] = useState<ElementListData>({
    pagerOutput: "",
    results: [
      {
        id: "",
        created: "",
        updated: "",
        created_by: "",
        updated_by: "",
        schedule_published: "",
        schedule_unpublished: "",
        title: "",
        content: "",
        head: "",
        url: "",
        type: "",
        elementcolor: "",
        template: "",
      },
    ],
  });

  //値取得
  useLayoutEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setMode(params.get("mode") || "");
    let fetchId = params.get("id") || "";
    let fetchmode = params.get("mode") || "";
    if (fetchId != "") {
      fetch("http://localhost:8080/webadmin/getcontent?mode=" + fetchmode + "&id=" + fetchId, {
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
          setTemplate(data.template || "");
          setTitle(data.title || "");
          setHead(data.head || "");
          setContent(data.content || "");
          setUrl(data.url || "");
          setId(fetchId || "");
          elementcolor = data.elementcolor || "";
          setTemplateOutput(data.templateOutput || "");
          colorOutput = data.colorOutput || "";
          setEleResults(data.eleResults || [{ id: "", title: "", code: "" }]);
          if (fetchmode == "template") {
            createElementItems();
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      fetch("http://localhost:8080/webadmin/gettemplate", {
        method: "GET",
      })
        .then((res) => res.text())
        .then((data) => {
          // console.log(data);
          setTemplateOutput(data || "");
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []);

  const publishedCheckbox = () => {
    setIsPublished((prev) => !prev);
  };

  const preview = () => {
    const preview = document.getElementById("contentform") as HTMLFormElement;
    if (preview) {
      preview.action = "http://localhost:8080/webadmin/preview";
      preview.target = "_blank";
      preview.method = "post";
      preview.submit();
    }
  };

  function colorchange() {
    let color = $(".element-color-option").val();
    if (Array.isArray(color)) {
      color = color[0];
    }
    if (color !== undefined) {
      $(".element-color-option").css("background-color", color);
    }
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

  // Template------------------------------------------------------------------------------------------------
  //一覧から配列作成
  function createElementItems() {
    const elements = Array.from(document.querySelectorAll('[data-name="element-content"]'));
    elementItems.current = []; //初期化
    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];
      let elementItem: eleResultData = { id: "", title: "", code: "" };
      let elementId = element.getAttribute("data-element-id");
      let idStr = "";
      elementId == "content" || elementId == "" ? (idStr = "content") : (idStr = elementId || "");
      elementItem["id"] = idStr;
      elementItem["title"] = element.getAttribute("data-element-title") || "";
      elementItem["code"] = element.getAttribute("data-element-code") || "";
      elementItems.current.push(elementItem);
    }
  }

  //配列を一覧に反映
  function reElements() {
    const elements = Array.from(document.querySelectorAll('[data-name="element-content"]'));
    for (let i = 0; i < elementItems.current.length; i++) {
      let element = elements[i] as HTMLFormElement;
      if (elementItems.current[i]["id"] === "" || elementItems.current[i]["id"] === "content") {
        let title = elementItems.current[i]["title"];
        let code = elementItems.current[i]["code"];
        element.id = "element-" + i;
        element.setAttribute("data-element-id", "content");
        element.setAttribute("data-element-title", title);
        element.setAttribute("data-element-code", code);
        element.style.backgroundColor = "#fff888";
        element.children[1].innerHTML = "コンテンツ部分";
      } else {
        let elementId = elementItems.current[i]["id"];
        let title = elementItems.current[i]["title"];
        let code = elementItems.current[i]["code"];
        element.id = "element-" + i;
        element.setAttribute("data-element-id", elementId);
        element.setAttribute("data-element-title", title);
        element.setAttribute("data-element-code", code);
        element.style.backgroundColor = code;
        element.children[1].innerHTML = title;
      }
    }
  }

  //上ボタン
  const upButton = (event: React.MouseEvent<HTMLDivElement>) => {
    const indexStr = event.currentTarget.parentElement?.parentElement?.id;
    if (indexStr) {
      const index = parseInt(indexStr.replace("element-", ""), 10);
      if (-1 < index && 0 < elementItems.current.length) {
        $("#element-" + index).insertBefore("#element-" + (index - 1));
        createElementItems();
        reElements();
      }
    }
  };

  //下ボタン
  const downButton = (event: React.MouseEvent<HTMLDivElement>) => {
    const indexStr = event.currentTarget.parentElement?.parentElement?.id;
    if (indexStr) {
      const index = parseInt(indexStr.replace("element-", ""), 10);
      if (index <= elementItems.current.length) {
        $("#element-" + index).insertAfter("#element-" + (index + 1));
        createElementItems();
        reElements();
      }
    }
  };

  //削除ボタン
  const eleDelete = (event: React.MouseEvent<HTMLDivElement>) => {
    const indexStr = event.currentTarget.parentElement?.parentElement?.id;
    const indexId = event.currentTarget.parentElement?.parentElement?.getAttribute("data-element-id");
    if (indexStr && indexId && indexId != "content" && indexId != "") {
      const index = parseInt(indexStr.replace("element-", ""), 10);
      $("#element-" + index).remove();
      createElementItems();
    }
  };

  //構成要素追加
  const elementAdd = () => {
    const index = elementItems.current.length;
    const newElement: eleResultData = {
      id: "",
      title: "タイトル",
      code: "",
    };
    elementItems.current.push(newElement);
    elementAddIndex.current = index;
    setEleResults([...eleResults, newElement]);
  };

  // elementSelect-----------------------------------------------------
  useEffect(() => {
    fetch("http://localhost:8080/webadmin/getElementItem?page=1", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setList(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const elementSelect = (index: number) => {
    $(".entry").css("box-shadow", "none");
    $(".element-" + index).css("box-shadow", "0 0 0 .25rem rgba(13, 110, 253, .25)");
    const selectedIndex = document.getElementById("selected-index") as HTMLInputElement;
    if (selectedIndex) {
      selectedIndex.value = index.toString();
    }
  };

  const elementSelecedComp = () => {
    const selectedIndex = document.getElementById("selected-index") as HTMLInputElement;
    if (selectedIndex) {
      const selectedId = document.getElementById(`element-${selectedIndex.value}-id`) as HTMLInputElement;
      const selectedTitle = document.getElementById(`element-${selectedIndex.value}-title`) as HTMLInputElement;
      const selectedCode = document.getElementById(`element-${selectedIndex.value}-code`) as HTMLInputElement;

      if (selectedId && selectedTitle && selectedCode) {
        elementItems.current[elementAddIndex.current]["id"] = selectedId.value;
        elementItems.current[elementAddIndex.current]["title"] = selectedTitle.value;
        elementItems.current[elementAddIndex.current]["code"] = selectedCode.value;
        reElements();
      }
    }
  };

  function doSubmitTemp() {
    let eleContent = "";
    for (var i = 0; i < elementItems.current.length; i++) {
      if (elementItems.current[i]["id"] == "content") {
        eleContent += "###content###,";
      } else {
        eleContent += "###element(" + elementItems.current[i]["id"] + ")###,";
      }
    }
    eleContent = eleContent.slice(0, -1);
    const contentForm = document.forms.namedItem("contentform") as HTMLFormElement;
    const contentInput = document.getElementById("content") as HTMLInputElement;
    if (contentForm && contentInput) {
      contentInput.value = eleContent;
      contentForm.submit();
    } else {
      console.error("contentForm or content not found");
    }
  }

  const doDelete = () => {
    const deleteform = document.forms.namedItem("deleteform") as HTMLFormElement;
    if (deleteform) {
      deleteform.submit();
    } else {
      console.error("Form with name 'contentform' not found");
      return;
    }
  };

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
                        <div className="sky-control-publish-input">
                          <label htmlFor="schedule_published" className="sky-form-label fw-bold ms-1 mb-1">
                            start
                          </label>
                          <input type="text" className="form-control border-warning sky-input datepicker" id="schedule_published" name="schedule_published" value={schedule_published} onChange={(e) => setSchedule_published(e.target.value)} placeholder="Enter start" required />
                        </div>
                        <div className="sky-control-publish-input">
                          <label htmlFor="schedule_unpublished" className="sky-form-label fw-bold ms-1 mb-1">
                            end
                          </label>
                          <input type="text" className="form-control border-warning sky-input datepicker" id="schedule_unpublished" name="schedule_unpublished" value={schedule_unpublished} onChange={(e) => setSchedule_unpublished(e.target.value)} placeholder="Enter end" required />
                        </div>
                      </div>
                      <div className="d-flex justify-content-center">
                        {/* publish */}
                        <div className="form-check form-switch sky-Content-publish">
                          <input className="form-check-input sky-input-switch" type="checkbox" role="switch" id="published" name="published" value="1" onChange={publishedCheckbox} checked={isPublished} />
                          <label className="form-check-label ms-1 pt-1" htmlFor="published">
                            publish
                          </label>
                        </div>
                        {/* preview */}
                        <div className="sky-Content-preview">
                          <a className="btn btn-warning sky-Content-preview-item sky-bg-2" id="preview-button" onClick={preview}>
                            <img src={previewImg} alt="preview" />
                          </a>
                        </div>
                        {/* delete */}
                        <div className="sky-Content-delete sky-bg-1" data-bs-toggle="modal" data-bs-target="#deleteModal">
                          <a className="btn btn-warning sky-Content-delete-item sky-bg-2">
                            <img src={deleteImg} alt="delete" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* delete */}
                    <div className="sky-Content-delete" data-bs-toggle="modal" data-bs-target="#deleteModal">
                      <a className="btn btn-warning sky-Content-delete-item ms-auto sky-bg-2">
                        <img src={deleteImg} alt="delete" />
                      </a>
                    </div>
                    <input type="hidden" id="published" name="published" value="1" />
                  </>
                )}

                {/* template select */}
                {mode == "" && (
                  <>
                    <div className="mb-3 sky-input-pulldown">
                      <label htmlFor="template" className="sky-form-label fw-bold ms-1">
                        template
                      </label>
                      <select className="form-select form-select-lg border-warning" aria-label=".form-select-lg example" id="template" name="template" value={template} onChange={(e) => setTemplate(e.target.value)} dangerouslySetInnerHTML={{ __html: templateOutput }}></select>
                    </div>
                  </>
                )}

                {/* element select */}
                {mode == "element" && (
                  <>
                    <div className="mb-3 sky-input-pulldown">
                      <label htmlFor="template" className="sky-form-label fw-bold ms-1">
                        type
                      </label>
                      <select className="form-select form-select-lg border-warning" aria-label=".form-select-lg example" style={{ backgroundColor: elementcolor }} id="elementcolor" name="elementcolor" onChange={() => colorchange()} dangerouslySetInnerHTML={{ __html: result.colorOutput }}></select>
                    </div>
                  </>
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
                        {eleResults.map((eleResult: eleResultData, index: number) =>
                          eleResult.id == null || eleResult.id == "content" ? (
                            <div className="sky-Content-element-card justify-content-between" id={`element-${index}`} data-name="element-content" data-element-id="content" data-element-title="" data-element-code="">
                              <div>
                                <div className="btn btn-warning mx-1 sky-Content-element-arrow" onClick={upButton}>
                                  ▲
                                </div>
                                <div className="btn btn-warning mx-1 sky-Content-element-arrow" onClick={downButton}>
                                  ▼
                                </div>
                              </div>
                              <h5 className="d-flex justify-content-center align-items-center">コンテンツ部分</h5>
                              <div className="d-flex justify-content-center align-items-center">
                                <div className="btn btn-warning sky-Content-element-delete" onClick={eleDelete}>
                                  <img src={elementDelImg} alt="elementDelImg" />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="sky-Content-element-card justify-content-between" id={`element-${index}`} data-name="element-content" data-element-id={eleResult.id} data-element-title={eleResult.title} data-element-code={eleResult.code} style={{ backgroundColor: eleResult.code }}>
                              <div>
                                <div className="btn btn-warning mx-1 sky-Content-element-arrow" onClick={upButton}>
                                  ▲
                                </div>
                                <div className="btn btn-warning mx-1 sky-Content-element-arrow" onClick={downButton}>
                                  ▼
                                </div>
                              </div>
                              <h5 className="d-flex justify-content-center align-items-center">{eleResult.title}</h5>
                              <div>
                                <div className="btn btn-warning sky-Content-element-delete" onClick={eleDelete}>
                                  <img src={elementDelImg} alt="elementDelImg" />
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>

                      {/*elementAdd */}
                      <div>
                        <a href="#" onClick={elementAdd} data-bs-toggle="modal" data-bs-target="#element-selectModal">
                          <div className="d-flex justify-content-center align-items-center btn btn-warning p-3 my-2 sky-bg-2">
                            <img className="sky-list-newCreate-img" src={elementAddImg} alt="elementAdd" />
                          </div>
                        </a>
                      </div>
                    </div>
                    <input type="hidden" name="id" value={id} />
                    <input type="hidden" name="type" value="template" />
                    <input type="hidden" name="content" id="content" value={content} />
                  </>
                ) : (
                  //template以外の場合
                  <div className="mb-3">
                    <label htmlFor="content" className="sky-form-label fw-bold ms-1">
                      content
                    </label>
                    <textarea id="content" className="form-control border-warning sky-input sky-input-content" name="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Enter content" rows={10}></textarea>
                  </div>
                )}

                {/* url */}
                {mode != "template" && (
                  <div className="mb-3">
                    <label htmlFor="url" className="sky-form-label fw-bold ms-1">
                      url
                    </label>
                    <input type="text" className="form-control border-warning sky-input" id="url" name="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter url" required />
                  </div>
                )}

                {/* save */}
                <button type="button" className="btn btn-warning w-100 mb-2 mt-5 sky-submit sky-bg-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Save
                </button>
                <input type="hidden" name="id" value={id} />
                <input type="hidden" name="type" value={mode} />
              </form>

              {/* submit modal */}
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
                      {mode == "template" ? (
                        <button type="button" className="btn btn-warning px-4" onClick={doSubmitTemp}>
                          登録
                        </button>
                      ) : (
                        <button type="button" className="btn btn-warning px-4" onClick={doSubmit}>
                          登録
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* element Select modal */}
              {mode == "template" && (
                <div className="modal fade" id="element-selectModal" tabIndex={-1} aria-labelledby="element-selectModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">Element Select</div>
                      <section className="sky-list-container">
                        {list.results.map((result: any, index: any) => (
                          <>
                            <a
                              href="#"
                              onClick={() => {
                                elementSelect(index);
                              }}
                              key={index}
                            >
                              <div className={`sky-list-card entry element-${index}`} style={{ backgroundColor: "elementcolor" }}>
                                <p className="mb-0">ID: {result.id}</p>
                                <h5 className="mb-1">{result.title}</h5>
                              </div>
                            </a>
                            <input type="hidden" id={`element-${index}-id`} value={result.id} />
                            <input type="hidden" id={`element-${index}-title`} value={result.title} />
                            <input type="hidden" id={`element-${index}-code`} value={result.elementcolor} />
                          </>
                        ))}
                        <input type="hidden" id="selected-index" value="" />
                        <input type="hidden" id="selected-value" value="" />
                        <nav aria-label="Page navigation example">
                          <ul className="pagination justify-content-center align-items-center mt-5" dangerouslySetInnerHTML={{ __html: list.pagerOutput }}></ul>
                        </nav>
                      </section>
                      <div className="modal-footer d-flex justify-content-center align-items-center">
                        <button type="button" className="btn mx-5" data-bs-dismiss="modal">
                          キャンセル
                        </button>
                        <button type="button" className="btn btn-warning px-4 mx-5" data-bs-dismiss="modal" onClick={elementSelecedComp}>
                          選択
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* delete modal */}
              <div className="modal fade" id="deleteModal" tabIndex={-1} aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="deleteModalLabel">
                        削除しますか？元には戻せません
                      </h5>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn me-2" data-bs-dismiss="modal">
                        キャンセル
                      </button>
                      <button type="button" className="btn btn-warning px-4" onClick={doDelete}>
                        削除
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <form id="deleteform" name="deleteform" action="http://localhost:8080/webadmin/delete_post" method="POST">
                <input type="hidden" name="id" id="deleteId" value={id} />
                <input type="hidden" name="mode" value={mode} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
