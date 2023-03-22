import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DisplayContext from '../contexts/DisplayContext';
import logo from '../images/logo.png';

const ForgetPassword = () => {
  const disp = useContext(DisplayContext);
  const [message, setMessage] = useState("")
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/forgetpassword', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        femail: document.getElementById('email').value
      })
    })

    const json = await res.json();
    // console.log(json);
    setMessage(json.message)
    toast.success(json.message, {
      position: "top-center",
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      closeButton: false,
      pauseOnFocusLoss: false
    });
  }

  const verifyOTP = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/otpverify', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        number: document.getElementById('otp').value
      })
    })

    const json = await res.json();
    // console.log(json);
    if (json.redirect) {
      disp.setDisplay(curr => ({
        ...curr, "resetpassword": true
      }))
      navigate("/resetpassword")
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
      });
      document.getElementById('otp').value = ""
    }
  }

  useEffect(() => {
    document.querySelector('body').style.overflowY = 'auto';
  }, [])

  return (
    <div>
      <section className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
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
                          <p>Forget Password</p>
                        </div>

                        <div className="form-outline mb-4">
                          <input type="email" id="email" className="form-control" placeholder="Email Address" required name="femail" />
                        </div>

                        <div className="text-center pt-1 mb-3 pb-1">
                          <button className="btn btn-primary btn-block gradient-custom-2 mb-3" type="submit" value="login">Send OTP</button>
                        </div>

                      </form>

                      <form onSubmit={verifyOTP} autoComplete="off">

                        <div className="form-outline mb-4">
                          <input type="text" id="otp" className="form-control" placeholder="OTP" required name="number" />
                        </div>

                        <div className="text-center pt-1 mb-3 pb-1">
                          <button className="btn btn-primary btn-block gradient-custom-2 mb-3" type="submit" value="login">Verify</button>
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
    </div>
  )
}

export default ForgetPassword