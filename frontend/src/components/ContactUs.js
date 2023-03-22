import React, { useEffect } from 'react'
import styles from '../css/ContactUs.module.css';
import logo from '../images/logo.png';

const ContactUs = () => {
  useEffect(() => {
    document.querySelector('body').style.overflowY = 'auto';
  }, [])

  return (
    <>
      <section className="gradient-form" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">

                      <div className="text-center">
                        <img src={logo} style={{ width: "225px" }} alt="logo" />
                        <h4 className="mt-1 mb-5 pb-1">Contact Us</h4>
                      </div>

                      <form>
                        <div className="text-center mb-2">
                          <h6 className="mb-4">Our Team Will Connect You Soon</h6>
                        </div>


                        <div className="form-outline mb-4">
                          <input type="email" id="email" className="form-control"
                            placeholder="Email address" />

                        </div>

                        <div className="form-outline mb-4">
                          <input type="text" id="phone" className="form-control" placeholder="Phone number" />
                        </div>

                        <div className="form-outline mb-4">
                          <textarea className="form-control" id="message" rows="4" placeholder="Message"></textarea>
                        </div>

                        <div className="text-center pt-1 mb-5 pb-1">
                          <button className="btn btn-dark btn-block mb-3" type="button">Submit</button>
                        </div>

                      </form>

                    </div>
                  </div>
                  <div className={`col-lg-6 d-flex align-items-center ${styles.myGradientCustom2}`}>
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h3>Contact information</h3>
                      <p className="mb-4">We're open for any suggestion or just to have a chat</p>

                      <div className="dbox w-100 d-flex align-items-center">
                        <div className="icon d-flex align-items-center my-3">
                          <span className="fa fa-phone pe-2"></span>
                            <p className='m-0'>Phone: 7498668882</p>
                        </div>
                      </div>
                      <div className="dbox w-100 d-flex align-items-center">
                        <div className="icon d-flex align-items-center justify-content-center">
                          <span className="fa-solid fa-envelope pe-2"></span>
                          <p className='m-0'>Email: eventual274@gmail.com</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default ContactUs