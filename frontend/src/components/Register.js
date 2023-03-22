import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../images/logo.png';

const Register = () => {
  const [message, setMessage] = useState("");

  function togglePass() {
    let password = document.getElementById('password');
    let cpassword = document.getElementById('cpassword');
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
    const res = await fetch('http://localhost:5000/api/register', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        cpassword: document.getElementById('cpassword').value,
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
    document.getElementById('name').value = "";
    document.getElementById('name').focus();
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
    document.getElementById('cpassword').value = "";

  }

  useEffect(() => {
    document.querySelector('body').style.overflowY = 'auto';
  }, [])

  return (
    <div>
      <section className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            {message.length > 0 ? <ToastContainer theme="colored" /> : ""}

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
                          <h5>Register</h5>
                        </div>

                        <div className="form-outline mb-4">
                          <input type="text" className="form-control" placeholder="Your Name" required name="name"
                            id="name" autoFocus />
                        </div>

                        <div className="form-outline mb-4">
                          <input type="email" className="form-control" placeholder="Email" required name="email"
                            id="email" />
                        </div>

                        <div className="form-outline mb-4">
                          <input type="password" autoComplete="off" placeholder="Password" className="form-control"
                            required name="password" id="password" pattern=".{8,12}"
                            title="8 to 12 characters" />
                        </div>

                        <div className="form-outline mb-4">
                          <input type="password" className="form-control" placeholder="Confirm Password" required
                            name="cpassword" id="cpassword" pattern=".{8,12}" title="8 to 12 characters" />
                        </div>

                        <div className="text-center form-outline mb-4">
                          <input type="checkbox" id='showpassword' onClick={togglePass} />
                          <label htmlFor="showpassword">&nbsp; Show Password</label>
                        </div>

                        <div className="text-center pt-1 mt-3 mb-2 pb-1">
                          <button className="btn btn-primary btn-block gradient-custom-2 mb-3" type='submit'>Register</button>
                        </div>

                        <div className="text-center pt-1 mb-1 pb-1">
                          <Link className="text-muted" to="/login">Already Registered</Link>
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
      </section>

    </div>
  )
}

export default Register