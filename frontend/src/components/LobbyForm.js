import React, { useEffect, useState, useContext } from 'react'
import styles from '../css/LobbyForm.module.css'
import lobby_template from '../images/lobby_template.jpg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DisplayContext from '../contexts/DisplayContext';
import Login from './Login';

const LobbyForm = () => {
  const [upload, setUpload] = useState("none");
  const [youtube, setYoutube] = useState("none");
  let isUploaded = false;
  const disp = useContext(DisplayContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let mainlogo = document.getElementById('mainlogo');
    if (mainlogo.value !== "") {
      let formData = new FormData();
      formData.append("_id", "mainlogo");
      formData.append("img", mainlogo.files[0]);
      formData.append("link", "");

      let res = await fetch("http://localhost:5000/api/post/lobby", {
        method: "POST",
        body: formData
      }
      )
      const json = await res.json()
      console.log(json)
      isUploaded = true;
    }

    for (let i = 1; i < 9; i++) {
      let x = document.getElementById(`sp${i}img`);

      if (x.value !== "") {
        let formData = new FormData();
        formData.append("_id", `sp${i}`)
        formData.append("img", x.files[0])
        formData.append("link", document.getElementById(`sp${i}link`).value);

        let res = await fetch("http://localhost:5000/api/post/lobby", {
          method: "POST",
          body: formData
        }
        )
        const json = await res.json()
        console.log(json)
        isUploaded = true;
      }
    }

    let video = document.getElementById("mainvideo")
    if (video.value !== "" && upload === "block") {
      let formData = new FormData();
      formData.append("_id", "mainvideo");
      formData.append("video", video.files[0]);
      formData.append("ytlink", "");

      let res = await fetch("http://localhost:5000/api/post/lobbyextra", {
        method: "POST",
        body: formData
      }
      )
      let json = await res.json();
      console.log(json);
      isUploaded = true;
    }

    let yt = document.getElementById("mainytvideo");
    if (yt.value.length > 11 && youtube === "block") {
      let val = yt.value.trim().slice(-11);
      let res = await fetch("http://localhost:5000/api/post/lobbyextra", {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ _id: "mainvideo", ytlink: val })
      }
      )
      let json = await res.json();
      console.log(json);
      isUploaded = true;
    }
    if (isUploaded) {
      toast.success("Uploaded successfully", {
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
    return false;
  }
  useEffect(() => {
    document.querySelector('body').style.overflowY = 'auto';
  }, [])

  return (
    <>
      {disp.display.isLoggedIn === 'true' ? <div className={styles.body}>
      <ToastContainer theme='colored' />
      <div className="container">
        <div className={`${styles.myRow} row mb-5 mt-5 pt-3`}>
          <h1 className={styles.h1}>Even-Tual Event Platform</h1>
          <p className={styles.p}>This is form to update following information in lobby</p>
          <h3 className={styles.h3}>Lobby</h3>
          <div className="col-xl-7">
            <img src={lobby_template} className={styles.image} alt="lobby" />
          </div>
          <div className="col-xl-5">

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-1">
                <label htmlFor="sp1img" className="form-label"><b>Sponsor 1</b></label>
                <input className="form-control" type="file" filename="img" accept="image/*" id="sp1img" />
              </div>

              <div className="mb-1">
                <label htmlFor="sp1link" className="form-label">Link for Sponsor</label>
                <input className="form-control" type="link" id="sp1link" placeholder="https://www.example.in" />
              </div>
              <div className="mb-1">
                <label htmlFor="sp2img" className="form-label mt-3"><b>Sponsor 2</b></label>
                <input className="form-control" type="file" filename="img" accept="image/*" id="sp2img" />
              </div>
              <div className="mb-1">
                <label htmlFor="sp2link" className="form-label">Link for Sponsor</label>
                <input className="form-control" type="link" id="sp2link" placeholder="https://www.example.in" />
              </div>
              <div className="mb-1">
                <label htmlFor="sp3img" className="form-label mt-3"><b>Sponsor 3</b></label>
                <input className="form-control" type="file" filename="img" accept="image/*" id="sp3img" />
              </div>
              <div className="mb-1">
                <label htmlFor="sp3link" className="form-label">Link for Sponsor</label>
                <input className="form-control" type="link" id="sp3link" placeholder="https://www.example.in" />
              </div>
              <div className="mb-1">
                <label htmlFor="sp4img" className="form-label mt-3"><b>Sponsor 4</b></label>
                <input className="form-control" type="file" filename="img" accept="image/*" id="sp4img" />
              </div>
              <div className="mb-1">
                <label htmlFor="sp4link" className="form-label">Link for Sponsor</label>
                <input className="form-control" type="link" id="sp4link" placeholder="https://www.example.in" />
              </div>
              <div className="mb-1">
                <label htmlFor="sp5img" className="form-label mt-3"><b>Sponsor 5</b></label>
                <input className="form-control" type="file" filename="img" accept="image/*" id="sp5img" />
              </div>
              <div className="mb-1">
                <label htmlFor="sp5link" className="form-label">Link for Sponsor</label>
                <input className="form-control" type="link" id="sp5link" placeholder="https://www.example.in" />
              </div>
              <div className="mb-1">
                <label htmlFor="sp6img" className="form-label mt-3"><b>Sponsor 6</b></label>
                <input className="form-control" type="file" filename="img" accept="image/*" id="sp6img" />
              </div>
              <div className="mb-1">
                <label htmlFor="sp6link" className="form-label">Link for Sponsor</label>
                <input className="form-control" type="link" id="sp6link" placeholder="https://www.example.in" />
              </div>
              <div className="mb-1">
                <label htmlFor="sp7img" className="form-label mt-3"><b>Sponsor 7</b></label>
                <input className="form-control" type="file" filename="img" accept="image/*" id="sp7img" />
              </div>
              <div className="mb-1">
                <label htmlFor="sp7link" className="form-label">Link for Sponsor</label>
                <input className="form-control" type="link" id="sp7link" placeholder="https://www.example.in" />
              </div>
              <div className="mb-1">
                <label htmlFor="sp8img" className="form-label mt-3"><b>Sponsor 8</b></label>
                <input className="form-control" type="file" filename="img" accept="image/*" id="sp8img" />
              </div>
              <div className="mb-1">
                <label htmlFor="sp8link" className="form-label">Link for Sponsor</label>
                <input className="form-control" type="link" id="sp8link" placeholder="https://www.example.in" />
              </div>

              <div className="mb-1">
                <label htmlFor="mainlogo" className="form-label mt-3">Main logo</label>
                <input className="form-control" type="file" filename="img" accept="image/*" id="mainlogo" />
              </div>
              <div className="mb-1 mt-3"> Upload Lobby video via:-
                <div className="form-check pt-2">
                  <input className="form-check-input" type="radio" onChange={
                    (e) => {
                      if (e.target.value === "on") {
                        setUpload("block");
                        setYoutube("none")
                      }
                    }
                  } name="uploadbtn" id="uploadbtn" />
                  <label className="form-check-label" htmlFor="uploadbtn">
                    File upload
                  </label>
                  <div>
                    {/* <label htmlFor="mainvideo" className="form-label"></label> */}
                    <input className="form-control mt-1" type="file" accept="Video/*" id="mainvideo" style={{ display: upload }} />
                  </div>
                </div>

                <div className="form-check pt-1">
                  <input className="form-check-input" type="radio" onChange={
                    (e) => {
                      if (e.target.value === "on") {
                        setYoutube("block")
                        setUpload("none");
                      }
                    }
                  } name="uploadbtn" id="ytlinkbtn" />
                  <label className="form-check-label" htmlFor="ytlinkbtn">
                    YouTube link
                  </label>
                  <div>
                    {/* <label htmlFor="mainytvideo" className="form-label" style={{ color: "darkgreen" }}></label> */}
                    <input className="form-control mt-1" type="link" id="mainytvideo" placeholder="https://youtu.be/VIDEO_ID" style={{ display: youtube }} />
                  </div>
                </div>
              </div>
              <br />
              <br />
              <button type="submit" className={`${styles.btn1} mb-3`}>Update Changes</button>
            </form>
          </div>
        </div>
      </div>
    </div> : <Login />}
    </>
  )
}

export default LobbyForm