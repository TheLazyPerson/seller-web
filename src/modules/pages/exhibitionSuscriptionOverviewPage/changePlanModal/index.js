import React, { Component } from "react";
import DivColumn from "CommonComponents/divColumn";
import Modal from "@material-ui/core/Modal";
import styles from "./change_plan.module.scss";
import DivRow from "CommonComponents/divRow";
import map from "lodash/map";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import UsageSubscriptionComponent from "CommonComponents/usageSubscriptionComponent";
import { setSelectedSubscription } from "Core/modules/subscription/subscriptionActions";
import translatorHoc from "Hoc/translatorHoc";

class ChangePlanModal extends Component {
  render() {
    const {
      open,
      onClose,
      onClickChangePlan,
      sellerSubscriptionList,
      translate,
    } = this.props;
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={onClose}
      >
        <DivColumn
          style={{ width: "100%", height: "100%" }}
          verticalCenter
          horizontalCenter
          onClick={onClose}
        >
          <DivColumn
            className={styles.modal_container}
            onClick={(event) => event.stopPropagation()}
          >
            <DivRow verticalCenter className={styles.header_container}>
              <div className={styles.header_title}>
                {translate("change_plan.title")}
              </div>
            </DivRow>

            <DivColumn fillParent className={styles.content_container}>
              <DivRow fillParent className={styles.item_container}>
                {map(sellerSubscriptionList, (subscription, index) => {
                  return (
                    <UsageSubscriptionComponent
                      onClickChangePlan={onClickChangePlan}
                      subscription={subscription}
                    />
                  );
                })}
              </DivRow>
            </DivColumn>
          </DivColumn>
        </DivColumn>
      </Modal>
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
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(translatorHoc(ChangePlanModal));
