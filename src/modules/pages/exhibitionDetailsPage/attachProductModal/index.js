import React, { Component } from "react";
import DivColumn from "CommonComponents/divColumn";
import Modal from "@material-ui/core/Modal";
import styles from "./attach_product.module.scss";
import SearchBarComponent from "CommonComponents/searchBarComponent";
import DivRow from "CommonComponents/divRow";
import ProductListItem from "CommonComponents/productListItem";
import map from "lodash/map";
import {
  getProductListAction,
  removeProductAction
} from "Core/modules/product/productActions";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import navigatorHoc from "Hoc/navigatorHoc";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class AttachProductModal extends Component {
  render() {
    const { open, onClose } = this.props;
    const {
      productReducer: { productList },
      getProductListAction,
      exhibitionId
    } = this.props;
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={onClose}
      >
        <DivColumn
          style={{ width: "100%", height: "100%" }}
          verticalCenter
          horizontalCenter
          onClick={onClose}
        >
          <DivColumn
            className={styles.modal_container}
            onClick={event => event.stopPropagation()}
          >
            <DivRow verticalCenter className={styles.header_container}>
              <div className={styles.header_title}>ATTACH PRODUCTS</div>
              <SearchBarComponent />
            </DivRow>
            <InitialPageLoader
              className={styles.product_loader}
              initialPageApi={getProductListAction}
            >
              <DivColumn fillParent className={styles.content_container}>
                <DivRow fillParent className={styles.item_container}>
                  {map(productList, product => (
                    <ProductListItem
                      product={product}
                      actionType={"attach_product"}
                      exhibitionId={exhibitionId}
                    />
                  ))}
                </DivRow>
              </DivColumn>
            </InitialPageLoader>
          </DivColumn>
        </DivColumn>
      </Modal>
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
    removeProductAction: bindActionCreators(removeProductAction, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(AttachProductModal));
