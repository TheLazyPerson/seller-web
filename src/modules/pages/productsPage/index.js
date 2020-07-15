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
import translatorHoc from "Hoc/translatorHoc";
import isEmpty from "lodash/isEmpty";

class ProductsPage extends Component {
  onClickNewProduct = () => {
    const { navigateTo } = this.props;
    navigateTo("add-product");
  };

  render() {
    const {
      productReducer: { productList },
      getProductListAction,
      languageReducer: { languageCode },
      translate,
    } = this.props;
    const columns = memoize(() => [
      {
        name: `${translate("product_list.table.id")}`,
        selector: "id",
        sortable: true,
      },
      {
        name: `${translate("product_list.table.sku")}`,
        selector: "sku",
        sortable: true,
      },
      {
        name: `${translate("product_list.table.name")}`,
        selector: `name`,
        sortable: true,
        grow: 2,
        cell: (value) =>
          !isEmpty(value.translations)
            ? value.translations[languageCode].name
            : " ",
      },
      {
        name: `${translate("product_list.table.price")}`,
        selector: "price",
        sortable: true,
      },
      {
        name: `${translate("product_list.table.quantity")}`,
        selector: "inventory.qty",
        sortable: true,
        cell: (value) =>
          !isEmpty(value.inventory) ? value.inventory.qty : " ",
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
            {translate("product_list.table.view")}
          </Button>
        ),
        button: true,
      },
    ]);
    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <div fillParent className={styles.products_page_container}>
          <NavHeader title={translate("product_list.title")}>
            <CapsuleButton onClick={() => this.onClickNewProduct()}>
              {translate("product_list.add_new_product")}
            </CapsuleButton>
          </NavHeader>
          <DivColumn fillParent className={styles.content_container}>
            <InitialPageLoader initialPageApi={getProductListAction}>
              <DataTableContainer
                data={productList}
                title="Products"
                columns={columns()}
                searchable="name"
              />
            </InitialPageLoader>
          </DivColumn>
        </div>
      </SectionedContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    languageReducer: state.languageReducer,
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
)(translatorHoc(navigatorHoc(ProductsPage)));
