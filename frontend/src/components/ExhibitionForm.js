import React, { useEffect, useState, useContext } from 'react'
import styles from '../css/ExhibitionForm.module.css';
import exhibition_template from '../images/exhibition_lobby_template.jpg';
import product_gallery1_template from '../images/product_gallery1_template.jpg';
import product_gallery2_template from '../images/product_gallery2_template.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DisplayContext from '../contexts/DisplayContext';
import Login from './Login';

const ExhibitionForm = () => {
  const disp = useContext(DisplayContext);
  let isUploaded = false;
  const [upload, setUpload] = useState({
    1: "none",
    2: "none",
    3: "none",
    4: "none",
    5: "none",
    6: "none",
    7: "none",
    8: "none"
  })
  const [youtube, setYoutube] = useState({
    1: "none",
    2: "none",
    3: "none",
    4: "none",
    5: "none",
    6: "none",
    7: "none",
    8: "none",
  })
  const handleSubmit = async (e) => {
    e.preventDefault();

    let orgimg = document.getElementById('orgimg');
    if (orgimg.value !== "") {
      let formData = new FormData();
      formData.append("_id", "orgimg");
      formData.append("poster", orgimg.files[0]);
      formData.append("ytlink", "");
      formData.append("ourteamlink", "");

      let res = await fetch("http://localhost:5000/api/post/exhibition", {
        method: "POST",
        body: formData
      }
      )
      const json = await res.json()
      console.log(json)
      isUploaded = true;
    }

    for (let i = 1; i < 9; i++) {
      let x = document.getElementById(`proj${i}poster`);

      if (x.value !== "") {
        let yt = document.getElementById(`proj${i}yt`).value;
        let video = document.getElementById(`proj${i}video`);
        let formData = new FormData();
        formData.append("_id", `proj${i}`)
        formData.append("poster", x.files[0])
        if (yt.length > 11) {
          formData.append("ytlink", yt.trim().slice(-11));
        }
        else if (video.value !== "") {
          formData.append("video", video.files[0]);
        }
        formData.append("ourteamlink", document.getElementById(`proj${i}teamlink`).value);

        let res = await fetch("http://localhost:5000/api/post/exhibition", {
          method: "POST",
          body: formData
        }
        )
        const json = await res.json()
        console.log(json)
        isUploaded = true;
      }
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
    return false
  }
  useEffect(() => {
    document.querySelector('body').style.overflowY = 'auto';
  }, [])

  return (
    <>
      {disp.display.isLoggedIn === 'true' ? <div className={styles.body}>
        <ToastContainer theme='colored' />
        <div className="container">
          <div className={`${styles.myRow} row mt-5 mb-5 pt-3`}>
            <h1 className={styles.h1}>Even-Tual Event Platform</h1>
            <p className={styles.p}>This is form to update following information in Exhibition Hall & Product Gallery</p>
            <h3 className={styles.h3}>Exhibition Hall & Product Gallery</h3>
            <div className="col-xl-7">
              <h2 className={styles.h2}>Exhibition Hall</h2>
              <img src={exhibition_template} className={styles.image} alt="lobby" />
              <h2 className={styles.h2}>Exhibition Platform For Project Numbers 1, 3, 5 and 7</h2>
              <img src={product_gallery1_template} className={styles.image} alt="lobby" />
              <h2 className={styles.h2}>Exhibition Platform For Project Numbers 2, 4, 6 and 8</h2>
              <img src={product_gallery2_template} className={styles.image} alt="lobby" />
            </div>


            <div className="col-xl-5">

              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <br />
                <div className="mb-3">
                  <label htmlFor="orgimg" className="form-label">Organization Logo Image</label>
                  <input className="form-control" filename="poster" type="file" id="orgimg" />
                </div>

                <br />

                <h4 className={styles.h4}>Project 1</h4>
                <div className="mb-1">
                  <label htmlFor="proj1poster" className="form-label">Poster</label>
                  <input className="form-control" filename="poster" type="file" accept="image/*" id="proj1poster" />
                </div>
                <div className="mb-1 mt-3"> Upload Project video via:-
                  <div className="form-check pt-2">
                    <input className="form-check-input" type="radio" onChange={
                      (e) => {
                        if (e.target.value === "on") {
                          setUpload(currValue => ({
                            ...currValue, 1: "block"
                          }));
                          setYoutube(currValue => ({
                            ...currValue, 1: "none"
                          }))
                        }
                      }
                    } name="uploadbtn1" id="uploadbtn1" />
                    <label className="form-check-label" htmlFor="uploadbtn1">
                      File upload
                    </label>
                    <div>
                      {/* <label htmlFor="mainvideo" className="form-label"></label> */}
                      <input className="form-control mt-1" type="file" accept="Video/*" id="proj1video" style={{ display: upload["1"] }} />
                    </div>
                  </div>

                  <div className="form-check pt-1">
                    <input className="form-check-input" type="radio" onChange={
                      (e) => {
                        if (e.target.value === "on") {
                          setYoutube(currValue => ({
                            ...currValue, 1: "block"
                          }))
                          setUpload(currValue => ({
                            ...currValue, 1: "none"
                          }));
                        }
                      }
                    } name="uploadbtn1" id="ytlinkbtn1" />
                    <label className="form-check-label" htmlFor="ytlinkbtn1">
                      YouTube link
                    </label>
                    <div>
                      {/* <label htmlFor="mainytvideo" className="form-label" style={{ color: "darkgreen" }}></label> */}
                      <input className="form-control mt-1" type="link" id="proj1yt" placeholder="https://youtu.be/VIDEO_ID" style={{ display: youtube["1"] }} />
                    </div>
                  </div>
                </div>
                <div className="mb-1 mt-3">
                  <label htmlFor="proj1teamlink" className="form-label">Meet Our Team Link</label>
                  <input className="form-control" type="link" id="proj1teamlink" />
                </div>

                <br />

                <h4 className={styles.h4}>Project 2</h4>
                <div className="mb-1">
                  <label htmlFor="proj2poster" className="form-label">Poster</label>
                  <input className="form-control" filename="poster" type="file" accept="image/*" id="proj2poster" />
                </div>
                <div className="mb-1 mt-3"> Upload Project video via:-
                  <div className="form-check pt-2">
                    <input className="form-check-input" type="radio" onChange={
                      (e) => {
                        if (e.target.value === "on") {
                          setUpload(currValue => ({
                            ...currValue, 2: "block"
                          }));
                          setYoutube(currValue => ({
                            ...currValue, 2: "none"
                          }))
                        }
                      }
                    } name="uploadbtn2" id="uploadbtn2" />
                    <label className="form-check-label" htmlFor="uploadbtn2">
                      File upload
                    </label>
                    <div>
                      {/* <label htmlFor="mainvideo" className="form-label"></label> */}
                      <input className="form-control mt-1" type="file" accept="Video/*" id="proj2video" style={{ display: upload["2"] }} />
                    </div>
                  </div>

                  <div className="form-check pt-1">
                    <input className="form-check-input" type="radio" onChange={
                      (e) => {
                        if (e.target.value === "on") {
                          setYoutube(currValue => ({
                            ...currValue, 2: "block"
                          }))
                          setUpload(currValue => ({
                            ...currValue, 2: "none"
                          }));
                        }
                      }
                    } name="uploadbtn2" id="ytlinkbtn2" />
                    <label className="form-check-label" htmlFor="ytlinkbtn2">
                      YouTube link
                    </label>
                    <div>
                      {/* <label htmlFor="mainytvideo" className="form-label" style={{ color: "darkgreen" }}></label> */}
                      <input className="form-control mt-1" type="link" id="proj2yt" placeholder="https://youtu.be/VIDEO_ID" style={{ display: youtube["2"] }} />
                    </div>
                  </div>
                </div>
                <div className="mb-1 mt-3">
                  <label htmlFor="proj2teamlink" className="form-label">Meet Our Team Link</label>
                  <input className="form-control" type="link" id="proj2teamlink" />
                </div>

                <br />

                <h4 className={styles.h4}>Project 3</h4>
                <div className="mb-1">
                  <label htmlFor="proj3poster" className="form-label">Poster</label>
                  <input className="form-control" filename="poster" type="file" accept="image/*" id="proj3poster" />
                </div>
                <div className="mb-1 mt-3"> Upload Project video via:-
                  <div className="form-check pt-2">
                    <input className="form-check-input" type="radio" onChange={
                      (e) => {
                        if (e.target.value === "on") {
                          setUpload(currValue => ({
                            ...currValue, 3: "block"
                          }));
                          setYoutube(currValue => ({
                            ...currValue, 3: "none"
                          }))
                        }
                      }
                    } name="uploadbtn3" id="uploadbtn3" />
                    <label className="form-check-label" htmlFor="uploadbtn3">
                      File upload
                    </label>
                    <div>
                      {/* <label htmlFor="mainvideo" className="form-label"></label> */}
                      <input className="form-control mt-1" type="file" accept="Video/*" id="proj3video" style={{ display: upload["3"] }} />
                    </div>
                  </div>

                  <div className="form-check pt-1">
                    <input className="form-check-input" type="radio" onChange={
                      (e) => {
                        if (e.target.value === "on") {
                          setYoutube(currValue => ({
                            ...currValue, 3: "block"
                          }))
                          setUpload(currValue => ({
                            ...currValue, 3: "none"
                          }));
                        }
                      }
                    } name="uploadbtn3" id="ytlinkbtn3" />
                    <label className="form-check-label" htmlFor="ytlinkbtn3">
                      YouTube link
                    </label>
                    <div>
                      {/* <label htmlFor="mainytvideo" className="form-label" style={{ color: "darkgreen" }}></label> */}
                      <input className="form-control mt-1" type="link" id="proj3yt" placeholder="https://youtu.be/VIDEO_ID" style={{ display: youtube["3"] }} />
                    </div>
                  </div>
                </div>
                <div className="mb-1 mt-3">
                  <label htmlFor="proj3teamlink" className="form-label">Meet Our Team Link</label>
                  <input className="form-control" type="link" id="proj3teamlink" />
                </div>

                <br />

                <h4 className={styles.h4}>Project 4</h4>
                <div className="mb-1">
                  <label htmlFor="proj4poster" className="form-label">Poster</label>
                  <input className="form-control" filename="poster" type="file" accept="image/*" id="proj4poster" />
                </div>
                <div className="mb-1 mt-3"> Upload Project video via:-
                  <div className="form-check pt-2">
                    <input className="form-check-input" type="radio" onChange={
                      (e) => {
                        if (e.target.value === "on") {
                          setUpload(currValue => ({
                            ...currValue, 4: "block"
                          }));
                          setYoutube(currValue => ({
                            ...currValue, 4: "none"
                          }))
                        }
                      }
                    } name="uploadbtn4" id="uploadbtn4" />
                    <label className="form-check-label" htmlFor="uploadbtn4">
                      File upload
                    </label>
                    <div>
                      {/* <label htmlFor="mainvideo" className="form-label"></label> */}
                      <input className="form-control mt-1" type="file" accept="Video/*" id="proj4video" style={{ display: upload["4"] }} />
                    </div>
                  </div>

                  <div className="form-check pt-1">
                    <input className="form-check-input" type="radio" onChange={
                      (e) => {
                        if (e.target.value === "on") {
                          setYoutube(currValue => ({
                            ...currValue, 4: "block"
                          }))
                          setUpload(currValue => ({
                            ...currValue, 4: "none"
                          }));
                        }
                      }
                    } name="uploadbtn4" id="ytlinkbtn4" />
                    <label className="form-check-label" htmlFor="ytlinkbtn4">
                      YouTube link
                    </label>
                    <div>
                      {/* <label htmlFor="mainytvideo" className="form-label" style={{ color: "darkgreen" }}></label> */}
                      <input className="form-control mt-1" type="link" id="proj4yt" placeholder="https://youtu.be/VIDEO_ID" style={{ display: youtube["4"] }} />
                    </div>
                  </div>
                </div>
                <div className="mb-1 mt-3">
                  <label htmlFor="proj4teamlink" className="form-label">Meet Our Team Link</label>
                  <input className="form-control" type="link" id="proj4teamlink" />
                </div>

                <br />

                <h4 className={styles.h4}>Project 5</h4>
                <div className="mb-1">
                  <label htmlFor="proj5poster" className="form-label">Poster</label>
                  <input className="form-control" filename="poster" type="file" accept="image/*" id="proj5poster" />
                </div>
                <div className="mb-1 mt-3"> Upload Project video via:-
                  <div className="form-check pt-2">
                    <input className="form-check-input" type="radio" onChange={
                      (e) => {
                        if (e.target.value === "on") {
                          setUpload(currValue => ({
                            ...currValue, 5: "block"
                          }));
                          setYoutube(currValue => ({
                            ...currValue, 5: "none"
                          }))
                        }
                      }
                    } name="uploadbtn5" id="uploadbtn5" />
                    <label className="form-check-label" htmlFor="uploadbtn5">
                      File upload
                    </label>
                    <div>
                      {/* <label htmlFor="mainvideo" className="form-label"></label> */}
                      <input className="form-control mt-1" type="file" accept="Video/*" id="proj5video" style={{ display: upload["5"] }} />
                    </div>
                  </div>

                  <div className="form-check pt-1">
                    <input className="form-check-input" type="radio" onChange={
                      (e) => {
                        if (e.target.value === "on") {
                          setYoutube(currValue => ({
                            ...currValue, 5: "block"
                          }))
                          setUpload(currValue => ({
                            ...currValue, 5: "none"
                          }));
                        }
                      }
                    } name="uploadbtn5" id="ytlinkbtn5" />
                    <label className="form-check-label" htmlFor="ytlinkbtn5">
                      YouTube link
                    </label>
                    <div>
                      {/* <label htmlFor="mainytvideo" className="form-label" style={{ color: "darkgreen" }}></label> */}
                      <input className="form-control mt-1" type="link" id="proj5yt" placeholder="https://youtu.be/VIDEO_ID" style={{ display: youtube["5"] }} />
                    </div>
                  </div>
                </div>
                <div className="mb-1 mt-3">
                  <label htmlFor="proj5teamlink" className="form-label">Meet Our Team Link</label>
                  <input className="form-control" type="link" id="proj5teamlink" />
                </div>

                <br />

                <h4 className={styles.h4}>Project 6</h4>
                <div className="mb-1">
                  <label htmlFor="proj6poster" className="form-label">Poster</label>
                  <input className="form-control" filename="poster" type="file" accept="image/*" id="proj6poster" />
                </div>
                <div className="mb-1 mt-3"> Upload Project video via:-
                  <div className="form-check pt-2">
                    <input className="form-check-input" type="radio" onChange={
                      (e) => {
                        if (e.target.value === "on") {
                          setUpload(currValue => ({
                            ...currValue, 6: "block"
                          }));
                          setYoutube(currValue => ({
                            ...currValue, 6: "none"
                          }))
                        }
                      }
                    } name="uploadbtn6" id="uploadbtn6" />
                    <label className="form-check-label" htmlFor="uploadbtn6">
                      File upload
                    </label>
                    <div>
                      {/* <label htmlFor="mainvideo" className="form-label"></label> */}
                      <input className="form-control mt-1" type="file" accept="Video/*" id="proj6video" style={{ display: upload["6"] }} />
                    </div>
                  </div>

                  <div className="form-check pt-1">
                    <input className="form-check-input" type="radio" onChange={
                      (e) => {
                        if (e.target.value === "on") {
                          setYoutube(currValue => ({
                            ...currValue, 6: "block"
                          }))
                          setUpload(currValue => ({
                            ...currValue, 6: "none"
                          }));
                        }
                      }
                    } name="uploadbtn6" id="ytlinkbtn6" />
                    <label className="form-check-label" htmlFor="ytlinkbtn6">
                      YouTube link
                    </label>
                    <div>
                      {/* <label htmlFor="mainytvideo" className="form-label" style={{ color: "darkgreen" }}></label> */}
                      <input className="form-control mt-1" type="link" id="proj6yt" placeholder="https://youtu.be/VIDEO_ID" style={{ display: youtube["6"] }} />
                    </div>
                  </div>
                </div>
                <div className="mb-1 mt-3">
                  <label htmlFor="proj6teamlink" className="form-label">Meet Our Team Link</label>
                  <input className="form-control" type="link" id="proj6teamlink" />
                </div>

                <br />

                <h4 className={styles.h4}>Project 7</h4>
                <div className="mb-1">
                  <label htmlFor="proj7poster" className="form-label">Poster</label>
                  <input className="form-control" filename="poster" type="file" accept="image/*" id="proj7poster" />
                </div>
                <div className="mb-1 mt-3"> Upload Project video via:-
                  <div className="form-check pt-2">
                    <input className="form-check-input" type="radio" onChange={
                      (e) => {
                        if (e.target.value === "on") {
                          setUpload(currValue => ({
                            ...currValue, 7: "block"
                          }));
                          setYoutube(currValue => ({
                            ...currValue, 7: "none"
                          }))
                        }
                      }
                    } name="uploadbtn7" id="uploadbtn7" />
                    <label className="form-check-label" htmlFor="uploadbtn7">
                      File upload
                    </label>
                    <div>
                      {/* <label htmlFor="mainvideo" className="form-label"></label> */}
                      <input className="form-control mt-1" type="file" accept="Video/*" id="proj7video" style={{ display: upload["7"] }} />
                    </div>
                  </div>

                  <div className="form-check pt-1">
                    <input className="form-check-input" type="radio" onChange={
                      (e) => {
                        if (e.target.value === "on") {
                          setYoutube(currValue => ({
                            ...currValue, 7: "block"
                          }))
                          setUpload(currValue => ({
                            ...currValue, 7: "none"
                          }));
                        }
                      }
                    } name="uploadbtn7" id="ytlinkbtn7" />
                    <label className="form-check-label" htmlFor="ytlinkbtn7">
                      YouTube link
                    </label>
                    <div>
                      {/* <label htmlFor="mainytvideo" className="form-label" style={{ color: "darkgreen" }}></label> */}
                      <input className="form-control mt-1" type="link" id="proj7yt" placeholder="https://youtu.be/VIDEO_ID" style={{ display: youtube["7"] }} />
                    </div>
                  </div>
                </div>
                <div className="mb-1 mt-3">
                  <label htmlFor="proj7teamlink" className="form-label">Meet Our Team Link</label>
                  <input className="form-control" type="link" id="proj7teamlink" />
                </div>

                <br />

                <h4 className={styles.h4}>Project 8</h4>
                <div className="mb-1">
                  <label htmlFor="proj8poster" className="form-label">Poster</label>
                  <input className="form-control" filename="poster" type="file" accept="image/*" id="proj8poster" />
                </div>
                <div className="mb-1 mt-3"> Upload Project video via:-
                  <div className="form-check pt-2">
                    <input className="form-check-input" type="radio" onChange={
                      (e) => {
                        if (e.target.value === "on") {
                          setUpload(currValue => ({
                            ...currValue, 8: "block"
                          }));
                          setYoutube(currValue => ({
                            ...currValue, 8: "none"
                          }))
                        }
                      }
                    } name="uploadbtn8" id="uploadbtn8" />
                    <label className="form-check-label" htmlFor="uploadbtn8">
                      File upload
                    </label>
                    <div>
                      {/* <label htmlFor="mainvideo" className="form-label"></label> */}
                      <input className="form-control mt-1" type="file" accept="Video/*" id="proj8video" style={{ display: upload["8"] }} />
                    </div>
                  </div>

                  <div className="form-check pt-1">
                    <input className="form-check-input" type="radio" onChange={
                      (e) => {
                        if (e.target.value === "on") {
                          setYoutube(currValue => ({
                            ...currValue, 8: "block"
                          }))
                          setUpload(currValue => ({
                            ...currValue, 8: "none"
                          }));
                        }
                      }
                    } name="uploadbtn8" id="ytlinkbtn8" />
                    <label className="form-check-label" htmlFor="ytlinkbtn8">
                      YouTube link
                    </label>
                    <div>
                      {/* <label htmlFor="mainytvideo" className="form-label" style={{ color: "darkgreen" }}></label> */}
                      <input className="form-control mt-1" type="link" id="proj8yt" placeholder="https://youtu.be/VIDEO_ID" style={{ display: youtube["8"] }} />
                    </div>
                  </div>
                </div>
                <div className="mb-1 mt-3">
                  <label htmlFor="proj8teamlink" className="form-label">Meet Our Team Link</label>
                  <input className="form-control" type="link" id="proj8teamlink" />
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

export default ExhibitionForm