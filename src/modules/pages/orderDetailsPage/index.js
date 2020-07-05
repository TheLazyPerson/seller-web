import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import NavHeader from "CommonComponents/navHeader";
import CapsuleButton from "CommonComponents/capsuleButton";
import isEmpty from "lodash/isEmpty";
import styles from "./order_details.module.scss";
import SideNav from "CommonComponents/sideNav";
import navigatorHoc from "Hoc/navigatorHoc";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DataTable from "react-data-table-component";
import {
  getOrderDetailsAction,
  printOrderInvoice,
} from "Core/modules/order/orderActions";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import HorizontalBorder from "CommonComponents/horizontalBorder";
import { showSuccessFlashMessage } from "Redux/actions/flashMessageActions";
import { formatUnixTimeStampToDateTime } from "Utils/formatHelper";
import translatorHoc from "Hoc/translatorHoc";

class OrdersDetailsPage extends Component {
  onBackPress = () => {
    const { pop } = this.props;
    pop();
  };
  onCreatePickupRequest = () => {
    const {
      navigateTo,
      match: { params },
    } = this.props;
    navigateTo("order-shipping", { orderId: params.orderId });
  };

  viewPickupRequest = () => {
    const {
      navigateTo,
      match: { params },
    } = this.props;
    navigateTo("order-shipping-details", { orderId: params.orderId });
  };

  onClickPrintInvoice = () => {
    const {
      printOrderInvoice,
      match: { params },
    } = this.props;
    printOrderInvoice(params.orderId).then(({ payload }) => {
      if (payload.code === 200 || payload.code === 201) {
        window.open(payload.data.invoice.url);
        showSuccessFlashMessage("Request Processed successfuly");
      }
    });
  };

  render() {
    const {
      orderReducer: { order },
      match: { params },
      getOrderDetailsAction,
      translate,
      isRTL,
    } = this.props;
    const rowStyle = {
      fontSize: 12,
      color: "#19202c",
    };
    const columns = [
      {
        name: "ITEM CODE",
        selector: "sku",
        style: rowStyle,
      },
      {
        name: "NAME",
        selector: "name",
        style: rowStyle,
      },
      {
        name: "EXHIBITION NAME",
        selector: "exhibition.title",
        grow: 2,
        style: rowStyle,
      },
      {
        name: "PRICE",
        selector: "price",
        style: rowStyle,
      },
      {
        name: "QUANTITY",
        selector: "qty_ordered",
        style: rowStyle,
      },
      {
        name: "COMMISSION",
        selector: "commission",
        style: rowStyle,
      },
      {
        name: "GRAND TOTAL",
        selector: "formated_base_total",
        style: rowStyle,
      },
    ];

    const customStyles = {
      headRow: {
        style: {
          borderTop: "1px solid #ededed",
          borderBottom: "1px solid #ededed",
          backgroundColor: "#f4f7fa",
        },
      },
      headCells: {
        style: {
          fontSize: 12,
          fontWeight: "bold",
          color: "#7c858e",
        },
      },
    };

    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <NavHeader
          title={translate("order_details.title")}
          onBackClick={this.onBackPress}
        >
          <DivRow className={styles.capsul_button}>
            {/* <SecondaryCapsuleButton className={styles.cancel_button}>
              Cancel Order
            </SecondaryCapsuleButton> */}
            <CapsuleButton
              onClick={() => this.onClickPrintInvoice()}
              className={styles.print_invoice_button}
            >
              {translate("order_details.print_invoice")}
            </CapsuleButton>
            {!isEmpty(order.status) && order.status === "processing" && (
              <CapsuleButton onClick={() => this.onCreatePickupRequest()}>
                {translate("order_details.request")}
              </CapsuleButton>
            )}
            {!isEmpty(order.status) && order.status === "pickup_requested" && (
              <CapsuleButton onClick={() => this.viewPickupRequest()}>
                {translate("order_details.view_request")}
              </CapsuleButton>
            )}
          </DivRow>
        </NavHeader>
        <InitialPageLoader
          initialPageApi={() => getOrderDetailsAction(params.orderId)}
        >
          <DivColumn
            fillParent
            className={` ${styles.order_page_container} ${
              isRTL ? styles.rtl : ""
            }`}
          >
            <DivColumn className={styles.order_container}>
              <div className={styles.order_id}>
                {translate("order_details.order_id")} : <b>{order.id}</b>
              </div>
              <div className={styles.placed_on}>
                {translate("order_details.places_on")} :{" "}
                {formatUnixTimeStampToDateTime(order.created_at)}
              </div>
              <div className={styles.status}>{order.status_label}</div>
            </DivColumn>

            <div className={styles.header}>
              {translate("order_details.customer_details")}{" "}
            </div>

            <DivColumn className={styles.normal_container}>
              <DivRow className={styles.title}>
                {translate("order_details.name")} :{" "}
                <div className={styles.value}>
                  {order.customer_first_name} {order.customer_last_name}
                </div>
              </DivRow>
              <DivRow className={styles.title}>
                {translate("order_details.name")}:{" "}
                <div className={styles.value}>{order.customer_email}</div>
              </DivRow>
            </DivColumn>

            <div className={styles.header}>
              {translate("order_details.product_list")}
            </div>
            <div>
              <DataTable
                columns={columns}
                customStyles={customStyles}
                data={order.items}
                style={{ minHeight: 200 }}
                noHeader={true}
                direction={isRTL ? "rtl" : "ltr"}
              />
            </div>
            <HorizontalBorder />
            <DivRow className={styles.address_container}>
              <DivColumn className={styles.address_item_container}>
                <div className={styles.title}>
                  {translate("order_details.shipping_address")}{" "}
                </div>
                <div className={styles.description}>
                  {!isEmpty(order.shipping_address) && (
                    <span>
                      {order.shipping_address.area},{" "}
                      {order.shipping_address.block_number},{" "}
                      {order.shipping_address.house_number},{" "}
                      {order.shipping_address.street_number},{" "}
                      {order.shipping_address.avenue} ,{" "}
                      {order.shipping_address.landmark}-{" "}
                      {order.shipping_address.city}
                    </span>
                  )}
                </div>
              </DivColumn>

              <DivColumn className={styles.address_item_container}>
                <div className={styles.title}>
                  {translate("order_details.billing_address")}
                </div>
                <div className={styles.description}>
                  {!isEmpty(order.billing_address) && (
                    <span>
                      {order.shipping_address.area},{" "}
                      {order.shipping_address.block_number},{" "}
                      {order.shipping_address.house_number},{" "}
                      {order.shipping_address.street_number},{" "}
                      {order.shipping_address.avenue} ,{" "}
                      {order.shipping_address.landmark}-{" "}
                      {order.shipping_address.city}
                    </span>
                  )}
                </div>
              </DivColumn>

              <DivColumn className={styles.address_item_container}>
                <div className={styles.title}>
                  {translate("order_details.shipping_methods")}
                </div>
                <div className={styles.description}>{order.shipping_title}</div>
              </DivColumn>

              <DivColumn className={styles.address_item_container}>
                <div className={styles.title}>
                  {translate("order_details.payment_method")}
                </div>
                <div className={styles.description}>{order.payment_title}</div>
              </DivColumn>
            </DivRow>
          </DivColumn>
        </InitialPageLoader>
      </SectionedContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orderReducer: state.orderReducer,
    isRTL: state.languageReducer.isRTL,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    getOrderDetailsAction: bindActionCreators(getOrderDetailsAction, dispatch),
    printOrderInvoice: bindActionCreators(printOrderInvoice, dispatch),
    showSuccessFlashMessage: bindActionCreators(
      showSuccessFlashMessage,
      dispatch
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(translatorHoc(OrdersDetailsPage)));
