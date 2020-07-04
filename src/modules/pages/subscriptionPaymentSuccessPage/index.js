import React, { Component } from "react";
import FullWidthContainer from "CommonContainers/fullwidthContainer";
import DivColumn from "CommonComponents/divColumn";
import styles from "./payment_success.module.scss";
import navigatorHoc from "Hoc/navigatorHoc";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showSuccessFlashMessage } from "Redux/actions/flashMessageActions";

class SubscriptionPaymentSuccessPage extends Component {
  componentDidMount() {
    const { navigateTo, showSuccessFlashMessage } = this.props;
    this.id = setTimeout(() => {
      navigateTo("signin");
      showSuccessFlashMessage("Signed up successfuly");
    }, 10000);
  }

  componentWillUnmount() {
    clearTimeout(this.id);
  }
  render() {
    const { translate, isRTL } = this.props;
    return (
      <FullWidthContainer>
        <DivColumn
          verticalCenter
          horizontalCenter
          className={` ${styles.page_container} ${isRTL ? styles.rtl : ""}`}
        >
          <div className={styles.title}>
            {translate("exhibition_overview.payment1")}
          </div>
          <div className={styles.description}>
            {translate("exhibition_overview.description1")}.
          </div>
        </DivColumn>
      </FullWidthContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isRTL: state.languageReducer.isRTL,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    showSuccessFlashMessage: bindActionCreators(
      showSuccessFlashMessage,
      dispatch
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(SubscriptionPaymentSuccessPage));
