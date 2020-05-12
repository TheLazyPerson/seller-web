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
import Button from "@material-ui/core/Button";
import memoize from "memoize-one";
import DataTableContainer from "CommonContainers/dataTableContainer";
import { getOrderListAction } from "Core/modules/order/orderActions";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import isEmpty from "lodash/isEmpty";

class OrdersPage extends Component {
  columns = memoize(() => [
    {
      name: "ID",
      selector: "id",
      sortable: true,
    },
    {
      name: "ORDER DATE",
      //TODO: fix the date format
      selector: "created_at",
      sortable: true,
    },
    {
      name: "GRAND TOTAL",
      selector: "grand_total",
      sortable: false,
    },
    {
      name: "TOTAL ITEMS",
      selector: "total_item_count",
      sortable: false,
    },
    {
      name: "STATUS",
      selector: "status_label",
      sortable: true,
    },
    {
      cell: (value) => (
        <Button
          variant="contained"
          color="primary"
          className={styles.custom_button}
          onClick={() => {
            const { navigateTo } = this.props;
            navigateTo("order-details", { orderId: value.id });
          }}
        >
          View
        </Button>
      ),
      button: true,
    },
  ]);

  getListItem = (listItem) => {
    return (
      <DivColumn verticalCenter horizontalCenter className={styles.box}>
        <div className={styles.title}>
          {listItem.card_type == "price-card" ? "KD " : ""}
          {listItem.value}
        </div>
        <div className={styles.description}>{listItem.title}</div>
      </DivColumn>
    );
  };

  render() {
    const {
      orderReducer: { overview, orderList },
      getOrderListAction,
    } = this.props;

    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <DivColumn fillParent className={styles.orders_page_container}>
          <DivRow className={styles.box_container}>
            {map(overview, (item) => {
              return this.getListItem(item);
            })}
          </DivRow>
          <InitialPageLoader
            initialPageApi={getOrderListAction}
            isEmpty={isEmpty(orderList)}
          >
            <DataTableContainer
              data={orderList}
              title="Orders"
              columns={this.columns()}
            />
          </InitialPageLoader>
        </DivColumn>
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
    getOrderListAction: bindActionCreators(getOrderListAction, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(OrdersPage));
