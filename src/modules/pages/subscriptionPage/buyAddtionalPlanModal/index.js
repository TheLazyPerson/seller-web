import React, { Component } from "react";
import DivColumn from "CommonComponents/divColumn";
import Modal from "@material-ui/core/Modal";
import styles from "./buy_plan.module.scss";
import DivRow from "CommonComponents/divRow";
import map from "lodash/map";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Subscription from "CommonComponents/subscriptionComponent";
import CapsuleButton from "CommonComponents/capsuleButton";
import { setSelectedSubscription } from "Core/modules/subscription/subscriptionActions";
import translatorHoc from "Hoc/translatorHoc";

class BuyPlanModal extends Component {
  render() {
    const {
      open,
      onClose,
      onClickBuyPlan,
      planList,
      translate,
      subscriptionReducer: { selectedSubscription },
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
                {translate("additional_plan.title")}
              </div>
              <CapsuleButton
                onClick={() => onClickBuyPlan(selectedSubscription.id)}
              >
                {translate("additional_plan.buy")}
              </CapsuleButton>
              {/* <SearchBarComponent /> */}
            </DivRow>

            <DivColumn fillParent className={styles.content_container}>
              <DivRow fillParent className={styles.item_container}>
                {map(planList, (subscription, index) => {
                  if (subscription.price !== 0) {
                    return (
                      <Subscription
                        subscription={subscription}
                        features={subscription.features}
                      />
                    );
                  }
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
)(translatorHoc(BuyPlanModal));
