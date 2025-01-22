import React, { useEffect, useState } from "react";
import $ from "jquery";

interface ListData {
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
  [key: string]: string;
}

export const ElementItem = () => {
  const [list, setList] = useState<ListData>({
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

  const [elementItem, setElementItem] = useState<ElementItemType>({
    id: "",
    title: "",
    code: "",
  });

  useEffect(() => {
    fetch("http://localhost:8080/webadmin/getElementItem?page=1", {
      method: "GET",
      headers: {
        Accept: "application/json", // サーバーがJSONレスポンスを返す場合
      },
    })
      // レスポンスのデータ形式をjsonに設定
      .then((res) => res.json())
      .then((data) => {
        setList(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const parameters = new URLSearchParams(window.location.search);
    const elementNumber = parameters.get("elementnumber");
    if (elementNumber && window.opener) {
      setElementItem((window.opener as any).elementItems[Number(elementNumber)]);
    }
  }, []);

  const elementSelect = (index: number) => {
    $(".entry").css("box-shadow", "none");
    $(".element-" + index).css("box-shadow", "0 0 0 .25rem rgba(13, 110, 253, .25)");
    const selectedIndex = document.getElementById("selected-index") as HTMLInputElement;
    if (selectedIndex) {
      selectedIndex.value = index.toString();
    }
  };

  const doSubmit = () => {
    const selectedIndex = document.getElementById("selected-index") as HTMLInputElement;
    if (selectedIndex) {
      const selectedId = document.getElementById(`element-${selectedIndex.value}-id`) as HTMLInputElement;
      const selectedTitle = document.getElementById(`element-${selectedIndex.value}-title`) as HTMLInputElement;
      const selectedCode = document.getElementById(`element-${selectedIndex.value}-code`) as HTMLInputElement;

      if (selectedId && selectedTitle && selectedCode) {
        elementItem["id"] = selectedId.value;
        elementItem["title"] = selectedTitle.value;
        elementItem["code"] = selectedCode.value;
        window.opener?.reElements();
        window.close();
      }
    }
  };

  return (
    <section className="sky-list-container">
      <h1 className="text-center ms-2 mb-4">Element Select</h1>
      {list.results.map((result: any, index: any) => (
        <>
          <a href="#" onClick={() => elementSelect(1)}>
            <div className="sky-list-card entry element-1" style={{ backgroundColor: "elementcolor" }}>
              <p className="mb-0">ID: {result.id}</p>
              <h5 className="mb-1">{result.title}</h5>
            </div>
          </a>
          <input type="hidden" id={`element-${index + 1}-id`} value={result.id} />
          <input type="hidden" id={`element-${index + 1}-title`} value={result.title} />
          <input type="hidden" id={`element-${index + 1}-code`} value={result.elementcolor} />
        </>
      ))}
      <button type="submit" className="btn btn-warning mt-5 mb-3 sky-submit sky-bg-1" onClick={doSubmit}>
        Select
      </button>
      <input type="hidden" id="selected-index" value="" />
      <input type="hidden" id="selected-value" value="" />
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center align-items-center mt-5" dangerouslySetInnerHTML={{ __html: list.pagerOutput }}></ul>
      </nav>
    </section>
  );
};
