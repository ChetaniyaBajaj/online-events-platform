import React from 'react'
import styles from '../css/ProductGallery1.module.css'
import product_gallery_odd from '../images/product_gallery_odd.jpg';
// import amazon from '../images/sponsor.png';
// import veslogo from '../images/veslogo.png';

const ProductGallery1 = (props) => {
    return (
        <div className={styles.prodContainer}>
            {props.data.ytlink && <div className={styles.prodBox} id={styles.videoBox}>
                <iframe className={styles.mainVideo} src={`https://www.youtube.com/embed/${props.data.ytlink}?autoplay=1&mute=1&controls=1&loop=1&showinfo=1`} frameBorder="0" title='Main Lobby Video'></iframe>
            </div>}

            {props.data.videoFilename && <div className={styles.prodBox} id={styles.videoBox}><video className={styles.mainVideo} controls loop autoPlay muted>
                <source src={`/uploads/${props.data.videoFilename}`} type="video/mp4" />
            </video></div> }

            {props.data.poster && <div className={styles.prodBox} id={styles.posterBox}>
                <img src={`/uploads/${props.data.poster}`} alt="Project Poster" />
            </div>}

            {props.logo && <div className={`${styles.mainLogo} ${styles.prodBox}`}>
                <img src={`/uploads/${props.logo.poster}`} alt="Main Logo" />
            </div>}

            {props.data.ourteamlink && <div className={`${styles.prodBox} ${styles.meetOurTeamBox}`}>
                <a href={props.data.ourteamlink} target="_blank" rel="noreferrer" className={styles.meetOurTeamBox}> </a>
            </div>}

            <div>
                <img src={product_gallery_odd} className={styles.lobby} alt='Product Gallery Odd' />
            </div>
        </div>
    )
}

export default ProductGallery1