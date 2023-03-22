import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import DisplayContext from '../contexts/DisplayContext';
import logo from '../images/logo.png';
import Login from './Login';

const AdminControls = () => {
  const disp = useContext(DisplayContext);
  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    disp.setDisplay(curr => ({
      ...curr, isLoggedIn: 'false' 
    }))
  }

  useEffect(() => {
    document.querySelector('body').style.overflowY = 'auto';
  }, [])

  return (
    <>
      {disp.display.isLoggedIn === 'true' ? <div>
        <div className="container-fluid">
          <div className="row flex-column flex-md-row">
            <aside className="col-12 col-md-3 col-xl-2 p-0 bg-dark" style={{ minHeight: "calc(100vh - 60px)" }}>
              <nav className="navbar navbar-expand-md navbar-dark bd-dark flex-md-column flex-row align-items-center py-2 text-center" id="sidebar">
                <div className="text-center p-3">
                  <img src={logo} alt="profile" className="img-fluid rounded-pill my-4 p-1 d-none d-md-block shadow" />
                  <Link to="/" className="navbar-brand mx-0 font-weight-bold text-nowrap" >Eventual</Link>
                </div>
                <button type="button" className="navbar-toggler border-0 order-1" data-toggle="collapse" data-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse order-last" id="nav">
                  <i className="fa fa-address-book"></i>
                  <ul className="navbar-nav flex-column w-100 justify-content-center">
                    <li className="nav-item">
                      <Link to="/" className="nav-link active"> </Link>
                    </li>

                    <li className="nav-item d-flex">

                      <Link to="exhibitionform" className="nav-link "><i className="fa-solid fa-chevron-right me-2"></i>Exhibition</Link>
                    </li>

                    <li className="nav-item d-flex">
                      <Link to="conferenceform" className="nav-link"><i className="fa-solid fa-chevron-right me-2"></i>Conference</Link>
                    </li>

                    <li className="nav-item d-flex">
                      <Link to="lobbyform" className="nav-link"><i className="fa-solid fa-chevron-right me-2"></i>Lobby</Link>
                    </li>

                    <li className="nav-item d-flex">
                      <Link to="/" className="nav-link"><i className="fa-solid fa-chevron-right me-2"></i>Home</Link>
                    </li>

                    <li className="nav-item d-flex">
                      <Link to="/" onClick={handleLogout} className="nav-link"><i className="fa-solid fa-arrow-right-from-bracket me-2"></i>Logout</Link>
                    </li>

                    <li className="nav-item d-flex">
                      <Link to="/contactus" className="nav-link"><i className="fa-solid fa-phone me-2"></i>Contact Us</Link>
                    </li>

                  </ul>
                </div>
              </nav>
            </aside>
          </div>
        </div>


        <footer className="page-footer font-small bg-dark position-relative bottom-0">
          <div className="container text-center text-md-left" style={{ height: "60px" }}>
            <div className="footer-copyright text-center py-3 text-light">© 2022 Copyright: eventual.com </div>
          </div>
        </footer>
      </div> : <Login />}

    </>
  )
}

export default AdminControls