import React, { useState, useEffect } from "react";
import logo from "../common/image/logo.png";
import { useSearchParams } from "react-router-dom";

export const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [searchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loginError = searchParams.get("loginError");
    if (loginError) {
      setErrorMessage(loginError);
    }
  }, [searchParams]);

  return (
    <main>
      <form action="http://localhost:8080/webadmin/login_post" method="post">
        <div className="d-flex flex-column justify-content-center align-items-center sky-Login-container">
          <h2 className="text-center mb-4">
            <img src={logo} alt="logo.png" className="img-fluid sky-Login-logo" /> <span className="fs-5">skygarden</span>
          </h2>
          <div className="card w-100 sky-Login-form">
            <div className="card-body text-center border border-2 border-warning rounded">
              <h2 className="my-2 mb-3">Login</h2>
              {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
              <div className="mb-3">
                <input type="id" className="form-control border-warning sky-input" placeholder="ID" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="mb-3">
                <input type="password" className="form-control border-warning sky-input" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-warning w-100 mt-2">
                Go
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};
