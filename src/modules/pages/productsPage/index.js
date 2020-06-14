import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import NavHeader from "CommonComponents/navHeader";
import CapsuleButton from "CommonComponents/capsuleButton";
import styles from "./products.module.scss";
import SideNav from "CommonComponents/sideNav";
import navigatorHoc from "Hoc/navigatorHoc";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import memoize from "memoize-one";
import DataTableContainer from "CommonContainers/dataTableContainer";
import {
  getProductListAction,
  removeProductAction,
} from "Core/modules/product/productActions";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import { showSuccessFlashMessage } from "Redux/actions/flashMessageActions";
import Button from "@material-ui/core/Button";

class ProductsPage extends Component {
  columns = memoize(() => [
    {
      name: "ID",
      selector: "id",
      sortable: true,
    },
    {
      name: "SKU",
      selector: "sku",
      sortable: true,
    },
    {
      name: "NAME",
      selector: "translations.en.name",
      sortable: true,
      grow: 2,
    },
    {
      name: "PRICE",
      selector: "price",
      sortable: true,
    },
    {
      name: "QUANTITY",
      selector: "inventory.qty",
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
            navigateTo("product-details", { productId: value.id });
          }}
        >
          View
        </Button>
      ),
      button: true,
    },
  ]);
  onClickNewProduct = () => {
    const { navigateTo } = this.props;
    navigateTo("add-product");
  };

  render() {
    const {
      productReducer: { productList },
      getProductListAction,
    } = this.props;
    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <DivColumn fillParent className={styles.products_page_container}>
          <NavHeader title="Products">
            <CapsuleButton onClick={() => this.onClickNewProduct()}>
              ADD NEW PRODUCT
            </CapsuleButton>
          </NavHeader>
          <DivColumn fillParent className={styles.content_container}>
            <InitialPageLoader initialPageApi={getProductListAction}>
              <DataTableContainer
                data={productList}
                title="Products"
                columns={this.columns()}
              />
            </InitialPageLoader>
          </DivColumn>
        </DivColumn>
      </SectionedContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productReducer: state.productReducer,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    getProductListAction: bindActionCreators(getProductListAction, dispatch),
    removeProductAction: bindActionCreators(removeProductAction, dispatch),
    showSuccessFlashMessage: bindActionCreators(
      showSuccessFlashMessage,
      dispatch
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(ProductsPage));
