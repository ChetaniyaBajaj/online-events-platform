import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DisplayContext from '../contexts/DisplayContext';
import ErrorPage from './ErrorPage';
import logo from '../images/logo.png';

const ResetPassword = () => {
  const disp = useContext(DisplayContext);
  const [message, setMessage] = useState("");

  function togglePass() {
    let password = document.getElementById('pass');
    let cpassword = document.getElementById('cpass');
    const fields = [password, cpassword]

    fields.forEach(x => {
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/resetpassword', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        pass: document.getElementById('pass').value,
        cpass: document.getElementById('cpass').value,
      })
    })

    const json = await res.json();
    // console.log(json);
    setMessage(json.message)
    const options = {
      position: "top-center",
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      closeButton: false,
      pauseOnFocusLoss: false
    }
    json.success === true ? toast.success(json.message, options) : toast.warn(json.message, options);
    document.getElementById('pass').value = "";
    document.getElementById('cpass').value = "";
  }

  useEffect(() => {
    document.querySelector('body').style.overflowY = 'auto';
  }, [])

  return (
    <div>
      {console.log(disp.display.loginotp)}
      {disp.display.resetpassword ? <section className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            {message.length > 0 ? <ToastContainer theme='colored' /> : ""}
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">

                      <div className="text-center">
                      <img src={logo} style={{ width: "225px" }} alt="logo" />
                        <h4 className="mt-1 mb-5 pb-1">Even-Tual Event Platform</h4>
                      </div>

                      <form onSubmit={handleSubmit} autoComplete="off">

                        <div className="form-outline text-center mb-4">
                          <p>Reset Password</p>
                        </div>

                        <div className="form-outline mb-4">
                          <input type="password" className="form-control" placeholder="New Password" required name="pass"
                            id="pass" pattern=".{8,12}" title="8 to 12 characters" />
                        </div>

                        <div className="form-outline mb-4">
                          <input type="password" className="form-control" placeholder="Confirm Password" required
                            name="cpass" id="cpass" pattern=".{8,12}" title="8 to 12 characters" />
                        </div>

                        <div className="form-outline text-center mb-5">
                          <input type="checkbox" id='showpassword' onClick={togglePass} />
                          <label htmlFor="showpassword">&nbsp; Show Password</label>
                        </div>

                        <div className="text-center pt-1 mb-4 pb-1">
                          <button className="btn btn-primary btn-block gradient-custom-2 mb-3" type="submit">Reset
                            Password</button>
                        </div>

                        <div className="form-outline text-center mb-4">
                          <Link to="/login"><span>Back to login</span></Link>
                        </div>


                      </form>

                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-black px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">We are more than just a company</h4>
                      <p className="small mb-0">This application enables you to host virtual events, stream YouTube
                        videos, and
                        showcase your projects in a virtual way!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> : <ErrorPage />}
    </div>
  )
}

export default ResetPassword