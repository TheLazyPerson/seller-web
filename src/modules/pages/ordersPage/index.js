import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import map from "lodash/map";
import styles from "./orders.module.scss";
import SideNav from "CommonComponents/sideNav";
import navigatorHoc from "Hoc/navigatorHoc";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "@material-ui/core/Button";
import memoize from "memoize-one";
import DataTableContainer from "CommonContainers/dataTableContainer";
import { getOrderListAction } from "Core/modules/order/orderActions";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import isEmpty from "lodash/isEmpty";
import translatorHoc from "Hoc/translatorHoc";
import { formatUnixTimeStampToDateTime } from "Utils/formatHelper";

class OrdersPage extends Component {
  getListItem = (listItem) => {
    const {
      languageReducer: { languageCode },
    } = this.props;
    return (
      <DivColumn verticalCenter horizontalCenter className={styles.box}>
        <div className={styles.title}>
          {listItem.card_type === "price-card" ? "KD " : ""}
          {listItem.value}
        </div>
        <div className={styles.description}>{listItem.title[languageCode]}</div>
      </DivColumn>
    );
  };

  render() {
    const {
      orderReducer: { overview, orderList },
      getOrderListAction,
      isRTL,
      translate,
    } = this.props;
    const columns = memoize(() => [
      {
        name: `${translate("order_list.table.id")}`,
        selector: "id",
        sortable: true,
      },
      {
        name: `${translate("order_list.table.order_date")}`,
        //TODO: fix the date format
        selector: "created_at",
        sortable: true,
        cell: (value) => formatUnixTimeStampToDateTime(value.created_at),
      },
      {
        name: `${translate("order_list.table.grand_total")}`,
        selector: "grand_total",
        sortable: false,
      },
      {
        name: `${translate("order_list.table.total_items")}`,
        selector: "total_item_count",
        sortable: false,
      },
      {
        name: `${translate("order_list.table.status")}`,
        selector: "status_label",
        sortable: true,
        cell: (value) => translate("order_list.table." + value.status),
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
            {translate("order_list.table.view")}
          </Button>
        ),
        button: true,
      },
    ]);

    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <div
          fillParent
          className={` ${styles.orders_page_container} ${
            isRTL ? styles.rtl : ""
          }`}
        >
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
              columns={columns()}
              searchable="id"
            />
          </InitialPageLoader>
        </div>
      </SectionedContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orderReducer: state.orderReducer,
    languageReducer: state.languageReducer,
    isRTL: state.languageReducer.isRTL,
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
)(navigatorHoc(translatorHoc(OrdersPage)));
