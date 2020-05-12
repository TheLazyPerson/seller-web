import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import NavHeader from "CommonComponents/navHeader";
import CapsuleButton from "CommonComponents/capsuleButton";
import isEmpty from "lodash/isEmpty";
import styles from "./main_orders.module.scss";
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

class MainOrdersDetailsPage extends Component {
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
        name: "SKU",
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
        selector: "exhibition_name",
        grow: 2,
        style: rowStyle,
      },
      {
        name: "STATUS",
        selector: "status",
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
    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <NavHeader
          title="Order Detail"
          onBackClick={this.onBackPress}
        ></NavHeader>

        <DivColumn className={styles.order_page_container}>
          <DivColumn className={styles.order_container}>
            <div className={styles.order_id}>
              Order ID: <b>123</b>
            </div>
            <div className={styles.placed_on}>Placed On: 16 OCT 2019</div>
            <div className={styles.status}>Delivered</div>
          </DivColumn>
        </DivColumn>
        <div className={styles.header}>CUSTOMER DETAILS</div>

        <DivColumn className={styles.normal_container}>
          <DivRow className={styles.title}>
            Name:
            <div className={styles.value}>Omar Lastname</div>
          </DivRow>
          <DivRow className={styles.title}>
            Email:
            <div className={styles.value}>omarlastname@mail.com</div>
          </DivRow>
        </DivColumn>

        <div className={styles.header}>PRODUCT LIST</div>

        <DataTable
          columns={columns}
          customStyles={customStyles}
          data=""
          style={{ minHeight: 200 }}
        />
        <div className={styles.header}>PRICING INFORMATION</div>

        <DivColumn className={styles.normal_container}>
          <DivRow className={styles.title}>
            Subtotal:
            <div className={styles.value}>KD 273</div>
          </DivRow>
          <DivRow className={styles.title}>
            Discount:
            <div className={styles.value}>KD 30</div>
          </DivRow>
          <DivRow className={styles.title}>
            Item Discount
            <div className={styles.value}>KD 30</div>
          </DivRow>
          <DivRow className={styles.title}>
            Total:
            <div className={styles.value}>KD 333</div>
          </DivRow>
        </DivColumn>

        <HorizontalBorder />
        <DivRow className={styles.address_container}>
          <DivColumn className={styles.address_item_container}>
            <div className={styles.title}>SHIPPING ADDRESS</div>
            <div className={styles.description}>
              <span>
                Building 43B 4th Floor, Suite 402 Street Number 3 P.O. Box 593
                Kuwait Safat 13006
              </span>
            </div>
          </DivColumn>

          <DivColumn className={styles.address_item_container}>
            <div className={styles.title}>BILLING ADDRESS</div>
            <div className={styles.description}>
              <span>
                Building 43B 4th Floor, Suite 402 Street Number 3 P.O. Box 593
                Kuwait Safat 13006
              </span>
            </div>
          </DivColumn>

          <HorizontalBorder />
          <DivColumn className={styles.address_item_container}>
            <div className={styles.title}>SHIPPING METHOD</div>
            <div className={styles.description}>Flat Rate - Flat Rate</div>
          </DivColumn>

          <DivColumn className={styles.address_item_container}>
            <div className={styles.title}>PAYMENT METHOD</div>
            <div className={styles.description}>Cash On Delivery</div>
          </DivColumn>
        </DivRow>
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
)(navigatorHoc(MainOrdersDetailsPage));
