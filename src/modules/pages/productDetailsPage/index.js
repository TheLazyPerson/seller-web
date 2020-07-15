/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import NavHeader from "CommonComponents/navHeader";
import CapsuleButton from "CommonComponents/capsuleButton";
import isEmpty from "lodash/isEmpty";
import map from "lodash/map";
import styles from "./product_details.module.scss";
import SideNav from "CommonComponents/sideNav";
import navigatorHoc from "Hoc/navigatorHoc";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getProductDetailsAction,
  removeProductAction,
  getProductFormAction,
  editProductAction,
} from "Core/modules/product/productActions";
import translatorHoc from "Hoc/translatorHoc";

import { showSuccessFlashMessage } from "Redux/actions/flashMessageActions";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import SecondaryCapsuleButton from "CommonComponents/secondaryCapsuleButton";
import filter from "lodash/filter";

class ProductDetailsPage extends Component {
  onBackPress = () => {
    const { pop } = this.props;
    pop();
  };
  componentDidMount() {
    const {
      getProductFormAction,
      match: { params },
    } = this.props;
    getProductFormAction(params.productId);
  }

  handleRemove = (id) => {
    const {
      removeProductAction,
      showSuccessFlashMessage,
      navigateTo,
    } = this.props;
    removeProductAction(id).then(({ payload }) => {
      if (payload.code === 200 || payload.code === 201) {
        showSuccessFlashMessage("Product Deleted");
        navigateTo("products");
      }
    });
  };

  handleUpdate = (productId) => {
    const { navigateTo } = this.props;
    navigateTo("edit-product", {
      productId,
    });
  };

  getViewItem = (attribute, product, languageCode) => {
    const { type, slug, name, translations, is_translatable } = attribute;
    var translation = filter(translations, { locale: languageCode })[0];
    if (type === "file") {
      return (
        <DivRow className={styles.image_container}>
          {map(product.image, (file) => {
            if (isEmpty(file)) return null;
            return (
              <DivColumn className={styles.image_contain}>
                <img src={file.path} className={styles.image} />
              </DivColumn>
            );
          })}
        </DivRow>
      );
    }

    if (type === "tree-checkbox") {
      return (
        <DivRow className={styles.title}>
          {translation.name}:
          {map(product.category, (item) => {
            return (
              <DivRow className={styles.title}>
                <div className={styles.value}>{item.name},</div>
              </DivRow>
            );
          })}
        </DivRow>
      );
    }
    if (is_translatable === 1) {
      return (
        <DivColumn>
          <DivRow className={styles.title}>
            {translation.name}:
            <div className={styles.value}>{product[slug].en}</div>
          </DivRow>
          <DivRow className={styles.title}>
            {translation.name.concat(" - Arabic")}:{" "}
            <div className={styles.value}>{product[slug].ar}</div>
          </DivRow>
        </DivColumn>
      );
    }
    return (
      <DivRow className={styles.title}>
        {translation.name}: <div className={styles.value}>{product[slug]}</div>
      </DivRow>
    );
  };

  render() {
    const {
      productReducer: { prouctForm, editProduct },
      match: { params },
      editProductAction,
      isRTL,
      translate,
      languageReducer: { languageCode },
    } = this.props;

    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <NavHeader
          title={translate("product_details.title")}
          onBackClick={this.onBackPress}
        >
          <DivRow className={styles.capsule_button_container}>
            <SecondaryCapsuleButton
              onClick={() => this.handleRemove(params.productId)}
              className={styles.cancel_button}
            >
              {translate("product_details.delete")}
            </SecondaryCapsuleButton>

            <CapsuleButton onClick={() => this.handleUpdate(params.productId)}>
              {translate("product_details.edit")}
            </CapsuleButton>
          </DivRow>
        </NavHeader>
        <InitialPageLoader
          initialPageApi={() => editProductAction({ id: params.productId })}
        >
          <div
            fillParent
            className={` ${styles.product_page_container} ${
              isRTL ? styles.rtl : ""
            }`}
          >
            {!isEmpty(editProduct) &&
              map(prouctForm, (attributeGroup) => {
                const { name, name_ar, attributes: fieldList } = attributeGroup;
                return (
                  <DivColumn>
                    <div className={styles.header}>
                      {languageCode === "ar" ? name_ar : name}
                    </div>
                    <div>
                      <DivColumn className={styles.normal_container}>
                        {map(fieldList, (attribute) => {
                          return this.getViewItem(
                            attribute,
                            editProduct.product,
                            languageCode
                          );
                        })}
                      </DivColumn>
                    </div>
                  </DivColumn>
                );
              })}
          </div>
        </InitialPageLoader>
      </SectionedContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productReducer: state.productReducer,
    languageReducer: state.languageReducer,
    isRTL: state.languageReducer.isRTL,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    getProductDetailsAction: bindActionCreators(
      getProductDetailsAction,
      dispatch
    ),
    getProductFormAction: bindActionCreators(getProductFormAction, dispatch),
    editProductAction: bindActionCreators(editProductAction, dispatch),
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
)(navigatorHoc(translatorHoc(ProductDetailsPage)));
