import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import NavHeader from "CommonComponents/navHeader";
import CapsuleButton from "CommonComponents/capsuleButton";
import map from "lodash/map";
import styles from "./transaction_details.module.scss";
import SideNav from "CommonComponents/sideNav";
import navigatorHoc from "Hoc/navigatorHoc";
import { logoutAction } from "Core/modules/signin/signinActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DataTableContainer from "CommonContainers/dataTableContainer";
import DataTable from "react-data-table-component";
import {
  getTransactionDetailsAction,
  printTransactionInvoice,
} from "Core/modules/transaction/transactionActions";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import translatorHoc from "Hoc/translatorHoc";

class TransactionDetailsPage extends Component {
  state = {
    data: [
      {
        sku: "sku",
        name: "name",
        exhibition_name: "exhibition_name",
        status: "status",
        price: "price",
        quantity: "quantity",
        commission: "commission",
        grand_total: "grand_total",
      },
      {
        sku: "sku",
        name: "name",
        exhibition_name: "exhibition_name",
        status: "status",
        price: "price",
        quantity: "quantity",
        commission: "commission",
        grand_total: "grand_total",
      },
      {
        commission: <div>aslkdjalksdj</div>,
        grand_total: <div>aslkdjaasdaslksdj</div>,
      },
    ],
  };

  onBackPress = () => {
    const { pop } = this.props;
    pop();
  };
  render() {
    const { data } = this.state;
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

    const {
      transactionReducer: { transaction },
      match: { params },
      getTransactionDetailsAction,
      translate,
    } = this.props;

    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <NavHeader
          title={translate("transaction_details_page.title")}
          onBackClick={this.onBackPress}
        >
          {/* <DivRow>
            <CapsuleButton>Print Invoice</CapsuleButton>
          </DivRow> */}
        </NavHeader>
        <InitialPageLoader
          initialPageApi={() =>
            getTransactionDetailsAction(params.transactionId)
          }
        >
          <DivColumn fillParent className={styles.order_page_container}>
            <DivColumn className={styles.order_container}>
              <div className={styles.order_id}>
                {translate("transaction_details_page.transaction_id")} :{" "}
                <b>{transaction.transaction_id}</b>
              </div>
              <div className={styles.placed_on}>
                {translate("transaction_details_page.created_on")} :{" "}
                {transaction.created_on}{" "}
              </div>
              {/* <div className={styles.status}>SUCCESSFUL</div> */}
            </DivColumn>

            <div className={styles.header}>
              {" "}
              {translate("transaction_details_page.payment_details")}
            </div>

            <DivColumn className={styles.normal_container}>
              <DivRow className={styles.title}>
                {translate("transaction_details_page.payment_method")} :{" "}
                <div className={styles.value}>{transaction.payment_method}</div>
              </DivRow>
              <DivRow className={styles.title}>
                {translate("transaction_details_page.total")} :{" "}
                <div className={styles.value}>{transaction.payout_amount}</div>
              </DivRow>
              <DivRow className={styles.title}>
                {translate("transaction_details_page.comment")} :{" "}
                <div className={styles.value}>{transaction.comment}</div>
              </DivRow>
            </DivColumn>

            <div className={styles.header}>
              {" "}
              {translate("transaction_details_page.products_order")}
            </div>

            {transaction.order && (
              <DataTable
                columns={columns}
                customStyles={customStyles}
                data={transaction.order.items}
                style={{ minHeight: 200 }}
                noHeader={true}
              />
            )}
          </DivColumn>
        </InitialPageLoader>
      </SectionedContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    transactionReducer: state.transactionReducer,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    getTransactionDetailsAction: bindActionCreators(
      getTransactionDetailsAction,
      dispatch
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(translatorHoc(TransactionDetailsPage)));
