import React, { Component } from "react";
import FullWidthContainer from "CommonContainers/fullwidthContainer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./customer_onboard.module.scss";
import { postSignupAction } from "Core/modules/signup/signupActions"; //src\seller-core\modules\signup\signupActions.js
import { showSuccessFlashMessage } from "Redux/actions/flashMessageActions";
import navigatorHoc from "Hoc/navigatorHoc";
import translatorHoc from "Hoc/translatorHoc";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import { getPlanListAction } from "Core/modules/subscription/subscriptionActions";
import Pricing from "../Pricing";
import SignUpPage from "../signupPage";
import MarketplaceDetail from "../marketplaceDetails";
import BankDetails from "../bankDetailsPage";
import Stepper from "react-stepper-horizontal";

class CustomerOnboard extends Component {
  state = {
    step: 0,
  };

  nextStep = () =>
    this.setState((state) => ({
      step: state.step + 1,
    }));

  prevStep = () =>
    this.setState((state) => ({
      step: state.step - 1,
    }));

  onSignUp = (postData) => {
    this.nextStep();
    // const {
    //   postSignupAction,
    //   navigateTo,
    //   showSuccessFlashMessage,
    // } = this.props;

    // if (postData) {
    //   postSignupAction(postData).then(({ payload }) => {
    //     if (payload.code === 200 || payload.code === 201) {
    //       const {
    //         data: { payment_information },
    //       } = payload;
    //       if (payload.data.is_free === 1) {
    //         navigateTo("signin");
    //       } else {
    //         window.location.href = payment_information.paymentURL;
    //       }
    //       showSuccessFlashMessage("Signed up successfuly");
    //     }
    //   });
    // } else {
    //   this.setState({ showSubscription: true });
    // }
  };

  render() {
    const {
      subscriptionReducer: { subscriptionPlanList },
      getPlanListAction,
    } = this.props;
    const { step } = this.state;
    return (
      <FullWidthContainer>
        <div className={styles.stepper_container}>
          <Stepper
            activeColor="#d59d15"
            completeColor="#d59d15"
            steps={[
              { title: "Sign Up" },
              { title: "Marketplace Details" },
              { title: "Bank Details" },
              { title: "Pricing" },
            ]}
            activeStep={this.state.step}
          />
        </div>

        {step === 0 && <SignUpPage onSignUp={this.onSignUp} />}
        {step === 1 && (
          <MarketplaceDetail next={this.nextStep} prev={this.prevStep} />
        )}
        {step === 2 && (
          <BankDetails next={this.nextStep} prev={this.prevStep} />
        )}
        {step === 3 && (
          <InitialPageLoader initialPageApi={getPlanListAction}>
            <Pricing subscriptionPlanList={subscriptionPlanList} />
          </InitialPageLoader>
        )}
      </FullWidthContainer>
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

const mapDispathToProps = (dispatch) => {
  return {
    postSignupAction: bindActionCreators(postSignupAction, dispatch),
    showSuccessFlashMessage: bindActionCreators(
      showSuccessFlashMessage,
      dispatch
    ),
    getPlanListAction: bindActionCreators(getPlanListAction, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(translatorHoc(navigatorHoc(CustomerOnboard)));
