import React, { Component } from "react";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
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
      isRTL,
      exhibitionReducer: { selectedSubscriptionOption }
    } = this.props;

    return (
      <DivColumn
        verticalCenter
        horizontalCenter
        className={`${styles.subscription_option} ${
          selectedSubscriptionOption.type == option.type
            ? styles.is_selected
            : ""
        }`}
        onClick={this.selectSubscriptionOption}
      >
        <div className={styles.subscription_option_price}>
          {option.type == "flat_type" ? "KD" : ""} {option.value}{" "}
          {option.type == "flat_type" ? "" : "%"}
        </div>
        <div className={styles.subscription_option_title}>
          {option.type == "flat_type" ? "Flat Fee" : "Commission"}
        </div>
        <div className={styles.subscription_option_subtitle}>
          {option.type == "flat_type"
            ? "Ony have to pay once"
            : "On each product you sale"}
        </div>
      </DivColumn>
    );
  }
}
const mapStateToProps = state => {
  return {
    exhibitionReducer: state.exhibitionReducer
  };
};

const mapDispathToProps = dispatch => {
  return {
    setSelectedSubscriptionOption: bindActionCreators(
      setSelectedSubscriptionOption,
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(translatorHoc(SubscriptionOption));
