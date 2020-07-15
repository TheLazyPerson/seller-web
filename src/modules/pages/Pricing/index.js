import React, { Component } from "react";
import navigatorHoc from "Hoc/navigatorHoc";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import map from "lodash/map";
import styles from "./pricing.module.scss";
import Subscription from "CommonComponents/subscriptionComponent";
import CapsuleButton from "CommonComponents/capsuleButton";
import { connect } from "react-redux";
import translatorHoc from "Hoc/translatorHoc";

class Pricing extends Component {
  onSubmit = () => {
    const {
      subscriptionReducer: { selectedSubscription },
    } = this.props;
    if (selectedSubscription.id) {
      this.props.initiatePayment(selectedSubscription.id);
    }
  };

  render() {
    const { subscriptionPlanList, translate } = this.props;

    return (
      <DivColumn>
        <DivRow fillParent className={styles.subscription_container}>
          {map(subscriptionPlanList, (subscription, index) => {
            return (
              <Subscription
                subscription={subscription}
                isSelected={subscription.isSelected}
              />
            );
          })}
        </DivRow>
        <DivColumn horizontalCenter className={styles.pricing_select_container}>
          <CapsuleButton
            className={styles.get_started_button}
            onClick={this.onSubmit}
          >
            {translate("pricing.get_started")}
          </CapsuleButton>
        </DivColumn>
      </DivColumn>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    signupReducer: state.signupReducer,
    signInReducer: state.signInReducer,
    subscriptionReducer: state.subscriptionReducer,
  };
};

export default connect(mapStateToProps)(translatorHoc(navigatorHoc(Pricing)));
