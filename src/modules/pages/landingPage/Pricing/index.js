import React, { Component } from "react";
import navigatorHoc from "Hoc/navigatorHoc";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import map from "lodash/map";
import styles from "./pricing.module.scss";
import Subscription from "CommonComponents/subscriptionComponent";
import { connect } from "react-redux";

class Pricing extends Component {
  render() {
    const { subscriptionPlanList, isRTL } = this.props;

    return (
      <DivRow
        fillParent
        className={` ${styles.subscription_container} ${
          isRTL ? styles.rtl : ""
        }`}
      >
        {map(subscriptionPlanList, (subscription, index) => {
          return (
            <Subscription
              subscription={subscription}
              isSelected={subscription.isSelected}
            />
          );
        })}
      </DivRow>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isRTL: state.languageReducer.isRTL,
  };
};

export default connect(mapStateToProps, null)(navigatorHoc(Pricing));
