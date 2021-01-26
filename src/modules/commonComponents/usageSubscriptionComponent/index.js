import React, { Component } from "react";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import styles from "./usage_subscription_component.module.scss";
import translatorHoc from "Hoc/translatorHoc";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSelectedSubscription } from "Core/modules/subscription/subscriptionActions";

import CapsuleButton from "CommonComponents/capsuleButton";

import {
  getActivePlan,
  getFeatureUsage,
} from "Core/modules/subscription/subscriptionActions";

class UsageSubscriptionComponent extends Component {
  selectSubscription = () => {
    const { setSelectedSubscription, subscription } = this.props;
    setSelectedSubscription(subscription);
  };

  render() {
    const {
      subscription,
      isRTL,
      translate,
      languageReducer: { languageCode },
      onClickChangePlan,
    } = this.props;

    return (
      <DivColumn
        fillParent
        className={`${styles.subscription} ${isRTL ? styles.rtl : ""} `}
        onClick={this.selectSubscription}
      >
        <div className={styles.subscription_title}>
          {subscription.plan.translations[languageCode].plan_name}
        </div>
        <div className={styles.subscription_price}>
          {" "}
          {translate("subscription_item.kd")} {subscription.plan.price}
        </div>
        {}
        <div className={styles.commission}>
          {translate("subscription_item.commission")}:{" "}
          {subscription.plan.commission}
          {translate("subscription_item.commssion_additional_text")}
        </div>
        <DivRow horizontalCenter>
          <CapsuleButton onClick={() => onClickChangePlan(subscription.id)}>
            Activate
          </CapsuleButton>
        </DivRow>
      </DivColumn>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    subscriptionReducer: state.subscriptionReducer,
    isRTL: state.languageReducer.isRTL,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    setSelectedSubscription: bindActionCreators(
      setSelectedSubscription,
      dispatch
    ),
    getActivePlan: bindActionCreators(getActivePlan, dispatch),
    getFeatureUsage: bindActionCreators(getFeatureUsage, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(translatorHoc(UsageSubscriptionComponent));
