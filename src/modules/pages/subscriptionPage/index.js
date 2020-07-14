import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import NavHeader from "CommonComponents/navHeader";
import CapsuleButton from "CommonComponents/capsuleButton";
import styles from "./subscription.module.scss";
import SideNav from "CommonComponents/sideNav";
import navigatorHoc from "Hoc/navigatorHoc";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import {
  getPlanListAction,
  getActivePlan,
  getSubscriptionListAction,
  buyAdditionalPlanAction,
  activatePlanAction,
} from "Core/modules/subscription/subscriptionActions";
import ActiveSubscription from "CommonComponents/activeSubscriptionComponent";
import DataTableContainer from "CommonContainers/dataTableContainer";
import Button from "@material-ui/core/Button";
import memoize from "memoize-one";
import BuyPlanModal from "./buyAddtionalPlanModal";
import isEmpty from "lodash/isEmpty";
import translatorHoc from "Hoc/translatorHoc";

class SubscriptionPage extends Component {
  state = {
    showModal: false,
  };

  onClickBuyPlan = (planId) => {
    const { buyAdditionalPlanAction } = this.props;
    buyAdditionalPlanAction(planId).then(({ payload }) => {
      if (payload.code === 200 || payload.code === 201) {
        const {
          data: { payment_information },
        } = payload;

        window.location.href = payment_information.paymentURL;
      }
    });
  };

  onCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };

  onClickBuyAdditionalPlan = () => {
    this.setState({
      showModal: true,
    });
  };

  render() {
    const {
      subscriptionReducer: {
        subscriptionPlanList,
        activeSubscription,
        sellerSubscriptionList,
      },
      getPlanListAction,
      getActivePlan,
      getSubscriptionListAction,
      translate,
    } = this.props;
    const { showModal } = this.state;
    const columns = memoize(() => [
      {
        name: `${translate("subscription_page.table.id")}`,
        selector: "id",
        sortable: true,
      },
      {
        name: `${translate("subscription_page.table.plan_name")}`,
        selector: "name",
        sortable: true,
        grow: 2,
      },
      {
        name: `${translate("subscription_page.table.plan_description")}`,
        selector: "description",
        sortable: true,
        grow: 2,
      },
      {
        name: `${translate("subscription_page.table.no_of_products")}`,
        selector: "plan.no_of_products",
        sortable: true,
      },
      {
        name: `${translate("subscription_page.table.no_of_exhibitions")}`,
        selector: "plan.no_of_exhibitions",
        sortable: true,
      },
      {
        cell: (value) => {
          const {
            subscriptionReducer: { activeSubscription },
            activatePlanAction,
          } = this.props;
          if (value.plan.id === activeSubscription.plan.id) {
            return <span> Active</span>;
          } else {
            return (
              <Button
                variant="contained"
                color="primary"
                className={styles.custom_button}
                onClick={() => {
                  activatePlanAction(value.id);
                }}
              >
                Activate
              </Button>
            );
          }
        },
        button: true,
      },
    ]);
    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <div fillParent className={styles.subscription_page_container}>
          <NavHeader title={translate("subscription_page.title")}>
            <CapsuleButton onClick={() => this.onClickBuyAdditionalPlan()}>
              {translate("subscription_page.buy_additional_plan")}
            </CapsuleButton>
          </NavHeader>

          <DivColumn fillParent className={styles.content_container}>
            <DivColumn className={styles.inner_content_container}>
              <InitialPageLoader initialPageApi={getActivePlan}>
                <ActiveSubscription
                  subscription={activeSubscription.plan}
                  isSelected={false}
                />
              </InitialPageLoader>

              <DivColumn fillParent className={styles.additional_plans}>
                <DivColumn className={styles.additional_plans_title}>
                  {translate("subscription_page.plan")} :
                </DivColumn>
                <DivColumn
                  fillParent
                  className={styles.additional_plans_container}
                >
                  <InitialPageLoader initialPageApi={getSubscriptionListAction}>
                    {!isEmpty(activeSubscription) && (
                      <DivRow>
                        <DataTableContainer
                          data={sellerSubscriptionList}
                          title={translate(
                            "subscription_page.subscription_lost"
                          )}
                          columns={columns()}
                          searchable="id"
                        />
                      </DivRow>
                    )}
                  </InitialPageLoader>
                </DivColumn>
              </DivColumn>

              {/* <DivColumn fillParent className={styles.additional_plans}>
                <DivColumn className={styles.additional_plans_title}>
                  Add Additional Plans:
                </DivColumn>
                <DivColumn className={styles.additional_plans_container}>
                  <InitialPageLoader initialPageApi={getPlanListAction}>
                    <DivRow>
                      {map(subscriptionPlanList, (subscription, index) => {
                        if (
                          activeSubscription.id !== subscription.id &&
                          subscription.price !== 0
                        ) {
                          return (
                            <Subscription
                              subscription={subscription}
                              features={subscription.features}
                            />
                          );
                        }
                      })}
                    </DivRow>
                  </InitialPageLoader>
                </DivColumn>
              </DivColumn> */}

              <InitialPageLoader initialPageApi={getPlanListAction}>
                <BuyPlanModal
                  open={showModal}
                  onClose={this.onCloseModal}
                  onClickBuyPlan={this.onClickBuyPlan}
                  planList={subscriptionPlanList}
                  activeSubscription={activeSubscription}
                />
              </InitialPageLoader>
            </DivColumn>
          </DivColumn>
        </div>
      </SectionedContainer>
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
    getPlanListAction: bindActionCreators(getPlanListAction, dispatch),
    getActivePlan: bindActionCreators(getActivePlan, dispatch),
    getSubscriptionListAction: bindActionCreators(
      getSubscriptionListAction,
      dispatch
    ),
    buyAdditionalPlanAction: bindActionCreators(
      buyAdditionalPlanAction,
      dispatch
    ),
    activatePlanAction: bindActionCreators(activatePlanAction, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(translatorHoc(SubscriptionPage)));
