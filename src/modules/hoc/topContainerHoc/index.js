import React, { Component } from "react";
import DivColumn from "CommonComponents/divColumn";
import styles from "./top_container_hoc.module.scss";
import circularLoader from "Icons/circular-loader.gif";
import DivRow from "CommonComponents/divRow";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CookieService } from "Utils/cookieService";
import { USER_DATA_COOKIE, LANG } from "Constants/cookieConstants";

const topContainerHoc = WrappedComponent => {
  class topContainer extends Component {
    state = {
      isChildReady: false
    };

    componentDidMount() {
      //Sets user data from cookie to reducer
      const userData = CookieService.getJSON(USER_DATA_COOKIE);
      const languageCode = CookieService.get(LANG) || "en";
      //TODO call backdetails api here
    }

    // componentWillReceiveProps(nextProps) {
    //   const {
    //     flashMessageReducer: { showMessage },
    //     hideFlashMessage
    //   } = nextProps;

    //   if (showMessage) {
    //     setTimeout(() => {
    //       hideFlashMessage();
    //     }, 2000);
    //   }
    // }

    render() {
      const { showLoader, flashMessageReducer } = this.props;
      const { isChildReady } = this.state;
      const { message, showMessage, messageType } = flashMessageReducer;

      return (
        <DivColumn className={styles.top_container}>
          {isChildReady && <WrappedComponent {...this.props} />}
          {showLoader && (
            <DivColumn
              className={styles.loader_container}
              verticalCenter
              horizontalCenter
            >
              <img src={circularLoader} className={styles.loader} />
            </DivColumn>
          )}

          <DivRow
            horizontalCenter
            verticalCenter
            className={`
            ${styles.flash_message_container}
            ${!showMessage ? styles.flash_message_hidden : ""}
            ${styles[`flash_message_type_${messageType}`]}`}
          >
            {message}
          </DivRow>
        </DivColumn>
      );
    }
  }
  const mapStateToProps = state => {
    return {
      showLoader: state.loaderReducer.showLoader,
      flashMessageReducer: state.flashMessageReducer
    };
  };

  const mapDispathToProps = dispatch => {
    return {};
  };

  return connect(mapStateToProps, mapDispathToProps)(topContainer);
};

export default topContainerHoc;
