import React, { Component, Fragment } from 'react';
import styles from './overlay_container.module.scss';
import HorizontalBorder from 'CommonComponents/horizontalBorder';
import DivColumn from 'CommonComponents/divColumn';
import DivRow from 'CommonComponents/divRow';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import map from 'lodash/map';

class OverlayContainer extends Component {

  render() {
    const { onClickLogout, onClickBilling, subscriptionReducer: { isSubscriptionLoading, isSubscriptionError, featuresData } } = this.props;
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

        {
          (!isSubscriptionLoading && !isSubscriptionError) && (
            <Fragment>
              {
                map(featuresData, feature => (
                  <Fragment>
                    <ProgressItem
                      title="EXHIBITIONS USED"
                      value="4/5"
                      progress={50}
                    />

                    <HorizontalBorder />
                  </Fragment>
                ))
              }

              <div
                className={`${styles.item_container} ${styles.click}`}
                onClick={onClickBilling}
              >
                Billing
            </div>
              <HorizontalBorder />

              <div
                className={`${styles.item_container} ${styles.click}`}
                onClick={onClickLogout}
              >
                Logout
            </div>
              <HorizontalBorder />
            </Fragment>
          )
        }

      </DivColumn>
    )
  }
}

const mapStateToProps = state => {
  return {
    subscriptionReducer: state.subscriptionReducer,
  }
}

export default connect(mapStateToProps, null)(OverlayContainer);
