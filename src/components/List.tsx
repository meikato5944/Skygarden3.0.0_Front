import React, { useEffect, useState } from "react";
import newCreate from "../common/image/plus-lg.svg";

interface ListData {
  loginName: string;
  screenName: string;
  registerMessage: string;
  sortOutput: string;
  pagerOutput: string;
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

export const List = () => {
  const sortList = () => {
    const sort = document.getElementById("sort") as HTMLSelectElement;
    if (sort) {
      const sortValue = sort.value;
      const params = new URLSearchParams(window.location.search);
      const modeValue = params.get("mode") || "";
      const pageValue = params.get("page") || "";
      const url = window.location.pathname;
      window.location.href = url + "?mode=" + modeValue + "&sort=" + sortValue + "&page=" + pageValue;
    }
  };

  const [mode, setMode] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState("");
  const [list, setList] = useState<ListData>({
    loginName: "",
    screenName: "",
    registerMessage: "",
    sortOutput: "",
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const modeValue = params.get("mode") || "";
    const sortValue = params.get("sort") || "";
    const pageValue = params.get("page") || "";
    setMode(modeValue);
    setSort(sortValue);
    setPage(pageValue);
    fetchData(modeValue, sortValue, pageValue);
  }, [window.location.search]);

  const fetchData = (mode: string, sort: string, page: string) => {
    fetch(`http://localhost:8080/webadmin/getlist?mode=${mode}&sort=${sort}&page=${page}`, {
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
  };

  return (
    <>
      <section className="sky-list-container sky-section">
        <h1 className="ms-1 mb-3">一覧:{list.loginName}</h1>
        <div className="row">
          <div className="col-xs-12 col-sm-3 mb-2 sky-input-pulldown">
            <select className="form-select sky-bg-4 sky-list-sort sky-fc-1" id="sort" name="sort" onChange={sortList} dangerouslySetInnerHTML={{ __html: list.sortOutput }}></select>
          </div>
          {list.registerMessage ? <div>list.registerMessage</div> : ""}
          <div className="mb-3 sky-button-newCreate">
            <a href={`/content?mode=${mode}`}>
              <button className="btn btn-warning w-100 sky-bg-4">
                <img className="sky-list-newCreate-img" src={newCreate} alt="newCreate" />
                <span>newCreate</span>
              </button>
            </a>
          </div>
        </div>
        {list.results.map((result: any, index: number) => (
          <div className="sky-list-card" key={index}>
            <a href={`/content/?mode=${mode}&id=${result.id}`}>
              <p className="mb-0">ID: {result.id}</p>
              <h3 className="mb-1">{result.title}</h3>
              <div className="mb-0 d-flex justify-content-between">
                <div>URL: {result.url}</div>
                <div>updated: {result.updated}</div>
              </div>
            </a>
          </div>
        ))}
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center align-items-center mt-5" dangerouslySetInnerHTML={{ __html: list.pagerOutput }}></ul>
        </nav>
      </section>
    </>
  );
};
