import React, { Component, Fragment } from "react";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import styles from "./subscription_component.module.scss";
import translatorHoc from "Hoc/translatorHoc";
import exhibitionIconWhite from "Icons/exhibition-white.svg";
import growthIconWhite from "Icons/growth-white.svg";
import rocketIconWhite from "Icons/rocket-white.svg";
import exhibitionIconBlack from "Icons/exhibition-black.svg";
import growthIconBlack from "Icons/growth-black.svg";
import rocketIconBlack from "Icons/rocket-black.svg";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSelectedSubscription } from "Core/modules/subscription/subscriptionActions";
import HorizontalBorder from "CommonComponents/horizontalBorder";
import map from "lodash/map";
import {
  getActivePlan,
  getFeatureUsage,
} from "Core/modules/subscription/subscriptionActions";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import isEmpty from "lodash/isEmpty";

class ActiveSubscription extends Component {
  selectSubscription = () => {
    const { setSelectedSubscription, subscription } = this.props;
    setSelectedSubscription(subscription);
  };

  componentDidMount() {
    const {
      getFeatureUsage,
      subscriptionReducer: { featuresData },
    } = this.props;
    const features = [
      { slug: "exhibition-listing" },
      { slug: "product-listing" },
    ];
    if (isEmpty(featuresData)) {
      map(features, (slug) => getFeatureUsage(slug.slug));
    }
  }

  render() {
    const {
      subscription,
      isRTL,
      subscriptionReducer: {
        selectedSubscription,
        isSubscriptionLoading,
        isSubscriptionError,
        featuresData,
      },
      getActivePlan,
      getFeatureUsage,
    } = this.props;

    const ProgressItem = ({ title, value, progress }) => (
      <DivColumn className={`${styles.item_container} ${styles.click}`}>
        <DivRow className={styles.display_container}>
          <div className={styles.title}>{title}</div>
          <div className={styles.value}>{value}</div>
        </DivRow>
        <DivRow className={styles.progress_bar_container}>
          <div
            style={{ width: `${progress}%` }}
            className={styles.progress_bar_filled}
          ></div>
        </DivRow>
      </DivColumn>
    );
    return (
      <DivRow className={styles.subscription_container}>
        <DivColumn fillParent center className={`${styles.subscription}`}>
          <div className={styles.subscription_title}>
            Active Plan: {subscription.plan_name}
          </div>
          <div className={styles.subscription_price}>
            KD {subscription.price}
          </div>
          {subscription.subscription_type == "commission" && (
            <div className={styles.subscription_price}>
              Commission: {subscription.commission}
            </div>
          )}

          <div className={styles.subtitle}>Benefits Include:</div>
          <DivRow fillParent className={styles.features}>
            <DivRow className={styles.feature}>
              <img
                alt="nav"
                src={
                  selectedSubscription.id == subscription.id
                    ? exhibitionIconWhite
                    : exhibitionIconBlack
                }
                className={styles.feature_icon}
              />
              <DivColumn className={styles.feature_details}>
                <div className={styles.feature_title}>
                  {subscription.no_of_exhibitions} Exhibitions
                </div>
                <div className={styles.feature_description}>
                  You can enroll in {subscription.no_of_exhibitions} number of
                  exhibitions
                </div>
              </DivColumn>
            </DivRow>
            <DivRow className={styles.feature}>
              <img
                alt="nav"
                src={
                  selectedSubscription.id == subscription.id
                    ? growthIconWhite
                    : growthIconBlack
                }
                className={styles.feature_icon}
              />
              <DivColumn className={styles.feature_details}>
                <div className={styles.feature_title}>
                  {subscription.no_of_products} Products
                </div>
                <div className={styles.feature_description}>
                  You can maintain {subscription.no_of_products} products
                </div>
              </DivColumn>
            </DivRow>
          </DivRow>
        </DivColumn>
        <DivColumn fillParent className={`${styles.subscription}`}>
          <div
            className={`${styles.item_container} ${styles.subscription_title}`}
            style={{ cursor: "default" }}
          >
            Usage
          </div>
          <HorizontalBorder />

          {map(featuresData, (feature) => (
            <Fragment>
              <ProgressItem
                title={feature.title}
                value={`${feature.used}/${feature.total}`}
                progress={feature.percentage}
              />

              <HorizontalBorder />
            </Fragment>
          ))}
        </DivColumn>
      </DivRow>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    subscriptionReducer: state.subscriptionReducer,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    setSelectedSubscription: bindActionCreators(
      setSelectedSubscription,
      dispatch
    ),
    getActivePlan: bindActionCreators(getActivePlan, dispatch),
    getFeatureUsage: bindActionCreators(getFeatureUsage, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(translatorHoc(ActiveSubscription));
