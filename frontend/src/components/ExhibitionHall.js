import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import styles from '../css/ExhibitionHall.module.css';
import exhibition_lobby from '../images/exhibition_lobby.png';
// import amazon from '../images/sponsor.png';
// import veslogo from '../images/veslogo.png';

const ExhibitionHall = () => {
  const [res, setRes] = useState(null);
  const fetchData = async () => {
    let response = await fetch('http://localhost:5000/api/get/exhibition')
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
      <div className={styles.exbContainer}>
        { res && res.arr[0] && <div className={styles.mainLogo}>
          <img src={`/uploads/${res.arr[0].poster}`} alt="Organization Logo" />
        </div>}

        { res && res.arr[5] && <Link to='product5'>
          <div className={styles.outerProdBox} id={styles['opb-5']}>
            <div className={styles.prodBox}>
              <img src={`/uploads/${res.arr[5].poster}`} alt="Project 5" />
            </div>
          </div>
        </Link>}

        { res && res.arr[6] && <Link to='product6'>
          <div className={styles.outerProdBox} id={styles['opb-6']}>
            <div className={styles.prodBox}>
              <img src={`/uploads/${res.arr[6].poster}`} alt="Project 6" />
            </div>
          </div>
        </Link>}

        { res && res.arr[7] && <Link to='product7'>
          <div className={styles.outerProdBox} id={styles['opb-7']}>
            <div className={styles.prodBox}>
              <img src={`/uploads/${res.arr[7].poster}`} alt="Project 7" />
            </div>
          </div>
        </Link>}

        { res && res.arr[8] && <Link to='product8'>
          <div className={styles.outerProdBox} id={styles['opb-8']}>
            <div className={styles.prodBox}>
              <img src={`/uploads/${res.arr[8].poster}`} alt="Project 8" />
            </div>
          </div>
        </Link>}

        { res && res.arr[1] && <Link to='product1'>
          <div className={styles.outerProdBox} id={styles['opb-1']}>
            <div className={styles.prodBox}>
              <img src={`/uploads/${res.arr[1].poster}`} alt="Project 1" />
            </div>
          </div>
        </Link>}

        { res && res.arr[2] && <Link to='product2'>
          <div className={styles.outerProdBox} id={styles['opb-2']}>
            <div className={`${styles.prodBox} ${styles.smallProdBox}`}>
              <img src={`/uploads/${res.arr[2].poster}`} alt="Project 2" />
            </div>
          </div>
        </Link>}

        { res && res.arr[3] && <Link to='product3'>
          <div className={styles.outerProdBox} id={styles['opb-3']}>
            <div className={`${styles.prodBox} ${styles.smallProdBox}`}>
              <img src={`/uploads/${res.arr[3].poster}`} alt="Project 3" />
            </div>
          </div>
        </Link>}

        { res && res.arr[4] && <Link to='product4'>
          <div className={styles.outerProdBox} id={styles['opb-4']}>
            <div className={styles.prodBox}>
              <img src={`/uploads/${res.arr[4].poster}`} alt="Project 4" />
            </div>
          </div>
        </Link>}

        <div>
          <img src={exhibition_lobby} alt="Exhibition Lobby" className={styles.lobby} />
        </div>
      </div>
    </>
  )
}

export default ExhibitionHall;
