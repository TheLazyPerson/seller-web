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
