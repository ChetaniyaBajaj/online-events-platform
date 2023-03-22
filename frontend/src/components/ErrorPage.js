import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../css/ErrorPage.module.css'

const ErrorPage = () => {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.message}>
        <h1 className={styles.errorHeading}>Oops! Page not found</h1>
        <p>We could not find the page you were looking for. No worries, we do have our <Link to="/" className={styles.link}>home page</Link> ready for you.</p>
      </div>
    </div>
  )
}

export default ErrorPage