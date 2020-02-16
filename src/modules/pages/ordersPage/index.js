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
const columns = memoize(() => [
  {
    name: "ID",
    selector: "id",
    sortable: true
  },
  {
    name: "ORDER DATE",
    selector: "order_date",
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
    selector: "total_items",
    sortable: true
  },
  {
    name: "STATUS",
    selector: "status",
    sortable: true
  }
]);

class OrdersPage extends Component {
  state = {
    data: [
      {
        id: 20,
        order_date: "16 Nov 2020",
        exhibtion_name: "Sample Name",
        grand_total: "KD 76 ",
        total_items: "7",
        status: "Pending"
      },
      {
        id: 20,
        order_date: "16 Nov 2020",
        exhibtion_name: "Sample Name",
        grand_total: "KD 76 ",
        total_items: "7",
        status: "Pending"
      }
    ]
  };

  render() {
    const { data } = this.state;

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

          <DataTableContainer data={data} columns={columns()} />
        </DivColumn>
      </SectionedContainer>
    );
  }
}

const mapDispathToProps = dispatch => {
  return {
    logoutAction: bindActionCreators(logoutAction, dispatch)
  };
};

export default connect(null, mapDispathToProps)(navigatorHoc(OrdersPage));
