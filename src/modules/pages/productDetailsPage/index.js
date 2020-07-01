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

import { showSuccessFlashMessage } from "Redux/actions/flashMessageActions";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import SecondaryCapsuleButton from "CommonComponents/secondaryCapsuleButton";

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

  getViewItem = (attribute, product) => {
    const { type, slug, name, is_translatable } = attribute;
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
          {name}:
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
            {name}: <div className={styles.value}>{product[slug].en}</div>
          </DivRow>
          <DivRow className={styles.title}>
            {name.concat(" - Arabic")}:{" "}
            <div className={styles.value}>{product[slug].ar}</div>
          </DivRow>
        </DivColumn>
      );
    }
    return (
      <DivRow className={styles.title}>
        {name}: <div className={styles.value}>{product[slug]}</div>
      </DivRow>
    );
  };

  render() {
    const {
      productReducer: { prouctForm, editProduct },
      match: { params },
      editProductAction,
    } = this.props;

    // const rowStyle = {
    //   fontSize: 12,
    //   color: "#19202c",
    // };

    // const customStyles = {
    //   headRow: {
    //     style: {
    //       borderTop: "1px solid #ededed",
    //       borderBottom: "1px solid #ededed",
    //       backgroundColor: "#f4f7fa",
    //     },
    //   },
    //   headCells: {
    //     style: {
    //       fontSize: 12,
    //       fontWeight: "bold",
    //       color: "#7c858e",
    //     },
    //   },
    // };

    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <NavHeader title="Product Detail" onBackClick={this.onBackPress}>
          <DivRow>
            <SecondaryCapsuleButton
              onClick={() => this.handleRemove(params.productId)}
              className={styles.cancel_button}
            >
              Delete
            </SecondaryCapsuleButton>

            <CapsuleButton onClick={() => this.handleUpdate(params.productId)}>
              Edit
            </CapsuleButton>
          </DivRow>
        </NavHeader>
        <InitialPageLoader
          initialPageApi={() => editProductAction({ id: params.productId })}
        >
          <DivColumn fillParent className={styles.product_page_container}>
            {!isEmpty(editProduct) &&
              map(prouctForm, (attributeGroup) => {
                const { name, attributes: fieldList } = attributeGroup;
                return (
                  <DivColumn>
                    <div className={styles.header}>{name}</div>
                    <div>
                      <DivColumn className={styles.normal_container}>
                        {map(fieldList, (attribute) => {
                          return this.getViewItem(
                            attribute,
                            editProduct.product
                          );
                        })}
                      </DivColumn>
                    </div>
                  </DivColumn>
                );
              })}
            {/* <DivColumn className={styles.order_container}>
              <div className={styles.order_id}>
                Product Name: <b>{product.name}</b>
              </div>
            </DivColumn>

            <div className={styles.header}>BASIC DETAILS</div>
            <DivColumn className={styles.normal_container}>
              <DivRow className={styles.title}>
                Name: <div className={styles.value}>{product.name}</div>
              </DivRow>
              <DivRow className={styles.title}>
                SKU: <div className={styles.value}>{product.sku}</div>
              </DivRow>
            </DivColumn>
            <DivRow className={styles.normal_container}>
              <DivColumn>
                <div className={styles.title}>SHORT DESCRIPTION:</div>
                <div className={styles.description}>
                  {product.short_description}
                </div>
              </DivColumn>
            </DivRow>
            <DivRow className={styles.normal_container}>
              <DivColumn>
                <div className={styles.title}>DESCRIPTION:</div>
                <div className={styles.description}>{product.description}</div>
              </DivColumn>
            </DivRow>

            <div className={styles.header}>PRICING DETAILS</div>
            <DivColumn className={styles.normal_container}>
              <DivRow className={styles.title}>
                Price:{" "}
                <div className={styles.value}>{product.formatted_price}</div>
              </DivRow>
              <DivRow className={styles.title}>
                Cost:{" "}
                <div className={styles.value}>{product.formatted_cost}</div>
              </DivRow>
            </DivColumn>

            <div className={styles.header}>PRODUCT IMAGES</div>
            <DivRow className={styles.image_container}>
              {!isEmpty(product.images) &&
                map(product.images, (image) => {
                  return (
                    <DivColumn className={styles.image_contain}>
                      <img src={image.path} className={styles.image} />
                    </DivColumn>
                  );
                })}
            </DivRow>

            <div className={styles.header}>THUMBNAIL</div>
            <DivRow className={styles.normal_container}>
              <DivColumn className={styles.image_contain}>
                <img src={product.thumbnail} className={styles.image} />
              </DivColumn>
            </DivRow>

            <div className={styles.header}>INVENTORY</div>
            <DivRow className={styles.normal_container}>
              <DivColumn>
                <div className={styles.title}>Quantity Available:</div>
                <div className={styles.description}>
                  {!isEmpty(product.inventory) && product.inventory.qty}
                </div>
              </DivColumn>
            </DivRow>

            <div className={styles.header}>SHIPPING DETAILS</div>
            <DivColumn className={styles.normal_container}>
              <DivRow className={styles.title}>
                Weight:{" "}
                <div className={styles.value}>
                  {!isEmpty(product.shipping) && product.shipping.weight}
                </div>
              </DivRow>
              <DivRow className={styles.title}>
                Height:{" "}
                <div className={styles.value}>
                  {!isEmpty(product.shipping) && product.shipping.height}
                </div>
              </DivRow>
              <DivRow className={styles.title}>
                Depth:{" "}
                <div className={styles.value}>
                  {!isEmpty(product.shipping) && product.shipping.depth}
                </div>
              </DivRow>
              <DivRow className={styles.title}>
                Width:{" "}
                <div className={styles.value}>
                  {!isEmpty(product.shipping) && product.shipping.width}
                </div>
              </DivRow>
            </DivColumn>

            <div className={styles.header}>META DATA</div>
            <DivColumn className={styles.normal_container}>
              <DivRow className={styles.title}>
                Meta Title:{" "}
                <div className={styles.value}>
                  {!isEmpty(product.meta) && product.meta.meta_title}
                </div>
              </DivRow>
              <DivRow className={styles.title}>
                Meta Keywords:{" "}
                <div className={styles.value}>
                  {!isEmpty(product.meta) && product.meta.meta_keywords}
                </div>
              </DivRow>
            </DivColumn>
            <DivRow className={styles.normal_container}>
              <DivColumn>
                <div className={styles.title}>META DESCRIPTION:</div>
                <div className={styles.description}>
                  {!isEmpty(product.meta) && product.meta.meta_description}
                </div>
              </DivColumn>
            </DivRow> */}
          </DivColumn>
        </InitialPageLoader>
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
)(navigatorHoc(ProductDetailsPage));
