import React from 'react'
import lobbybg from '../images/01_textured.jpg'
// import amazon from '../images/sponsor.png'
// import veslogo from '../images/veslogo.png'
import { Link } from 'react-router-dom';
import styles from '../css/Lobby.module.css'
import { useState, useEffect } from 'react';

function Lobby() {
    const [res, setRes] = useState(null);
    const fetchData = async () => {
        let response = await fetch('http://localhost:5000/api/get/lobby')
        let json = await response.json();
        // console.log(json);
        setRes(json);
    }

    useEffect(() => {
        fetchData();
        // console.log("fetching...")
    }, [])

    return (
        <>
            {/* <Link to='admincontrols/exhibitionform'>Exhibition Form </Link>
            <Link to='admincontrols/lobbyform'>Lobby Form </Link>
            <Link to='admincontrols/conferenceform'>Conference Form </Link> */}
            <div className={styles.lobbyContainer}>
                {res && res.arr[0] && <div className={styles.sponsorBox} id={styles["s-box-1"]}>
                    {res.arr[0].link.length > 0 ? <a href={res.arr[0].link} target="_blank" rel="noreferrer"><img src={`/uploads/${res.arr[0].img}`} alt="Sponsor" /></a> : <img src={`/uploads/${res.arr[0].img}`} alt="Sponsor" />}
                </div>}
                {res && res.arr[1] && <div className={styles.sponsorBox} id={styles["s-box-2"]}>
                    {res.arr[1].link.length > 0 ? <a href={res.arr[1].link} target="_blank" rel="noreferrer"><img src={`/uploads/${res.arr[1].img}`} alt="Sponsor" /></a> : <img src={`/uploads/${res.arr[1].img}`} alt="Sponsor" />}
                </div>}
                {res && res.arr[2] && <div className={styles.sponsorBox} id={styles["s-box-3"]}>
                    {res.arr[2].link.length > 0 ? <a href={res.arr[2].link} target="_blank" rel="noreferrer"><img src={`/uploads/${res.arr[2].img}`} alt="Sponsor" /></a> : <img src={`/uploads/${res.arr[2].img}`} alt="Sponsor" />}
                </div>}
                {res && res.arr[3] && <div className={styles.sponsorBox} id={styles["s-box-4"]}>
                    {res.arr[3].link.length > 0 ? <a href={res.arr[3].link} target="_blank" rel="noreferrer"><img src={`/uploads/${res.arr[3].img}`} alt="Sponsor" /></a> : <img src={`/uploads/${res.arr[3].img}`} alt="Sponsor" />}
                </div>}

                {res && res.arr[8] && <div className={`${styles.mainLogo} ${styles.sponsorBox}`}>
                    <img src={`/uploads/${res.arr[8].img}`} alt="Main Logo" title='Main Logo' />
                </div>}

                {res && res.arr[9] && res.arr[9].ytlink !== "" && <iframe className={styles.mainVideo} src={`https://www.youtube.com/embed/${res.arr[9].ytlink}?autoplay=1&mute=1&controls=1&loop=1&showinfo=1`} frameBorder="0" title='Main Lobby Video'></iframe>
                }

                {res && res.arr[9] && res.arr[9].ytlink === "" && <video className={styles.mainVideoUploaded} controls autoPlay muted>
                    <source src={`/uploads/${res.arr[9].filename}`} type="video/mp4" />
                </video>}

                {res && res.arr[4] && <div className={styles.sponsorBox} id={styles["s-box-5"]}>
                    {res.arr[4].link.length > 0 ? <a href={res.arr[4].link} target="_blank" rel="noreferrer"><img src={`/uploads/${res.arr[4].img}`} alt="Sponsor" /></a> : <img src={`/uploads/${res.arr[4].img}`} alt="Sponsor" />}
                </div>}
                {res && res.arr[5] && <div className={styles.sponsorBox} id={styles["s-box-6"]}>
                    {res.arr[5].link.length > 0 ? <a href={res.arr[5].link} target="_blank" rel="noreferrer"><img src={`/uploads/${res.arr[5].img}`} alt="Sponsor" /></a> : <img src={`/uploads/${res.arr[5].img}`} alt="Sponsor" />}
                </div>}
                {res && res.arr[6] && <div className={styles.sponsorBox} id={styles["s-box-7"]}>
                    {res.arr[6].link.length > 0 ? <a href={res.arr[6].link} target="_blank" rel="noreferrer"><img src={`/uploads/${res.arr[6].img}`} alt="Sponsor" /></a> : <img src={`/uploads/${res.arr[6].img}`} alt="Sponsor" />}
                </div>}
                {res && res.arr[7] && <div className={styles.sponsorBox} id={styles["s-box-8"]}>
                    {res.arr[7].link.length > 0 ? <a href={res.arr[7].link} target="_blank" rel="noreferrer"><img src={`/uploads/${res.arr[7].img}`} alt="Sponsor" /></a> : <img src={`/uploads/${res.arr[7].img}`} alt="Sponsor" />}
                </div>}
                <div>
                    <img src={lobbybg} className={styles.lobby} useMap="#lobby-map" alt='Lobby' />
                    <map name="lobby-map">
                        <Link to='exhibition'>
                            <area alt="Exhibition Hall" href='/exhibition' title="Exhibition Hall" coords="1198, 242, 1201, 358, 1116, 362, 1044, 356, 1003, 356, 972, 352, 972, 311, 972, 270, 1021, 264, 1081, 257, 1141, 247" shape="poly" />
                        </Link>
                        <Link to="conference">
                            <area alt="Conference Hall" href='/conference' title="Conference Hall" coords="30, 243, 104, 251, 184, 260, 258, 269, 259, 303, 260, 352, 204, 356, 241, 356, 91, 359, 31, 356, 30, 302" shape="poly" />
                        </Link>
                    </map>
                </div>
            </div>
        </>
    )
}

export default Lobby;
