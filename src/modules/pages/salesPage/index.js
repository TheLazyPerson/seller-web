import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import NavHeader from "CommonComponents/navHeader";
import styles from "./sales.module.scss";
import SideNav from "CommonComponents/sideNav";
import navigatorHoc from "Hoc/navigatorHoc";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import memoize from "memoize-one";
import DataTableContainer from "CommonContainers/dataTableContainer";
import { getTransactionListAction } from "Core/modules/transaction/transactionActions";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import Button from "@material-ui/core/Button";

class SalesPage extends Component {
  columns = memoize(() => [
    {
      name: "ID",
      selector: "id",
      sortable: true,
    },
    {
      name: "TRANSACTION ID",
      selector: "transaction_id",
      sortable: true,
    },
    {
      name: "COMMENT",
      selector: "comment",
      sortable: true,
      grow: 2,
    },
    {
      name: "GRAND TOTAL",
      selector: "order.grand_total",
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
            navigateTo("sales-details", { transactionId: value.id });
          }}
        >
          View
        </Button>
      ),
      button: true,
    },
  ]);
  render() {
    const {
      transactionReducer: { transactionList },
      getTransactionListAction,
    } = this.props;
    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <DivColumn fillParent className={styles.sales_page_container}>
          <NavHeader title="Transactions"></NavHeader>
          <InitialPageLoader initialPageApi={getTransactionListAction}>
            <DivColumn fillParent className={styles.content_container}>
              <DataTableContainer
                data={transactionList}
                title="Transactions"
                columns={this.columns()}
              />
            </DivColumn>
          </InitialPageLoader>
        </DivColumn>
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
    getTransactionListAction: bindActionCreators(
      getTransactionListAction,
      dispatch
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(SalesPage));
