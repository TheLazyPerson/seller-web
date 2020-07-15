import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import NavHeader from "CommonComponents/navHeader";
import styles from "./transaction_details.module.scss";
import SideNav from "CommonComponents/sideNav";
import navigatorHoc from "Hoc/navigatorHoc";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DataTable from "react-data-table-component";
import { getTransactionDetailsAction } from "Core/modules/transaction/transactionActions";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import translatorHoc from "Hoc/translatorHoc";
import { formatUnixTimeStampToDateTime } from "Utils/formatHelper";

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
    const rowStyle = {
      fontSize: 12,
      color: "#19202c",
    };

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

    const {
      transactionReducer: { transaction },
      match: { params },
      getTransactionDetailsAction,
      translate,
      isRTL,
      languageReducer: { languageCode },
    } = this.props;

    const columns = [
      {
        name: `${translate("transaction_details_page.table.sku")}`,
        selector: "sku",
        style: rowStyle,
      },
      {
        name: `${translate("transaction_details_page.table.name")}`,
        selector: "name",
        style: rowStyle,
        cell: (value) => value.product.translations[languageCode].name,
      },
      {
        name: `${translate("transaction_details_page.table.exhibition_name")}`,
        selector: "exhibition.title",
        grow: 2,
        style: rowStyle,
        cell: (value) => value.exhibition.translations[languageCode].title,
      },
      {
        name: `${translate("transaction_details_page.table.price")}`,
        selector: "price",
        style: rowStyle,
      },
      {
        name: `${translate("transaction_details_page.table.quantity")}`,
        selector: "qty_ordered",
        style: rowStyle,
      },
      {
        name: `${translate("transaction_details_page.table.commission")}`,
        selector: "commission",
        style: rowStyle,
      },
      {
        name: `${translate("transaction_details_page.table.grand_total")}`,
        selector: "formated_base_total",
        style: rowStyle,
      },
    ];

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
          <DivColumn
            fillParent
            className={` ${styles.order_page_container} ${
              isRTL ? styles.rtl : ""
            }`}
          >
            <DivColumn className={styles.order_container}>
              <div className={styles.order_id}>
                {isRTL ? ":" : ""}
                {translate("transaction_details_page.transaction_id")}
                {!isRTL ? ":" : ""}
                <b>{transaction.transaction_id}</b>
              </div>
              <div className={styles.placed_on}>
                {isRTL ? ":" : ""}
                {translate("transaction_details_page.created_on")}
                {!isRTL ? ":" : ""}
                {formatUnixTimeStampToDateTime(transaction.created_on)}
              </div>
              {/* <div className={styles.status}>SUCCESSFUL</div> */}
            </DivColumn>

            <div className={styles.header}>
              {" "}
              {translate("transaction_details_page.payment_details")}
            </div>

            <DivColumn className={styles.normal_container}>
              <DivRow className={styles.title}>
                {isRTL ? ":" : ""}
                {translate("transaction_details_page.payment_method")}
                {!isRTL ? ":" : ""}
                <div className={styles.value}>{transaction.payment_method}</div>
              </DivRow>
              <DivRow className={styles.title}>
                {isRTL ? ":" : ""}
                {translate("transaction_details_page.total")}
                {!isRTL ? ":" : ""}
                <div className={styles.value}>{transaction.payout_amount}</div>
              </DivRow>
              <DivRow className={styles.title}>
                {isRTL ? ":" : ""}
                {translate("transaction_details_page.comment")}
                {!isRTL ? ":" : ""}
                <div className={styles.value}>{transaction.comment}</div>
              </DivRow>
            </DivColumn>

            <div className={styles.header}>
              {" "}
              {translate("transaction_details_page.products_order")}
            </div>
            <div className={styles.datatable_container}>
              {transaction.order && (
                <DataTable
                  columns={columns}
                  customStyles={customStyles}
                  data={transaction.order.items}
                  style={{ minHeight: 200 }}
                  noHeader={true}
                  direction={isRTL ? "rtl" : "ltr"}
                />
              )}
            </div>
          </DivColumn>
        </InitialPageLoader>
      </SectionedContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    transactionReducer: state.transactionReducer,
    isRTL: state.languageReducer.isRTL,
    languageReducer: state.languageReducer,
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
