import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DisplayContext from '../contexts/DisplayContext';
import ErrorPage from './ErrorPage';
import logo from '../images/logo.png';

const LoginOTP = () => {
  const disp = useContext(DisplayContext);
  const [message, setMessage] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/otp', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        number: document.getElementById('otp').value
      })
    })

    const json = await res.json();
    console.log(json);
    if (json.redirect) {
      sessionStorage.setItem('isLoggedIn', 'true');
      disp.setDisplay(curr => ({
        ...curr, isLoggedIn: 'true'
      }))
      navigate('/admincontrols');  // show dashboard
    }
    else {
      setMessage(json.message)
      toast.warn(json.message, {
        position: "top-center",
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: false,
        pauseOnFocusLoss: false
      })
    }
    document.getElementById('otp').value = "";
  }

  useEffect(() => {
    document.querySelector('body').style.overflowY = 'auto';
  }, [])

  return (
    <div>
      {disp.display.loginotp ? <section className="h-100 gradient-form" style={{backgroundColor: "#eee"}}>
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
                          <h4 className="mt-1 mb-3 pb-1">Even-Tual Event Platform</h4>
                      </div>

                      <form onSubmit={handleSubmit} autoComplete="off">

                        <div className="form-outline text-center mb-4">
                          <p>Verify<br />Please check your email.</p>
                        </div>

                        <div className="form-outline mb-4">
                          <input type="text" id="otp" className="form-control" placeholder="OTP" autoFocus />
                        </div>

                        <div className="text-center pt-1 mb-3 pb-1">
                          <button className="btn btn-primary btn-block gradient-custom-2 mb-3" type="submit">Verify</button>
                        </div>

                        <div className="form-outline text-center mb-4">
                          <Link className="text-muted" to="/login">Back</Link>
                        </div>

                      </form>

                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-black px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">We are more than just a company</h4>
                      <p className="small mb-0">This application enables you to host virtual events, stream YouTube videos, and
                        showcase your projects in a virtual way!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
 : <ErrorPage />}
    </div>
  )
}

export default LoginOTP