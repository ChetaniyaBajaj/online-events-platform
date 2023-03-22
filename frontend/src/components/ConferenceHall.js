import React, { useState, useEffect } from 'react'
import conf_lobby from '../images/conf_lobby.jpg'
// import amazon from '../images/sponsor.png'
import styles from '../css/ConferenceHall.module.css'
import { Link } from 'react-router-dom'

const ConferenceHall = () => {
  const [res, setRes] = useState(null);
  const fetchData = async () => {
    let response = await fetch('http://localhost:5000/api/get/conference')
    let json = await response.json();
    // console.log(json);
    setRes(json);
  }

  useEffect(() => {
    fetchData();
    // console.log("fetching...")
  }, [])

  return (
    <div className={styles.exbContainer}>
      {res && res.arr[0] && <div className={styles.departmentBox} id={styles["logo-1"]}>
        <img src={`/uploads/${res.arr[0].img}`} alt="Department Poster" title='Organization Logo' />
      </div>}
      {res && res.arr[0] && <div className={styles.departmentBox} id={styles["logo-2"]}>
        <img src={`/uploads/${res.arr[0].img}`} alt="Department Poster" title='Organization Logo' />
      </div>}

      <Link to="room1" >
        <div className={styles.departmentBox} id={styles["room-1"]}>
          {/* <a href="/"></a> */}
        </div>
      </Link>

      <Link to="room2">
        <div className={styles.departmentBox} id={styles["room-2"]}>
          {/* <a href="/"></a> */}
        </div>
      </Link>

      {res && res.arr[1] && <div className={styles.departmentBox} id={styles["d-box-1"]}>
        {res.arr[1].link.length > 0 ?
          <a href={res.arr[1].link} target="_blank" rel="noreferrer"><img src={`/uploads/${res.arr[1].img}`} alt="Department Poster" title='Department Poster 1' /> </a> :
          <img src={`/uploads/${res.arr[1].img}`} alt="Department Poster" title='Department Poster 1' />}
      </div>}

      {res && res.arr[2] && <div className={styles.departmentBox} id={styles["d-box-2"]}>
        {res.arr[2].link.length > 0 ?
          <a href={res.arr[2].link} target="_blank" rel="noreferrer"><img src={`/uploads/${res.arr[2].img}`} alt="Department Poster" title='Department Poster 2' /> </a> :
          <img src={`/uploads/${res.arr[2].img}`} alt="Department Poster" title='Department Poster 2' />}
      </div>}

      {res && res.arr[3] && <div className={styles.departmentBox} id={styles["d-box-3"]}>
        {res.arr[3].link.length > 0 ?
          <a href={res.arr[3].link} target="_blank" rel="noreferrer"><img src={`/uploads/${res.arr[3].img}`} alt="Department Poster" title='Department Poster 3' /> </a> :
          <img src={`/uploads/${res.arr[3].img}`} alt="Department Poster" title='Department Poster 3' />}
      </div>}

      {res && res.arr[4] && <div className={styles.departmentBox} id={styles["d-box-4"]}>
        {res.arr[4].link.length > 0 ?
          <a href={res.arr[4].link} target="_blank" rel="noreferrer"><img src={`/uploads/${res.arr[4].img}`} alt="Department Poster" title='Department Poster 4' /> </a> :
          <img src={`/uploads/${res.arr[4].img}`} alt="Department Poster" title='Department Poster 4' />}
      </div>}

      {res && res.arr[5] && <div className={styles.departmentBox} id={styles["d-box-5"]}>
        {res.arr[5].link.length > 0 ?
          <a href={res.arr[5].link} target="_blank" rel="noreferrer"><img src={`/uploads/${res.arr[5].img}`} alt="Department Poster" title='Department Poster 5' /> </a> :
          <img src={`/uploads/${res.arr[5].img}`} alt="Department Poster" title='Department Poster 5' />}
      </div>}

      {res && res.arr[6] && <div className={styles.departmentBox} id={styles["d-box-6"]}>
        {res.arr[6].link.length > 0 ?
          <a href={res.arr[6].link} target="_blank" rel="noreferrer"><img src={`/uploads/${res.arr[6].img}`} alt="Department Poster" title='Department Poster 6' /> </a> :
          <img src={`/uploads/${res.arr[6].img}`} alt="Department Poster" title='Department Poster 6' />}
      </div>}

      {res && res.arr[7] && <div className={styles.departmentBox} id={styles["d-box-7"]}>
        {res.arr[7].link.length > 0 ?
          <a href={res.arr[7].link} target="_blank" rel="noreferrer"><img src={`/uploads/${res.arr[7].img}`} alt="Department Poster" title='Department Poster 7' /> </a> :
          <img src={`/uploads/${res.arr[7].img}`} alt="Department Poster" title='Department Poster 7' />}
      </div>}

      {res && res.arr[8] && <div className={styles.departmentBox} id={styles["d-box-8"]}>
        {res.arr[8].link.length > 0 ?
          <a href={res.arr[8].link} target="_blank" rel="noreferrer"><img src={`/uploads/${res.arr[8].img}`} alt="Department Poster" title='Department Poster 8' /> </a> :
          <img src={`/uploads/${res.arr[8].img}`} alt="Department Poster" title='Department Poster 8' />}
      </div>}
      <div>
        <img src={conf_lobby} alt="" className={styles.exbLobby} />
      </div>
    </div>
  )
}

export default ConferenceHall
