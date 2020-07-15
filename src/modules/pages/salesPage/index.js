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
import translatorHoc from "Hoc/translatorHoc";

class SalesPage extends Component {
  render() {
    const {
      transactionReducer: { transactionList },
      getTransactionListAction,
      translate,
    } = this.props;
    const columns = memoize(() => [
      {
        name: `${translate("sales_list.table.id")}`,
        selector: "id",
        sortable: true,
      },
      {
        name: `${translate("sales_list.table.transaction_id")}`,
        selector: "transaction_id",
        sortable: true,
      },
      {
        name: `${translate("sales_list.table.comment")}`,
        selector: "comment",
        sortable: true,
        grow: 2,
      },
      {
        name: `${translate("sales_list.table.grand_total")}`,
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
            {translate("sales_list.table.view_button")}
          </Button>
        ),
        button: true,
      },
    ]);
    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <div fillParent className={styles.sales_page_container}>
          <NavHeader title={translate("sales_list.title")}></NavHeader>
          <InitialPageLoader initialPageApi={getTransactionListAction}>
            <DivColumn fillParent className={styles.content_container}>
              <DataTableContainer
                data={transactionList}
                title={translate("sales_list.title")}
                columns={columns()}
                searchable="id"
              />
            </DivColumn>
          </InitialPageLoader>
        </div>
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
)(translatorHoc(navigatorHoc(SalesPage)));
