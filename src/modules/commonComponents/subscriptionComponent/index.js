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

class Subscription extends Component {
  selectSubscription = () => {
    const { setSelectedSubscription, subscription } = this.props;
    setSelectedSubscription(subscription);
  };

  render() {
    const {
      subscription,
      isRTL,
      translate,
      subscriptionReducer: { selectedSubscription },
    } = this.props;

    return (
      <DivColumn
        fillParent
        className={`${styles.subscription} ${
          selectedSubscription.id == subscription.id ? styles.is_selected : ""
        }`}
        onClick={this.selectSubscription}
      >
        <div className={styles.subscription_title}>
          {subscription.plan_name}
        </div>
        <div className={styles.subscription_price}>
          {" "}
          {translate("subscription_item.kd")} {subscription.price}
        </div>
        <div className={styles.subtitle}>
          {translate("subscription_item.benefits")}Benefits Include:
        </div>
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
                {subscription.no_of_exhibitions}
                {translate("subscription_item.exhibitions")}
              </div>
              <div className={styles.feature_description}>
                {translate("subscription_item.enroll")}{" "}
                {subscription.no_of_exhibitions}{" "}
                {translate("subscription_item.no_exhibition")}
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
                {subscription.no_of_products}{" "}
                {translate("subscription_item.products")}
              </div>
              <div className={styles.feature_description}>
                {translate("subscription_item.maintain")} You can maintain{" "}
                {subscription.no_of_products}{" "}
                {translate("subscription_item.products")}products
              </div>
            </DivColumn>
          </DivRow>
          <DivRow className={styles.feature}>
            <img
              alt="nav"
              src={
                selectedSubscription.id == subscription.id
                  ? rocketIconWhite
                  : rocketIconBlack
              }
              className={styles.feature_icon}
            />
            <DivColumn className={styles.feature_details}>
              <div className={styles.feature_title}>
                {translate("subscription_item.seller_fetures")}
              </div>
              <div className={styles.feature_description}>
                {translate("subscription_item.access")}
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
)(translatorHoc(Subscription));
