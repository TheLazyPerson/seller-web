import React, { Component, Fragment } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import NavHeader from "CommonComponents/navHeader";
import CapsuleButton from "CommonComponents/capsuleButton";
import map from "lodash/map";
import styles from "./exhibition_details.module.scss";
import { profileListItem } from "Constants/profileConstants";
import SideNav from "CommonComponents/sideNav";
import navigatorHoc from "Hoc/navigatorHoc";
import { logoutAction } from "Core/modules/signin/signinActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CookieService } from "Utils/cookieService";
import { USER_DATA_COOKIE } from "Constants/cookieConstants";
import exhibitionImage from "Images/exhibition-item-3.png";
import ProductListItem from "CommonComponents/productListItem";
import CategoryListItem from "CommonComponents/categoryListItem";
import {
  getExhibitionDetailAction,
  attachProductsToExhibition,
  removeProductFromExhibition,
} from "Core/modules/exhibition/exhibitionActions";

import {
  getProductListAction,
  removeProductAction,
} from "Core/modules/product/productActions";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import AttachProductModal from "./attachProductModal";
import BoxComponent from "CommonComponents/boxComponent";
import isEmpty from "lodash/isEmpty";
const exhibitionState = {
  UPCOMING: "upcoming",
  UPCOMING_ENROLLED: "subscribed",
  ENROLLED_LIVE: "live",
};

const ProductDescription = ({ exhibitionDetail }) => (
  <Fragment>
    <div className={styles.title}>DESCRIPTION:</div>
    <div className={styles.description}>{exhibitionDetail.description}</div>
  </Fragment>
);

class ExhibitionDetailsPage extends Component {
  onClickAttachProduct = (exhibitionId, productId) => {
    const {
      attachProductsToExhibition,
      getProductListAction,
      exhibitionReducer: { exhibitionDetail },
    } = this.props;
    attachProductsToExhibition(exhibitionId, {
      products: [productId],
    }).then(() => {
      getProductListAction(exhibitionId);
      console.log("attachment successful");
    });
  };
  onClickRemoveProduct = (exhibitionId, productId) => {
    const {
      removeProductFromExhibition,
      getProductListAction,
      exhibitionReducer: { exhibitionDetail },
    } = this.props;
    removeProductFromExhibition(exhibitionId, {
      product: productId,
    }).then(() => {
      getProductListAction(exhibitionId);
      console.log("removal successful");
    });
  };
  state = {
    showModal: false,
  };

  onBackPress = () => {
    const { pop } = this.props;
    pop();
  };

  onCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };

  onClickSubscribe = (exhibitionId) => {
    const { navigateTo } = this.props;
    navigateTo("exhibition-subscribe", { id: exhibitionId });
  };

  handleAttachProduct = (exhibitionId) => {
    this.setState({
      showModal: true,
    });
  };

  render() {
    const {
      exhibitionReducer: { exhibitionDetail },
      productReducer: { productList },
      getProductListAction,
      match: { params },
      getExhibitionDetailAction,
    } = this.props;
    const { showModal } = this.state;

    let headerTitle = "ENROLL";

    if (exhibitionState.UPCOMING_ENROLLED == exhibitionDetail.state) {
      headerTitle = "LIST YOUR PRODUCTS";
    } else if (exhibitionState.ENROLLED_LIVE == exhibitionDetail.state) {
      headerTitle = "VIEW LISTED PRODUCTS";
    }

    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <DivColumn fillParent className={styles.exhibition_page_container}>
          <NavHeader
            title="Exhibition"
            onBackClick={this.onBackPress}
          ></NavHeader>
          <InitialPageLoader
            initialPageApi={() =>
              getExhibitionDetailAction(params.exhibitionId)
            }
          >
            <DivColumn
              fillParent
              horizontalCenter
              className={styles.exhibition_details_container}
            >
              <DivRow
                className={styles.exhibition_banner_container}
                style={{
                  background: `url(${exhibitionDetail.base_image}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              >
                <div className={styles.overlay_gradient}></div>

                <DivColumn className={styles.banner_content}>
                  <div className={styles.exhibition_name}>
                    {exhibitionDetail.title}
                  </div>
                  <div className={styles.exhibition_description}>
                    {exhibitionDetail.short_description}
                  </div>
                  <div className={styles.exhibition_date}>
                    LAST {exhibitionDetail.last_date_of_enrollment} LEFT TO
                    ENROLL
                  </div>
                </DivColumn>
                <CapsuleButton
                  onClick={() => this.onClickSubscribe(exhibitionDetail.id)}
                  style={{ zIndex: 1 }}
                >
                  {headerTitle}
                </CapsuleButton>
              </DivRow>
              <NavHeader title="BASIC DETAILS"></NavHeader>
              <DivRow className={styles.full_description_container}>
                <DivColumn className={styles.left_container}>
                  {exhibitionState.ENROLLED_LIVE == exhibitionDetail.state ? (
                    <Fragment>
                      <div className={styles.overview}>Overview :</div>
                      {!isEmpty(exhibitionDetail.overview.card) && (
                        <DivRow>
                          {map(exhibitionDetail.overview.card, (card) => {
                            return (
                              <BoxComponent
                                containerStyle={{
                                  width: 142,
                                  height: 113,
                                  marginRight: 10,
                                }}
                                titleStyle={{
                                  fontSize: 20,
                                }}
                                descriptionStyle={{
                                  fontSize: 12,
                                }}
                                title={`${
                                  card.card_type == "price-card" ? "KD " : ""
                                } ${card.value}`}
                                description={card.title}
                              />
                            );
                          })}
                        </DivRow>
                      )}
                    </Fragment>
                  ) : (
                    <ProductDescription exhibitionDetail={exhibitionDetail} />
                  )}
                </DivColumn>

                <DivColumn className={styles.right_container}>
                  {exhibitionState.ENROLLED_LIVE == exhibitionDetail.state ? (
                    <ProductDescription exhibitionDetail={exhibitionDetail} />
                  ) : (
                    <Fragment>
                      <div className={styles.title}>DATES:</div>
                      <div className={styles.date}>
                        <b>STARTS AT:</b> {exhibitionDetail.starts_from}
                      </div>
                      <div className={styles.date}>
                        <b>ENDS ON:</b> {exhibitionDetail.ends_till}
                      </div>
                    </Fragment>
                  )}
                </DivColumn>
              </DivRow>
              {exhibitionState.UPCOMING == exhibitionDetail.state && (
                <Fragment>
                  <NavHeader title="CATEGORIES"></NavHeader>
                  <DivRow fillParent className={styles.category_list_container}>
                    {map(exhibitionDetail.categories, (category) => (
                      <CategoryListItem name={category.name} />
                    ))}
                  </DivRow>
                </Fragment>
              )}
              {exhibitionState.UPCOMING != exhibitionDetail.state && (
                <Fragment>
                  <NavHeader title="PRODUCT DETAILS">
                    {exhibitionState.UPCOMING_ENROLLED ==
                      exhibitionDetail.state && (
                      <CapsuleButton
                        onClick={() =>
                          this.handleAttachProduct(exhibitionDetail.id)
                        }
                      >
                        ADD YOUR PRODUCTS
                      </CapsuleButton>
                    )}
                  </NavHeader>
                  <DivRow fillParent className={styles.product_list_container}>
                    {map(exhibitionDetail.products, (product) => (
                      <ProductListItem
                        product={product}
                        actionType={
                          exhibitionState.ENROLLED_LIVE ==
                          exhibitionDetail.state
                            ? "mark_product_out_of_stock"
                            : "remove_product"
                        }
                        onClickAttachProduct={this.onClickAttachProduct}
                        onClickRemoveProduct={this.onClickRemoveProduct}
                        exhibitionId={exhibitionDetail.id}
                      />
                    ))}
                  </DivRow>
                </Fragment>
              )}
            </DivColumn>

            <InitialPageLoader
              initialPageApi={() => getProductListAction(exhibitionDetail.id)}
            >
              <AttachProductModal
                open={showModal}
                onClose={this.onCloseModal}
                exhibitionId={exhibitionDetail.id}
                onClickAttachProduct={this.onClickAttachProduct}
                onClickRemoveProduct={this.onClickRemoveProduct}
                productList={productList}
              />
            </InitialPageLoader>
          </InitialPageLoader>
        </DivColumn>
      </SectionedContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    exhibitionReducer: state.exhibitionReducer,
    productReducer: state.productReducer,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    getExhibitionDetailAction: bindActionCreators(
      getExhibitionDetailAction,
      dispatch
    ),
    logoutAction: bindActionCreators(logoutAction, dispatch),
    attachProductsToExhibition: bindActionCreators(
      attachProductsToExhibition,
      dispatch
    ),
    removeProductFromExhibition: bindActionCreators(
      removeProductFromExhibition,
      dispatch
    ),
    getProductListAction: bindActionCreators(getProductListAction, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(ExhibitionDetailsPage));
