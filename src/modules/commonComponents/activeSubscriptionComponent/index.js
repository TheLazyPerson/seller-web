import React, { Component } from "react";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import styles from "./subscription_component.module.scss";
import translatorHoc from "Hoc/translatorHoc";
import exhibitionIconWhite from "Icons/exhibition-white.svg";
import growthIconWhite from "Icons/growth-white.svg";
import rocketIconWhite from "Icons/rocket-white.svg";
import exhibitionIconBlack from "Icons/exhibition-black.svg";
import growthIconBlack from "Icons/growth-black.svg";
import rocketIconBlack from "Icons/rocket-black.svg";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSelectedSubscription } from "Core/modules/subscription/subscriptionActions";

class ActiveSubscription extends Component {
  selectSubscription = () => {
    const { setSelectedSubscription, subscription } = this.props;
    setSelectedSubscription(subscription);
  };

  render() {
    const {
      subscription,
      isRTL,
      subscriptionReducer: { selectedSubscription },
    } = this.props;

    return (
      <DivColumn fillParent className={`${styles.subscription}`}>
        <div className={styles.subscription_title}>Current Plan</div>
        <div className={styles.subscription_price}>KD {subscription.price}</div>
        {subscription.subscription_type == "commission" && (
          <div className={styles.subscription_price}>
            Commission: {subscription.commission}
          </div>
        )}

        <div className={styles.subtitle}>Benefits Include:</div>
        <DivColumn fillParent className={styles.features}>
          <DivRow className={styles.feature}>
            <img
              alt="nav"
              src={
                selectedSubscription.id == subscription.id
                  ? exhibitionIconWhite
                  : exhibitionIconBlack
              }
              className={styles.feature_icon}
            />
            <DivColumn className={styles.feature_details}>
              <div className={styles.feature_title}>
                {subscription.no_of_exhibitions} Exhibitions
              </div>
              <div className={styles.feature_description}>
                You can enroll in {subscription.no_of_exhibitions} number of
                exhibitions
              </div>
            </DivColumn>
          </DivRow>
          <DivRow className={styles.feature}>
            <img
              alt="nav"
              src={
                selectedSubscription.id == subscription.id
                  ? growthIconWhite
                  : growthIconBlack
              }
              className={styles.feature_icon}
            />
            <DivColumn className={styles.feature_details}>
              <div className={styles.feature_title}>
                {subscription.no_of_products} Products
              </div>
              <div className={styles.feature_description}>
                You can maintain {subscription.no_of_products} products
              </div>
            </DivColumn>
          </DivRow>
        </DivColumn>
      </DivColumn>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    subscriptionReducer: state.subscriptionReducer,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    setSelectedSubscription: bindActionCreators(
      setSelectedSubscription,
      dispatch
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(translatorHoc(ActiveSubscription));
