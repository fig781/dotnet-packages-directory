import React from 'react'
import styles from '../styles/PackageItem.module.css';

const PackageItem = ({ data }) => {
  return (
    <a className={styles.link} href={data?.localUrl}>
      <h3 className={styles.header}>{data?.name}</h3>
      <p className={styles.text}>{data?.description}</p>
    </a>
  )
}

export default PackageItem


