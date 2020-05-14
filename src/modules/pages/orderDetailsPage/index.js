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
import { logoutAction } from "Core/modules/signin/signinActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DataTableContainer from "CommonContainers/dataTableContainer";
import DataTable from "react-data-table-component";
import { getOrderDetailsAction } from "Core/modules/order/orderActions";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import HorizontalBorder from "CommonComponents/horizontalBorder";
import SecondaryCapsuleButton from "CommonComponents/secondaryCapsuleButton";

class OrdersDetailsPage extends Component {
  onBackPress = () => {
    const { pop } = this.props;
    pop();
  };
  render() {
    const {
      orderReducer: { order },
      match: { params },
      getOrderDetailsAction,
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
          color: "#202124",
          fontSize: 12,
          fontWeight: "bold",
          color: "#7c858e",
        },
      },
    };
    const { shipping_address, billing_address } = order;
    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <NavHeader title="Order Detail" onBackClick={this.onBackPress}>
          <DivRow>
            <SecondaryCapsuleButton className={styles.cancel_button}>
              Cancel Order
            </SecondaryCapsuleButton>
            <CapsuleButton className={styles.print_invoice_button}>
              Print Invoice
            </CapsuleButton>
            <CapsuleButton>Ship Order</CapsuleButton>
          </DivRow>
        </NavHeader>
        <InitialPageLoader
          initialPageApi={() => getOrderDetailsAction(params.orderId)}
        >
          <DivColumn fillParent className={styles.order_page_container}>
            <DivColumn className={styles.order_container}>
              <div className={styles.order_id}>
                Order ID: <b>{order.id}</b>
              </div>
              <div className={styles.placed_on}>
                Placed On: {order.created_at}
              </div>
              <div className={styles.status}>{order.status_label}</div>
            </DivColumn>

            <div className={styles.header}>CUSTOMER DETAILS</div>

            <DivColumn className={styles.normal_container}>
              <DivRow className={styles.title}>
                Name:{" "}
                <div className={styles.value}>
                  {order.customer_first_name} {order.customer_last_name}
                </div>
              </DivRow>
              <DivRow className={styles.title}>
                Email:{" "}
                <div className={styles.value}>{order.customer_email}</div>
              </DivRow>
            </DivColumn>

            <div className={styles.header}>PRODUCT LIST</div>

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
                <div className={styles.title}>SHIPPING ADDRESS</div>
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
                <div className={styles.title}>BILLING ADDRESS</div>
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
                <div className={styles.title}>SHIPPING METHOD</div>
                <div className={styles.description}>{order.shipping_title}</div>
              </DivColumn>

              <DivColumn className={styles.address_item_container}>
                <div className={styles.title}>PAYMENT METHOD</div>
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
)(navigatorHoc(OrdersDetailsPage));
