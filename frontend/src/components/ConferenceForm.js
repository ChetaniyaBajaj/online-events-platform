import React, { useEffect, useContext } from 'react'
import styles from '../css/ConferenceForm.module.css';
import conference from '../images/conference_hall_template.jpg';
import conf_room2 from '../images/conf_room2.jpg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DisplayContext from '../contexts/DisplayContext';
import Login from './Login';

const ConferenceForm = () => {
  const disp = useContext(DisplayContext);
  let isUploaded = false;
  const handleSubmit = async (e) => {
    e.preventDefault();

    let orgimg = document.getElementById('orgimg');
    if (orgimg.value !== "") {
      let formData = new FormData();
      formData.append("_id", "orgimg");
      formData.append("img", orgimg.files[0]);
      formData.append("link", "");

      let res = await fetch("http://localhost:5000/api/post/conference", {
        method: "POST",
        body: formData
      }
      )
      const json = await res.json()
      console.log(json)
      isUploaded = true;
    }

    for (let i = 1; i < 9; i++) {
      let x = document.getElementById(`poster${i}img`);

      if (x.value !== "") {
        let formData = new FormData();
        formData.append("_id", `poster${i}`)
        formData.append("img", x.files[0])
        formData.append("link", document.getElementById(`poster${i}link`).value);

        let res = await fetch("http://localhost:5000/api/post/conference", {
          method: "POST",
          body: formData
        }
        )
        let json = await res.json()
        console.log(json)
        isUploaded = true;
      }
    }

    for (let i = 1; i < 3; i++) {
      let x = document.getElementById(`room${i}zoomlink`)
      if (x.value.length > 0) {
        let res2 = await fetch("http://localhost:5000/api/post/conferencemeets", {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            _id: `room${i}`,
            link: x.value,
            password: document.getElementById(`room${i}zoompwd`).value
          })
        })
        let json2 = await res2.json();
        console.log(json2)
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
        <p className={styles.p}>This is form to update following information in Conference Hall</p>
        <h3 className={styles.h3}>Conference Hall</h3>
        <div className="col-xl-7">
          <h2 className={styles.h2}>Conference Hall</h2>
          <img src={conference} className={styles.image} alt="lobby" />
          <h2 className={styles.h2}>Room</h2>
          <img src={conf_room2} className={styles.image} alt="lobby" />
        </div>


        <div className="col-xl-5">

          <form onSubmit={handleSubmit} encType="multipart/form-data">

            <br />

            <div className="mb-3">
              <label htmlFor="orgimg" className="form-label">Organization Logo Image</label>
              <input className="form-control" type="file" accept="image/*" id="orgimg" />
            </div>

            <br />

            <h4 className={styles.h4}>Display 1</h4>
            <div className="mb-1">
              <label htmlFor="poster1link" className="form-label">Link</label>
              <input className="form-control" type="link" id="poster1link" placeholder="https://vesit.ves.ac.in/departments/" />
            </div>
            <div className="mb-1">
              <label htmlFor="poster1img" className="form-label">Poster</label>
              <input className="form-control" type="file" accept="image/*" id="poster1img" />
            </div>

            <br />

            <h4 className={styles.h4}>Display 2</h4>
            <div className="mb-1">
              <label htmlFor="poster2link" className="form-label">Link</label>
              <input className="form-control" type="link" id="poster2link" placeholder="https://vesit.ves.ac.in/departments/" />
            </div>
            <div className="mb-1">
              <label htmlFor="poster2img" className="form-label">Poster</label>
              <input className="form-control" type="file" accept="image/*" id="poster2img" />
            </div>

            <br />

            <h4 className={styles.h4}>Display 3</h4>
            <div className="mb-1">
              <label htmlFor="poster3link" className="form-label">Link</label>
              <input className="form-control" type="link" id="poster3link" placeholder="https://vesit.ves.ac.in/departments/" />
            </div>
            <div className="mb-1">
              <label htmlFor="poster3img" className="form-label">Poster</label>
              <input className="form-control" type="file" accept="image/*" id="poster3img" />
            </div>

            <br />

            <h4 className={styles.h4}>Display 4</h4>
            <div className="mb-1">
              <label htmlFor="poster4link" className="form-label">Link</label>
              <input className="form-control" type="link" id="poster4link" placeholder="https://vesit.ves.ac.in/departments/" />
            </div>
            <div className="mb-1">
              <label htmlFor="poster4img" className="form-label">Poster</label>
              <input className="form-control" type="file" accept="image/*" id="poster4img" />
            </div>

            <br />

            <h4 className={styles.h4}>Display 5</h4>
            <div className="mb-1">
              <label htmlFor="poster5link" className="form-label">Link</label>
              <input className="form-control" type="link" id="poster5link" placeholder="https://vesit.ves.ac.in/departments/" />
            </div>
            <div className="mb-1">
              <label htmlFor="poster5img" className="form-label">Poster</label>
              <input className="form-control" type="file" accept="image/*" id="poster5img" />
            </div>

            <br />

            <h4 className={styles.h4}>Display 6</h4>
            <div className="mb-1">
              <label htmlFor="poster6link" className="form-label">Link</label>
              <input className="form-control" type="link" id="poster6link" placeholder="https://vesit.ves.ac.in/departments/" />
            </div>
            <div className="mb-1">
              <label htmlFor="poster6img" className="form-label">Poster</label>
              <input className="form-control" type="file" accept="image/*" id="poster6img" />
            </div>

            <br />

            <h4 className={styles.h4}>Display 7</h4>
            <div className="mb-1">
              <label htmlFor="poster7link" className="form-label">Link</label>
              <input className="form-control" type="link" id="poster7link" placeholder="https://vesit.ves.ac.in/departments/" />
            </div>
            <div className="mb-1">
              <label htmlFor="poster7img" className="form-label">Poster</label>
              <input className="form-control" type="file" accept="image/*" id="poster7img" />
            </div>

            <br />

            <h4 className={styles.h4}>Display 8</h4>
            <div className="mb-1">
              <label htmlFor="poster8link" className="form-label">Link</label>
              <input className="form-control" type="link" id="poster8link" placeholder="https://vesit.ves.ac.in/departments/" />
            </div>
            <div className="mb-1">
              <label htmlFor="poster8img" className="form-label">Poster</label>
              <input className="form-control" type="file" accept="image/*" id="poster8img" />
            </div>

            <br />

            <h4 className={styles.h4}>Room 1</h4>
            <div className="mb-1">
              <label htmlFor="room1zoomlink" className="form-label">Zoom Meet Link</label>
              <input className="form-control" type="link" id="room1zoomlink" placeholder="https://zoom.us/id" />
            </div>
            <div className="mb-1">
              <label htmlFor="room1zoompwd" className="form-label">Password</label>
              <input className="form-control" type="password" id="room1zoompwd" />
            </div>

            <br />

            <h4 className={styles.h4}>Room 2</h4>
            <div className="mb-1">
              <label htmlFor="room2zoomlink" className="form-label">Zoom Meet Link</label>
              <input className="form-control" type="link" id="room2zoomlink" placeholder="https://zoom.us/ID" />
            </div>
            <div className="mb-1">
              <label htmlFor="room2zoompwd" className="form-label">Password</label>
              <input className="form-control" type="password" id="room2zoompwd" />
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

export default ConferenceForm
