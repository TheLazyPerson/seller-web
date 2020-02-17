import React, { Component } from 'react';
import styles from './overlay_container.module.scss';
import HorizontalBorder from 'CommonComponents/horizontalBorder';
import DivColumn from 'CommonComponents/divColumn';
import DivRow from 'CommonComponents/divRow';

class OverlayContainer extends Component {

  render() {
    const ProgressItem = ({ title, value, progress }) => (
      <DivColumn className={`${styles.item_container} ${styles.click}`}>
        <DivRow className={styles.display_container}>
          <div className={styles.title}>{title}</div>
          <div className={styles.value}>{value}</div>
        </DivRow>
        <DivRow className={styles.progress_bar_container}>
          <div style={{ width: `${progress}%` }} className={styles.progress_bar_filled}></div>
        </DivRow>
      </DivColumn>
    )

    return (
      <DivColumn className={styles.overlay_container}>

        <div className={`${styles.item_container} ${styles.title}`} style={{ cursor: 'default' }}>
          USAGE
        </div>
        <HorizontalBorder />

        <ProgressItem
          title="EXHIBITIONS USED"
          value="4/5"
          progress={50}
        />

        <HorizontalBorder />

        <ProgressItem
          title="PRODUCTS USED"
          value="4/5"
          progress={50}
        />
        <HorizontalBorder />

        <div className={`${styles.item_container} ${styles.click}`}>
          Billing
        </div>
        <HorizontalBorder />

        <div className={`${styles.item_container} ${styles.click}`}>
          Logout
        </div>
        <HorizontalBorder />
      </DivColumn>
    )
  }
}

export default OverlayContainer;