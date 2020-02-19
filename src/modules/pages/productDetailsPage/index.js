import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import NavHeader from "CommonComponents/navHeader";
import CapsuleButton from "CommonComponents/capsuleButton";
import isEmpty from "lodash/isEmpty";
import styles from "./product_details.module.scss";
import SideNav from "CommonComponents/sideNav";
import navigatorHoc from "Hoc/navigatorHoc";
import { logoutAction } from "Core/modules/signin/signinActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DataTableContainer from "CommonContainers/dataTableContainer";
import DataTable from "react-data-table-component";
import { getProductDetailsAction } from "Core/modules/product/productActions";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import HorizontalBorder from "CommonComponents/horizontalBorder";
import SecondaryCapsuleButton from "CommonComponents/secondaryCapsuleButton";

class ProductDetailsPage extends Component {
  onBackPress = () => {
    const { pop } = this.props;
    pop();
  };
  render() {
    const {
      productReducer: { product },
      match: { params },
      getProductDetailsAction
    } = this.props;
    const rowStyle = {
      fontSize: 12,
      color: "#19202c"
    };
    const columns = [
      {
        name: "SKU",
        selector: "sku",
        style: rowStyle
      },
      {
        name: "NAME",
        selector: "name",
        style: rowStyle
      },
      {
        name: "EXHIBITION NAME",
        selector: "exhibition_name",
        grow: 2,
        style: rowStyle
      },
      {
        name: "STATUS",
        selector: "status",
        style: rowStyle
      },
      {
        name: "PRICE",
        selector: "price",
        style: rowStyle
      },
      {
        name: "QUANTITY",
        selector: "qty_ordered",
        style: rowStyle
      },
      {
        name: "COMMISSION",
        selector: "commission",
        style: rowStyle
      },
      {
        name: "GRAND TOTAL",
        selector: "formated_base_total",
        style: rowStyle
      }
    ];

    const customStyles = {
      headRow: {
        style: {
          borderTop: "1px solid #ededed",
          borderBottom: "1px solid #ededed",
          backgroundColor: "#f4f7fa"
        }
      },
      headCells: {
        style: {
          color: "#202124",
          fontSize: 12,
          fontWeight: "bold",
          color: "#7c858e"
        }
      }
    };
    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <NavHeader title="Product Detail" onBackClick={this.onBackPress}>
          <DivRow>
            <SecondaryCapsuleButton className={styles.cancel_button}>
              Delete
            </SecondaryCapsuleButton>

            <CapsuleButton>Edit</CapsuleButton>
          </DivRow>
        </NavHeader>
        <InitialPageLoader
          initialPageApi={() => getProductDetailsAction(params.productId)}
        >
          <DivColumn
            fillParent
            className={styles.product_page_container}
          ></DivColumn>
        </InitialPageLoader>
      </SectionedContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    productReducer: state.productReducer
  };
};

const mapDispathToProps = dispatch => {
  return {
    getProductDetailsAction: bindActionCreators(
      getProductDetailsAction,
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(ProductDetailsPage));
