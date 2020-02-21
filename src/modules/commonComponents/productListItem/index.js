import React, { Component } from "react";
import DivColumn from "CommonComponents/divColumn";
import styles from "./product_list_item.module.scss";
import exhibitionImage from "Images/exhibition-item-1.jpg";
import isEmpty from "lodash/isEmpty";
import { attachProductsToExhibition } from "Core/modules/exhibition/exhibitionActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import navigatorHoc from "Hoc/navigatorHoc";

class ProductListItem extends Component {
  onClickAttachProduct = (exhibitionId, productId) => {
    const {
      attachProductsToExhibition,
      exhibitionReducer: { exhibitionDetail }
    } = this.props;
    attachProductsToExhibition(exhibitionId, {
      products: [productId]
    }).then(({ exhibitionDetail }) => {
      console.log("attachment successful");
    });
  };
  render() {
    const { product, exhibitionId, actionType } = this.props;
    const ACTION_TYPE_ATTACH_PRODUCT = "attach_product";
    const ACTION_TYPE_MARK_OUT_OF_STOCK = "mark_product_out_of_stock";
    return (
      <DivColumn
        horizontalCenter
        className={styles.product_list_item_container}
      >
        <div className={styles.title}>{product.name}</div>
        <div className={styles.description}>{product.short_description}</div>
        {!isEmpty(product.thumbnail) && (
          <img src={product.thumbnail} className={styles.image} />
        )}
        {actionType == ACTION_TYPE_ATTACH_PRODUCT && (
          <div
            className={styles.action_button}
            onClick={() => this.onClickAttachProduct(exhibitionId, product.id)}
          >
            ATTACH
          </div>
        )}
        {actionType == ACTION_TYPE_MARK_OUT_OF_STOCK && (
          <div className={styles.action_button}>MARK PRODUCT OUT OF STOCK</div>
        )}
      </DivColumn>
    );
  }
}

const mapStateToProps = state => {
  return {
    productReducer: state.productReducer,
    exhibitionReducer: state.exhibitionReducer
  };
};

const mapDispathToProps = dispatch => {
  return {
    attachProductsToExhibition: bindActionCreators(
      attachProductsToExhibition,
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(ProductListItem));
