import React, { Component } from "react";
import DivColumn from "CommonComponents/divColumn";
import styles from "./subscription_option_component.module.scss";
import translatorHoc from "Hoc/translatorHoc";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSelectedSubscriptionOption } from "Core/modules/exhibition/exhibitionActions";

class SubscriptionOption extends Component {
  selectSubscriptionOption = () => {
    const { setSelectedSubscriptionOption, option } = this.props;
    setSelectedSubscriptionOption(option);
  };

  render() {
    const {
      option,
      exhibitionReducer: { selectedSubscriptionOption },
      translate,
    } = this.props;

    return (
      <DivColumn
        verticalCenter
        horizontalCenter
        className={`${styles.subscription_option} ${
          selectedSubscriptionOption.type === option.type
            ? styles.is_selected
            : ""
        }`}
        onClick={this.selectSubscriptionOption}
      >
        <div className={styles.subscription_option_price}>
          {option.type === "flat_type" || option.type === "free" ? "KD" : ""}{" "}
          {option.value}{" "}
          {option.type === "flat_type" || option.type === "free" ? "" : "%"}
        </div>
        <div className={styles.subscription_option_title}>
          {option.type === "flat_type" &&
            translate("exhibition_details_page.subscription_option.flat_fee")}
          {option.type === "commission" &&
            translate("exhibition_details_page.subscription_option.commission")}
          {option.type === "free" &&
            translate("exhibition_details_page.subscription_option.free")}
        </div>
        <div className={styles.subscription_option_subtitle}>
          {option.type === "flat_type" &&
            translate(
              "exhibition_details_page.subscription_option.flat_fee_subtitle"
            )}
          {option.type === "commission" &&
            translate(
              "exhibition_details_page.subscription_option.commission_subtitle"
            )}
          {option.type === "free" &&
            translate(
              "exhibition_details_page.subscription_option.free_subtitle"
            )}
        </div>
      </DivColumn>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    exhibitionReducer: state.exhibitionReducer,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    setSelectedSubscriptionOption: bindActionCreators(
      setSelectedSubscriptionOption,
      dispatch
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(translatorHoc(SubscriptionOption));
