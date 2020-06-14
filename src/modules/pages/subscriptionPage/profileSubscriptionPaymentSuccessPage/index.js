import React, { Component } from "react";
import DivColumn from "CommonComponents/divColumn";
import styles from "./payment_success.module.scss";
import navigatorHoc from "Hoc/navigatorHoc";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showSuccessFlashMessage } from "Redux/actions/flashMessageActions";

import SectionedContainer from "CommonContainers/sectionedContainer";
import SideNav from "CommonComponents/sideNav";

class ProfileSubscriptionPaymentSuccessPage extends Component {
  componentDidMount() {
    const { navigateTo } = this.props;
    this.id = setTimeout(() => {
      navigateTo("subscription");
    }, 2000);
  }

  componentWillUnmount() {
    clearTimeout(this.id);
  }
  render() {
    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <DivColumn
          verticalCenter
          horizontalCenter
          className={styles.page_container}
        >
          <div className={styles.title}>Payment Successful</div>
        </DivColumn>
      </SectionedContainer>
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
)(navigatorHoc(ProfileSubscriptionPaymentSuccessPage));
