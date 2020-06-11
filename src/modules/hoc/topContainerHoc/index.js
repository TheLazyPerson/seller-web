import React, { Component } from "react";
import DivColumn from "CommonComponents/divColumn";
import styles from "./top_container_hoc.module.scss";
import circularLoader from "Icons/circular-loader.gif";
import DivRow from "CommonComponents/divRow";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { hideFlashMessage } from "Redux/actions/flashMessageActions";
// import { setBagCount } from 'Core/modules/bag/bagActions';
import { setUserDataAction } from "Core/modules/signin/signinActions";
import { setLanguageAction } from "Core/modules/language/languageActions";
import { CookieService } from "Utils/cookieService";
import { USER_DATA_COOKIE, LANG } from "Constants/cookieConstants";
import {
  getActivePlan,
  getFeatureUsage,
} from "Core/modules/subscription/subscriptionActions";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";

const topContainerHoc = (WrappedComponent) => {
  class topContainer extends Component {
    state = {
      isChildReady: false,
    };

    componentDidMount() {
      //Sets user data from cookie to reducer
      const { setUserDataAction } = this.props;
      const userData = CookieService.getJSON(USER_DATA_COOKIE);
      // const bagCount = CookieService.get('BAG_COUNT');
      const languageCode = CookieService.get(LANG) || "en";
      //TODO call backdetails api here
      setLanguageAction(languageCode);

      if (userData) {
        // setBagCount(bagCount);
        setUserDataAction(userData);
        this.getSubscriptionApi();

        this.setState({
          isChildReady: true,
        });
      } else {
        this.setState({
          isChildReady: true,
        });
      }
    }

    componentWillReceiveProps(nextProps) {
      const {
        flashMessageReducer: { showMessage },
        hideFlashMessage,
      } = nextProps;

      if (showMessage) {
        setTimeout(() => {
          hideFlashMessage();
        }, 2000);
      }
    }

    getSubscriptionApi = () => {
      // const { getActivePlan, getFeatureUsage } = this.props;
      const { getFeatureUsage } = this.props;
      // const activeSubscription = await getActivePlan();
      const features = [
        { slug: "exhibition-listing" },
        { slug: "product-listing" },
      ];
      // if(!isEmpty(activeSubscription.payload.data) && !isEmpty(activeSubscription.payload.data.plan.features)) {
      map(features, async (feature) => {
        getFeatureUsage(feature.slug);
      });
      // }
    };

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
  const mapStateToProps = (state) => {
    return {
      showLoader: state.loaderReducer.showLoader,
      subscriptionReducer: state.subscriptionReducer,
      flashMessageReducer: state.flashMessageReducer,
    };
  };

  const mapDispathToProps = (dispatch) => {
    return {
      hideFlashMessage: bindActionCreators(hideFlashMessage, dispatch),
      setUserDataAction: bindActionCreators(setUserDataAction, dispatch),
      setLanguageAction: bindActionCreators(setLanguageAction, dispatch),
      // setBagCount: bindActionCreators(setBagCount, dispatch),
      getActivePlan: bindActionCreators(getActivePlan, dispatch),
      getFeatureUsage: bindActionCreators(getFeatureUsage, dispatch),
    };
  };

  return connect(mapStateToProps, mapDispathToProps)(topContainer);
};

export default topContainerHoc;
