import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import NavHeader from "CommonComponents/navHeader";
import CapsuleButton from "CommonComponents/capsuleButton";
import map from "lodash/map";
import styles from "./products.module.scss";
import SideNav from "CommonComponents/sideNav";
import navigatorHoc from "Hoc/navigatorHoc";
import { logoutAction } from "Core/modules/signin/signinActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import memoize from "memoize-one";
import DataTableContainer from "CommonContainers/dataTableContainer";
import {
  getProductListAction,
  removeProductAction
} from "Core/modules/product/productActions";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import { showSuccessFlashMessage } from "Redux/actions/flashMessageActions";
import Button from "@material-ui/core/Button";

const columns = memoize(() => [
  {
    name: "ID",
    selector: "id",
    sortable: true
  },
  {
    name: "SKU",
    selector: "sku",
    sortable: true
  },
  {
    name: "NAME",
    selector: "name",
    sortable: true,
    grow: 2
  },
  {
    name: "PRICE",
    selector: "price",
    sortable: true
  },
  {
    name: "QUANTITY",
    selector: "inventory.qty",
    sortable: true
  },

  {
    cell: () => (
      <Button variant="contained" color="primary">
        View
      </Button>
    ),
    button: true
  }
]);

class ProductsPage extends Component {
  onClickNewProduct = () => {
    const { navigateTo } = this.props;
    navigateTo("add-product");
  };

  render() {
    const {
      productReducer: { productList },
      getProductListAction
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
                columns={columns()}
              />
            </InitialPageLoader>
          </DivColumn>
        </DivColumn>
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
    getProductListAction: bindActionCreators(getProductListAction, dispatch),
    removeProductAction: bindActionCreators(removeProductAction, dispatch),
    showSuccessFlashMessage: bindActionCreators(
      showSuccessFlashMessage,
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(ProductsPage));
