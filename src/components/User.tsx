import React, { useLayoutEffect, useRef, useState } from "react";

export const User = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [adminSelected, setAdminSelected] = useState("");

  const doSubmit = () => {
    const contentForm = document.forms.namedItem("contentform") as HTMLFormElement;
    if (contentForm) {
      contentForm.submit();
    } else {
      console.error("Form with name 'contentform' not found");
      return;
    }
  };

  const handleAdminToggle = () => {
    setAdminSelected((prev) => (prev === "selected" ? "" : "selected"));
  };

  //値取得
  useLayoutEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let fetchId = params.get("id") || "";
    setId(fetchId);
    if (fetchId != "") {
      fetch("http://localhost:8080/webadmin/getuser?&id=" + fetchId, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setName(data.name || "");
          setPassword(data.password || "");
          setEmail(data.email || "");
          setAdminSelected(data.adminSelected ? "seleced" : "");
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []);

  return (
    <>
      <div className="flex-grow-1 d-flex justify-content-center align-items-center p-4">
        <section className="w-100 sky-User-container sky-content">
          <h2 className="text-center mb-2">ユーザ管理画面</h2>
          <div className="sky-User-box">
            <form id="contentform" name="contentform" action="/webadmin/user_post" method="POST">
              <div className="form-check form-switch mb-1 sky-User-adminSwitch">
                <input className="form-check-input sky-input-switch" type="checkbox" role="switch" id="admin" name="admin" value="1" onChange={handleAdminToggle} />
                <label className="form-check-label ms-2" htmlFor="admin">
                  admin
                </label>
              </div>
              <div className="mb-2 d-flex">
                <label htmlFor="username" className="sky-form-label me-2">
                  ID:
                </label>
                <p>{id != "" ? id : "新規"}</p>
                <input type="hidden" name="id" value={id} />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="sky-form-label">
                  Username:
                </label>
                <input type="text" className="form-control sky-input" name="name" value={name} placeholder="Enter your username" onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="sky-form-label">
                  Password
                </label>
                <input type="password" className="form-control sky-input" id="password" name="password" value={password} placeholder="Enter a new password" onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="sky-form-label">
                  Email Address
                </label>
                <input type="email" className="form-control sky-input" id="email" name="email" value={email} placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="text-center">
                <button type="button" className="btn btn-warning w-100 mb-2 mt-5 sky-submit" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Save
                </button>
              </div>

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
        </section>
      </div>
    </>
  );
};
