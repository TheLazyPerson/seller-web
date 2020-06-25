import React, { Component } from "react";
import DivColumn from "CommonComponents/divColumn";
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
import LocationDetails from "../locationDetailsPage";
import BankDetails from "../bankDetailsPage";
import PersonalDetails from "../personalDetailsPage";
import Stepper from "react-stepper-horizontal";
import FullWidthContainer from "CommonContainers/fullwidthContainer";
import { editProfileDetailsAction } from "Core/modules/profiledetails/profileDetailsActions";
import { setSubscriptionPlanToUser } from "Core/modules/subscription/subscriptionActions";

class CustomerOnboard extends Component {
  state = {
    step: 1,
  };

  componentDidMount() {
    const {
      signInReducer: { userDetails, isUserSignedIn },
    } = this.props;
    if (isUserSignedIn) {
      const { editProfileDetailsAction } = this.props;
      if (userDetails) {
        const id = userDetails.id;
        editProfileDetailsAction({ id }).then(({ payload }) => {
          if (payload.code === 200 || payload.code === 201) {
            const missingData = this.props.profileDetailsReducer.missingData;
            if (
              missingData.includes("civil_id") |
              missingData.includes("phone_number") |
              missingData.includes("birthday")
            ) {
              this.setState({
                step: 1,
              });
            } else if (missingData.includes("marketplace_profile")) {
              this.setState({
                step: 2,
              });
            } else if (missingData.includes("shop_location")) {
              this.setState({
                step: 3,
              });
            } else if (missingData.includes("bank_details")) {
              this.setState({
                step: 4,
              });
            } else if (missingData.includes("subscription")) {
              this.setState({
                step: 5,
              });
            }
          }
        });
      }
    }
  }

  nextStep = () =>
    this.setState((state) => ({
      step: state.step + 1,
    }));

  prevStep = () =>
    this.setState((state) => ({
      step: state.step - 1,
    }));

  onSignUp = (postData) => {
    const { postSignupAction } = this.props;
    if (postData) {
      postSignupAction(postData).then(({ payload }) => {
        if (payload.code === 200 || payload.code === 201) {
          this.nextStep();
        }
      });
    }
  };

  profileUpdate = (updatedPostData) => {
    const {
      editProfileDetailsAction,
      signInReducer: { userDetails },
    } = this.props;
    if (updatedPostData && userDetails) {
      const id = userDetails.id;
      const updatedWithUserId = { ...updatedPostData, id };
      editProfileDetailsAction(updatedWithUserId).then(({ payload }) => {
        if (payload.code === 200 || payload.code === 201) {
          this.nextStep();
        }
      });
    }
  };

  initiatePayment = (id) => {
    const { setSubscriptionPlanToUser, navigateTo } = this.props;
    const postData = {
      plan_id: id,
    };

    setSubscriptionPlanToUser(postData).then(({ payload }) => {
      if (payload.code === 200 || payload.code === 201) {
        const {
          data: { payment_information },
        } = payload;
        if (payload.data.is_free === 1) {
          navigateTo("home");
        } else {
          window.location.href = payment_information.paymentURL;
        }
      }
    });
  };

  render() {
    const {
      subscriptionReducer: { subscriptionPlanList },
      getPlanListAction,
    } = this.props;
    const { step } = this.state;
    return (
      <FullWidthContainer>
        <DivColumn>
          <div className={styles.stepper_container}>
            <Stepper
              activeColor="#d59d15"
              completeColor="#d59d15"
              steps={[
                { title: "Sign Up" },
                { title: "Personal Details" },
                { title: "Marketplace Details" },
                { title: "Location Details" },
                { title: "Bank Details" },
                { title: "Pricing" },
              ]}
              activeStep={this.state.step}
            />
          </div>

          {step === 0 && <SignUpPage onSignUp={this.onSignUp} />}
          {step === 1 && <PersonalDetails profileUpdate={this.profileUpdate} />}
          {step === 2 && (
            <MarketplaceDetail profileUpdate={this.profileUpdate} />
          )}
          {step === 3 && <LocationDetails profileUpdate={this.profileUpdate} />}
          {step === 4 && <BankDetails profileUpdate={this.profileUpdate} />}
          {step === 5 && (
            <InitialPageLoader initialPageApi={getPlanListAction}>
              <Pricing
                subscriptionPlanList={subscriptionPlanList}
                initiatePayment={this.initiatePayment}
              />
            </InitialPageLoader>
          )}
        </DivColumn>
      </FullWidthContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    signInReducer: state.signInReducer,
    subscriptionReducer: state.subscriptionReducer,
    profileDetailsReducer: state.profileDetailsReducer,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    postSignupAction: bindActionCreators(postSignupAction, dispatch),
    showSuccessFlashMessage: bindActionCreators(
      showSuccessFlashMessage,
      dispatch
    ),
    editProfileDetailsAction: bindActionCreators(
      editProfileDetailsAction,
      dispatch
    ),
    getPlanListAction: bindActionCreators(getPlanListAction, dispatch),
    setSubscriptionPlanToUser: bindActionCreators(
      setSubscriptionPlanToUser,
      dispatch
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(translatorHoc(navigatorHoc(CustomerOnboard)));
