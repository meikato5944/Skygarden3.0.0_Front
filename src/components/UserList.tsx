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
    name: string;
    password: string;
    admin: string;
    type: string;
  }>;
}

export const UserList = () => {
  const sortList = () => {
    // var sort = document.getElementById("sort");
    // var sortValue = sort.value;
    // var url = location.pathname;
    // location.href = url + "?sort=" + sortValue;
  };

  const [list, setList] = useState<ListData>({
    loginName: "",
    screenName: "",
    registerMessage: "",
    sortOutput: "",
    pagerOutput: "",
    results: [
      {
        id: "",
        name: "",
        password: "",
        admin: "",
        type: "",
      },
    ],
  });

  useEffect(() => {
    fetch("http://localhost:8080/webadmin/getlist-user?sort=id desc&page=1", {
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

  return (
    <>
      <section className="sky-list-container sky-section">
        <h1 className="ms-2 mb-3">ユーザ一覧画面</h1>
        <div className="row">
          <div className="col-xs-12 col-sm-3 mb-2 sky-input-pulldown">
            <select className="form-select sky-bg-4 sky-list-sort sky-fc-1" id="sort" name="sort" onChange={sortList} dangerouslySetInnerHTML={{ __html: list.sortOutput }}></select>
          </div>
          {list.registerMessage ? <div>list.registerMessage</div> : ""}
          <div className="mb-3 sky-button-newCreate">
            <a href="/user.jsp">
              <button className="btn btn-warning w-100 sky-bg-4">
                <img className="sky-list-newCreate-img" src={newCreate} alt="newCreate" />
                <span>newCreate</span>
              </button>
            </a>
          </div>
        </div>
        {list.results.map((result: any, index: any) => (
          <div className="sky-list-card">
            <a href={`/user?id=${result.id}`}>
              <p className="mb-0">ID: {result.id}</p>
              <h4 className="mb-1">{result.name}</h4>
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
