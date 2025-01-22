import React from "react";
import logo from "../common/image/logo.png";

export const Header = () => {
  return (
    <>
      {/* PC */}
      <nav className="vh-100 sky-Sidemenu">
        <div className="p-3">
          <div className="mt-2">
            <a className="navbar-brand" href="/?mode=">
              <img src={logo} alt="logo.png" className="sky-logo" />
              <span>Skygarden</span>
            </a>
          </div>
          <ul className="navbar-nav ms-auto mt-4">
            <li className="nav-item dropdown ms-3">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Content　
              </a>
              <ul className="dropdown-menu dropdown-menu-end sky-Sidemenu-dropdown">
                <li>
                  <a className="dropdown-item" href="/?mode=">
                    content
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/?mode=template">
                    template
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/?mode=element">
                    element
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/?mode=stylesheet">
                    css
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/?mode=script">
                    js
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/?mode=image">
                    image
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/?mode=file">
                    file
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/?mode=movie">
                    movie
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item ms-3">
              <a className="nav-link" href="/user-list">
                Users
              </a>
            </li>
            <li className="nav-item ms-3">
              <a className="nav-link" href="/setting">
                Settings
              </a>
            </li>
            <li className="nav-item ms-3">
              <a className="nav-link" href="/webadmin/login/logout.jsp">
                Logout
              </a>
            </li>
            <li className="nav-item my-4 ms-3">user: demo</li>
          </ul>
        </div>
      </nav>

      {/* SP */}
      <nav className="navbar bg-warning p-2 sky-header">
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu" aria-controls="offcanvasMenu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="/?mode=">
          <img src={logo} alt="logo.png" className="sky-logo" />
          Skygarden
        </a>
      </nav>
      <div className="offcanvas offcanvas-start sky-bg-2" tabIndex={-1} id="offcanvasMenu" aria-labelledby="offcanvasMenuLabel">
        <div className="offcanvas-header m-2">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="logo.png" className="sky-logo" />
            Skygarden
          </a>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body ms-2">
          <ul className="nav flex-column">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Content
              </a>
              <ul className="dropdown-menu ms-5">
                <li>
                  <a className="dropdown-item" href="/?mode=">
                    content
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/?mode=template">
                    template
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/?mode=element">
                    element
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/?mode=stylesheet">
                    css
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/?mode=script">
                    js
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/?mode=image">
                    image
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/?mode=file">
                    file
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/?mode=movie">
                    movie
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/webadmin/userList.jsp">
                Users
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/webadmin/setting.jsp">
                Settings
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/webadmin/login/logout.jsp">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
