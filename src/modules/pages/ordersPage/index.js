import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import NavHeader from "CommonComponents/navHeader";
import CapsuleButton from "CommonComponents/capsuleButton";
import map from "lodash/map";
import styles from "./orders.module.scss";
import SideNav from "CommonComponents/sideNav";
import navigatorHoc from "Hoc/navigatorHoc";
import { logoutAction } from "Core/modules/signin/signinActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CookieService } from "Utils/cookieService";
import { USER_DATA_COOKIE } from "Constants/cookieConstants";
import DataTable, { createTheme } from "react-data-table-component";
import memoize from "memoize-one";
import DataTableContainer from "CommonContainers/dataTableContainer";
import { getOrderListAction } from "Core/modules/order/orderActions";
import InitialPageLoader from "CommonContainers/initialPageLoader";
const columns = memoize(() => [
  {
    name: "ID",
    selector: "id",
    sortable: true
  },
  {
    name: "ORDER DATE",
    selector: "created_at",
    sortable: true
  },
  {
    name: "EXHIBITION NAME",
    selector: "exhibition_name",
    sortable: true,
    grow: 2
  },
  {
    name: "GRAND TOTAL",
    selector: "grand_total",
    sortable: true
  },
  {
    name: "TOTAL ITEMS",
    selector: "total_item_count",
    sortable: true
  },
  {
    name: "STATUS",
    selector: "status",
    sortable: true
  }
]);

class OrdersPage extends Component {
  render() {
    const {
      orderReducer: { orderList },
      getOrderListAction
    } = this.props;

    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <DivColumn fillParent className={styles.orders_page_container}>
          <DivRow className={styles.box_container}>
            <DivColumn verticalCenter horizontalCenter className={styles.box}>
              <div className={styles.title}>20</div>
              <div className={styles.description}>NEW ORDERS</div>
            </DivColumn>

            <DivColumn verticalCenter horizontalCenter className={styles.box}>
              <div className={styles.title}>20</div>
              <div className={styles.description}>INCOMPLETE ORDERS</div>
            </DivColumn>

            <DivColumn verticalCenter horizontalCenter className={styles.box}>
              <div className={styles.title}>200</div>
              <div className={styles.description}>AVERAGE ORDER SALE</div>
            </DivColumn>

            <DivColumn verticalCenter horizontalCenter className={styles.box}>
              <div className={styles.title}>30</div>
              <div className={styles.description}>TOTAL ORDERS</div>
            </DivColumn>
          </DivRow>
          <InitialPageLoader initialPageApi={getOrderListAction}>
            <DataTableContainer
              data={orderList}
              title="Orders"
              columns={columns()}
            />
          </InitialPageLoader>
        </DivColumn>
      </SectionedContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    orderReducer: state.orderReducer
  };
};

const mapDispathToProps = dispatch => {
  return {
    getOrderListAction: bindActionCreators(getOrderListAction, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(OrdersPage));
