import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import NavHeader from "CommonComponents/navHeader";
import CapsuleButton from "CommonComponents/capsuleButton";
import styles from "./main_orders_shipping.module.scss";
import SideNav from "CommonComponents/sideNav";
import navigatorHoc from "Hoc/navigatorHoc";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DataTable from "react-data-table-component";
import { showSuccessFlashMessage } from "Redux/actions/flashMessageActions";

import { getOrderDetailsAction } from "Core/modules/order/orderActions";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import HorizontalBorder from "CommonComponents/horizontalBorder";
import { Form, Field } from "react-final-form";
import InputTextComponent from "CommonComponents/InputTextComponent";
import { isEmptyValidator } from "Utils/validators";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import isEmpty from "lodash/isEmpty";
import { formatUnixTimeStampToDateTime } from "Utils/formatHelper";
import translatorHoc from "Hoc/translatorHoc";

class MainOrdersShippingPage extends Component {
  onBackPress = () => {
    const { pop } = this.props;
    pop();
  };
  render() {
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
        name: "QUANTITY",
        selector: "qty_ordered",
        style: rowStyle,
      },
      {
        name: "QUANTITY TO SHIP",
        selector: "qty_ordered",
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
          color: "#202124",
          fontSize: 12,
          fontWeight: "bold",
          color: "#7c858e",
        },
      },
    };
    const {
      orderReducer: { order },
      match: { params },
      getOrderDetailsAction,
      translate,
      isRTL,
    } = this.props;

    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <NavHeader
          title={translate("pickup_request_details.title")}
          onBackClick={this.onBackPress}
        ></NavHeader>
        <InitialPageLoader
          initialPageApi={() => getOrderDetailsAction(params.orderId)}
        >
          <DivColumn
            className={` ${styles.order_page_container} ${
              isRTL ? styles.rtl : ""
            }`}
          >
            <DivColumn className={styles.order_container}>
              <div className={styles.order_id}>
                {translate("pickup_request_details.order_id")}
                <b>{order.id}</b>
              </div>
              <div className={styles.placed_on}>
                {translate("pickup_request_details.places_on")}
                {formatUnixTimeStampToDateTime(order.created_at)}
              </div>
              <div className={styles.status}>{order.status_label}</div>
            </DivColumn>

            <div className={styles.header}>
              {translate("pickup_request_details.pickup_information")}
            </div>
            <DivColumn className={styles.normal_container}>
              <DivRow className={styles.title}>
                {translate("pickup_request_details.req_pickup_on")}:{" "}
                <div className={styles.value}>
                  {!isEmpty(order.pickup_request)
                    ? order.pickup_request.requested_pickup_on
                    : ""}
                </div>
              </DivRow>
            </DivColumn>

            <div className={styles.header}>
              {translate("pickup_request_details.customer_details")}
            </div>
            <DivColumn className={styles.normal_container}>
              <DivRow className={styles.title}>
                {translate("pickup_request_details.name")}:{" "}
                <div className={styles.value}>
                  {order.customer_first_name} {order.customer_last_name}
                </div>
              </DivRow>
              <DivRow className={styles.title}>
                {translate("pickup_request_details.email")}:{" "}
                <div className={styles.value}>{order.customer_email}</div>
              </DivRow>
            </DivColumn>
            <div className={styles.header}>
              {" "}
              {translate("pickup_request_details.products_order")}
            </div>
            <DataTable
              columns={columns}
              customStyles={customStyles}
              data={order.items}
              style={{ minHeight: 200 }}
              noHeader={true}
            />
            <HorizontalBorder />
            <DivRow className={styles.address_container}>
              <DivColumn className={styles.address_item_container}>
                <div className={styles.title}>
                  {translate("pickup_request_details.shipping_address")}
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
                  {translate("pickup_request_details.billing_address")}
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
                  {translate("pickup_request_details.shipping_methods")}
                </div>
                <div className={styles.description}>{order.shipping_title}</div>
              </DivColumn>

              <DivColumn className={styles.address_item_container}>
                <div className={styles.title}>
                  {translate("pickup_request_details.payment_method")}
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
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(translatorHoc(MainOrdersShippingPage)));
