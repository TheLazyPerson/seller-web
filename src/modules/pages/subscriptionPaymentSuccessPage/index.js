import React, { Component } from "react";
import FullWidthContainer from "CommonContainers/fullwidthContainer";
import DivColumn from "CommonComponents/divColumn";
import styles from "./payment_success.module.scss";
import InputTextComponent from "CommonComponents/InputTextComponent";
import InputCheckbox from "CommonComponents/InputCheckbox";
import CapsuleButton from "CommonComponents/capsuleButton";
import navigatorHoc from "Hoc/navigatorHoc";
import queryString from "query-string";
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
    const parsed = queryString.parse(this.props.location.search);

    return (
      <FullWidthContainer>
        <DivColumn
          verticalCenter
          horizontalCenter
          className={styles.page_container}
        >
          <div className={styles.title}>Payment Successful</div>
          <div className={styles.description}>Welcome to the family.</div>
        </DivColumn>
      </FullWidthContainer>
    );
  }
}

const mapDispathToProps = (dispatch) => {
  return {
    showSuccessFlashMessage: bindActionCreators(
      showSuccessFlashMessage,
      dispatch
    ),
  };
};

export default connect(
  null,
  mapDispathToProps
)(navigatorHoc(SubscriptionPaymentSuccessPage));
