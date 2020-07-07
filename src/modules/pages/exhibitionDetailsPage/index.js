import React, { Component, Fragment } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import NavHeader from "CommonComponents/navHeader";
import CapsuleButton from "CommonComponents/capsuleButton";
import map from "lodash/map";
import styles from "./exhibition_details.module.scss";
import SideNav from "CommonComponents/sideNav";
import navigatorHoc from "Hoc/navigatorHoc";
import { logoutAction } from "Core/modules/signin/signinActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProductListItem from "CommonComponents/productListItem";
import CategoryListItem from "CommonComponents/categoryListItem";
import {
  getExhibitionDetailAction,
  attachProductsToExhibition,
  removeProductFromExhibition,
} from "Core/modules/exhibition/exhibitionActions";
import translatorHoc from "Hoc/translatorHoc";
import { getProductListAction } from "Core/modules/product/productActions";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import AttachProductModal from "./attachProductModal";
import BoxComponent from "CommonComponents/boxComponent";
import isEmpty from "lodash/isEmpty";
import { formatUnixTimeStampToDateTime } from "Utils/formatHelper";
import { calculateDateDiff, calculateDateDiffFrom } from "Utils/formatHelper";
const exhibitionState = {
  UPCOMING: "upcoming",
  UPCOMING_ENROLLED: "subscribed",
  ENROLLED_LIVE: "live",
};

const ProductDescription = ({ exhibitionDetail, translate, languageCode }) => (
  <Fragment>
    <div className={styles.title}>
      {translate("exhibition_details_page.discription")}:
    </div>
    <div className={styles.description}>
      {!isEmpty(exhibitionDetail) &&
        exhibitionDetail.translations[languageCode].description}
    </div>
  </Fragment>
);

class ExhibitionDetailsPage extends Component {
  onClickAttachProduct = (exhibitionId, productId) => {
    const { attachProductsToExhibition, getProductListAction } = this.props;
    attachProductsToExhibition(exhibitionId, {
      products: [productId],
    }).then(() => {
      getProductListAction(exhibitionId);
    });
  };
  onClickRemoveProduct = (exhibitionId, productId) => {
    const { removeProductFromExhibition, getProductListAction } = this.props;
    removeProductFromExhibition(exhibitionId, {
      product: productId,
    }).then(() => {
      getProductListAction(exhibitionId);
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
      translate,
      isRTL,
      languageReducer: { languageCode },
    } = this.props;
    const { showModal } = this.state;

    let headerTitle = "ENROLL";

    if (exhibitionState.UPCOMING_ENROLLED === exhibitionDetail.state) {
      headerTitle = "LIST YOUR PRODUCTS";
    } else if (exhibitionState.ENROLLED_LIVE === exhibitionDetail.state) {
      headerTitle = "VIEW LISTED PRODUCTS";
    }

    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <DivColumn fillParent className={styles.exhibition_page_container}>
          <NavHeader
            title={translate("exhibition_details_page.exhibition")}
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
              className={` ${styles.exhibition_details_container} ${
                isRTL ? styles.rtl : ""
              }`}
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
                    {!isEmpty(exhibitionDetail) &&
                      exhibitionDetail.translations[languageCode].title}
                  </div>
                  <div className={styles.exhibition_description}>
                    {!isEmpty(exhibitionDetail) &&
                      exhibitionDetail.translations[languageCode]
                        .short_description}
                  </div>
                  <div className={styles.exhibition_date}>
                    {exhibitionState.UPCOMING_ENROLLED ===
                      exhibitionDetail.state &&
                      ` ${translate(
                        "exhibition_details_page.last"
                      )} ${calculateDateDiffFrom(
                        exhibitionDetail.starts_from
                      )} ${translate(
                        "exhibition_details_page.left_to_submit_products"
                      )}`}
                    {exhibitionState.UPCOMING === exhibitionDetail.state &&
                      ` ${translate(
                        "exhibition_details_page.last"
                      )} ${calculateDateDiff(
                        exhibitionDetail.last_date_of_enrollment
                      )} ${translate(
                        "exhibition_details_page.left_to_enroll"
                      )}`}
                    {exhibitionState.ENROLLED_LIVE === exhibitionDetail.state &&
                      ` ${translate(
                        "exhibition_details_page.live_now"
                      )} ${calculateDateDiff(
                        exhibitionDetail.ends_till
                      )} ${translate("exhibition_details_page.days")}`}
                  </div>
                </DivColumn>
                {exhibitionState.UPCOMING === exhibitionDetail.state && (
                  <CapsuleButton
                    onClick={() => this.onClickSubscribe(exhibitionDetail.id)}
                    style={{ zIndex: 1 }}
                  >
                    {headerTitle}
                  </CapsuleButton>
                )}
              </DivRow>
              <NavHeader
                title={translate("exhibition_details_page.basic_details")}
              ></NavHeader>
              <DivRow className={styles.full_description_container}>
                <DivColumn className={styles.left_container}>
                  {exhibitionState.ENROLLED_LIVE === exhibitionDetail.state ? (
                    <Fragment>
                      <div className={styles.overview}>
                        {translate("exhibition_details_page.overview")} :
                      </div>
                      {!isEmpty(exhibitionDetail.overview.card) && (
                        <DivRow className={styles.overview_box_container}>
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
                                  card.card_type === "price-card" ? "KD " : ""
                                } ${card.value}`}
                                description={card.title[languageCode]}
                              />
                            );
                          })}
                        </DivRow>
                      )}
                    </Fragment>
                  ) : (
                    <ProductDescription
                      exhibitionDetail={exhibitionDetail}
                      translate={translate}
                      languageCode={languageCode}
                    />
                  )}
                </DivColumn>

                <DivColumn className={styles.right_container}>
                  {exhibitionState.ENROLLED_LIVE === exhibitionDetail.state ? (
                    <ProductDescription
                      exhibitionDetail={exhibitionDetail}
                      translate={translate}
                      languageCode={languageCode}
                    />
                  ) : (
                    <Fragment>
                      <div className={styles.title}>
                        {translate("exhibition_details_page.date")}:
                      </div>
                      <div className={styles.date}>
                        <b>{translate("exhibition_details_page.start_at")}</b>{" "}
                        {formatUnixTimeStampToDateTime(
                          exhibitionDetail.starts_from
                        )}
                      </div>
                      <div className={styles.date}>
                        <b>{translate("exhibition_details_page.ends_on")}:</b>{" "}
                        {formatUnixTimeStampToDateTime(
                          exhibitionDetail.ends_till
                        )}
                      </div>
                    </Fragment>
                  )}
                </DivColumn>
              </DivRow>
              {exhibitionState.UPCOMING === exhibitionDetail.state && (
                <Fragment>
                  <NavHeader
                    title={translate("exhibition_details_page.category")}
                  ></NavHeader>
                  <DivRow fillParent className={styles.category_list_container}>
                    {map(exhibitionDetail.categories, (category) => (
                      <CategoryListItem name={category.name} />
                    ))}
                  </DivRow>
                </Fragment>
              )}
              {exhibitionState.UPCOMING !== exhibitionDetail.state && (
                <Fragment>
                  <NavHeader
                    title={translate("exhibition_details_page.product_details")}
                  >
                    {exhibitionState.UPCOMING_ENROLLED ===
                      exhibitionDetail.state && (
                      <CapsuleButton
                        onClick={() =>
                          this.handleAttachProduct(exhibitionDetail.id)
                        }
                      >
                        {translate("exhibition_details_page.add_to_products")}
                      </CapsuleButton>
                    )}
                  </NavHeader>
                  <DivRow fillParent className={styles.product_list_container}>
                    {map(exhibitionDetail.products, (product) => (
                      <ProductListItem
                        product={product}
                        actionType={
                          exhibitionState.ENROLLED_LIVE ===
                          exhibitionDetail.state
                            ? "mark_product_out_of_stock"
                            : "remove_product"
                        }
                        onClickAttachProduct={this.onClickAttachProduct}
                        onClickRemoveProduct={this.onClickRemoveProduct}
                        exhibitionId={exhibitionDetail.id}
                        languageCode={languageCode}
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
                languageCode={languageCode}
                translate={translate}
                isRTL={isRTL}
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
    isRTL: state.languageReducer.isRTL,
    languageReducer: state.languageReducer,
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
)(navigatorHoc(translatorHoc(ExhibitionDetailsPage)));
