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
        selector: "exhibition_name",
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
        selector: "quantity",
        style: rowStyle,
      },
      {
        name: "COMMISSION",
        selector: "commission",
        style: rowStyle,
      },
      {
        name: "GRAND TOTAL",
        selector: "grand_total",
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
        <NavHeader title="Trasaction Detail">
          <DivRow>
            <CapsuleButton>Print Invoice</CapsuleButton>
          </DivRow>
        </NavHeader>
        <DivColumn fillParent className={styles.order_page_container}>
          <DivColumn className={styles.order_container}>
            <div className={styles.order_id}>
              TRANSACTION ID: <b>123123</b>
            </div>
            <div className={styles.placed_on}>Created On: </div>
            <div className={styles.status}>SUCCESSFUL</div>
          </DivColumn>

          <div className={styles.header}>PAYMENT DETAILS</div>

          <DivColumn className={styles.normal_container}>
            <DivRow className={styles.title}>
              Payment Method: <div className={styles.value}>value</div>
            </DivRow>
            <DivRow className={styles.title}>
              Total: <div className={styles.value}>value</div>
            </DivRow>
            <DivRow className={styles.title}>
              Comment: <div className={styles.value}>value</div>
            </DivRow>
          </DivColumn>

          <div className={styles.header}>PRODUCTS ORDERED</div>

          <DataTable
            columns={columns}
            customStyles={customStyles}
            data={data}
            style={{ minHeight: 200 }}
            noHeader={true}
          />
        </DivColumn>
      </SectionedContainer>
    );
  }
}

const mapDispathToProps = (dispatch) => {
  return {
    logoutAction: bindActionCreators(logoutAction, dispatch),
  };
};

export default connect(
  null,
  mapDispathToProps
)(navigatorHoc(TransactionDetailsPage));
