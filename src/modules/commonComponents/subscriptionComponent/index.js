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
import { setSelectedSubscription } from 'Core/modules/subscription/subscriptionActions';


class Subscription extends Component {

  selectSubscription = () => {
    const { setSelectedSubscription, subscription } = this.props;
    setSelectedSubscription(subscription)
  }

  render() {
    const { subscription, isRTL, features, subscriptionReducer: { selectedSubscription } } = this.props;

    const exhibitionFeature = features.filter(
      feature => feature.name === "exhibition_listing"
    );
    const productFeature = features.filter(
      feature => feature.name === "product_listing"
    );
    return (
      <DivColumn
        fillParent
        className={`${styles.subscription} ${
          selectedSubscription.id == subscription.id ? styles.is_selected : ""
          }`}
        onClick={this.selectSubscription}
      >
        <div className={styles.subscription_title}>{subscription.name}</div>
        <div className={styles.subscription_price}>
          KD {subscription.signup_fee} / Month
        </div>
        <div className={styles.subtitle}>Benefits Include:</div>
        <DivColumn fillParent className={styles.features}>
          <DivRow className={styles.feature}>
            <img
              alt="nav"
              src={
                subscription.isSelected
                  ? exhibitionIconWhite
                  : exhibitionIconBlack
              }
              className={styles.feature_icon}
            />
            <DivColumn className={styles.feature_details}>
              <div className={styles.feature_title}>
                {exhibitionFeature[0].value} Exhibitions
              </div>
              <div className={styles.feature_description}>
                You can enroll in {exhibitionFeature[0].value} number of
                exhibitions
              </div>
            </DivColumn>
          </DivRow>
          <DivRow className={styles.feature}>
            <img
              alt="nav"
              src={subscription.isSelected ? growthIconWhite : growthIconBlack}
              className={styles.feature_icon}
            />
            <DivColumn className={styles.feature_details}>
              <div className={styles.feature_title}>
                {productFeature[0].value} Products
              </div>
              <div className={styles.feature_description}>
                You can maintain {productFeature[0].value} products
              </div>
            </DivColumn>
          </DivRow>
          <DivRow className={styles.feature}>
            <img
              alt="nav"
              src={subscription.isSelected ? rocketIconWhite : rocketIconBlack}
              className={styles.feature_icon}
            />
            <DivColumn className={styles.feature_details}>
              <div className={styles.feature_title}>All Seller Features</div>
              <div className={styles.feature_description}>
                Have access to all seller features.
              </div>
            </DivColumn>
          </DivRow>
        </DivColumn>
      </DivColumn>
    );
  }
}
const mapStateToProps = state => {
  return {
    subscriptionReducer: state.subscriptionReducer
  };
};

const mapDispathToProps = dispatch => {
  return {
    setSelectedSubscription: bindActionCreators(setSelectedSubscription, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(translatorHoc(Subscription));
