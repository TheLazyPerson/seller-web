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
import { getExhibitionDetailAction } from "Core/modules/exhibition/exhibitionActions";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import AttachProductModal from "./attachProductModal";
import BoxComponent from "CommonComponents/boxComponent";

const exhibitionState = {
  UPCOMING: "upcoming",
  UPCOMING_ENROLLED: "subscribed",
  ENROLLED_LIVE: "live"
};

const ProductDescription = ({ exhibitionDetail }) => (
  <Fragment>
    <div className={styles.title}>DESCRIPTION:</div>
    <div className={styles.description}>{exhibitionDetail.description}</div>
  </Fragment>
);

class ExhibitionDetailsPage extends Component {
  state = {
    showModal: false
  };

  onBackPress = () => {
    const { pop } = this.props;
    pop();
  };

  onCloseModal = () => {
    this.setState({
      showModal: false
    });
  };

  onClickSubscribe = exhibitionId => {
    const { navigateTo } = this.props;
    navigateTo("exhibition-subscribe", { id: exhibitionId });
  };

  handleAttachProduct = exhibitionId => {
    this.setState({
      showModal: true
    });
  };

  render() {
    const {
      exhibitionReducer: { exhibitionDetail },
      match: { params },
      getExhibitionDetailAction
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
                  backgroundSize: "cover"
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
                      <DivRow>
                        <BoxComponent
                          containerStyle={{
                            width: 142,
                            height: 113,
                            marginRight: 10
                          }}
                          titleStyle={{
                            fontSize: 20
                          }}
                          descriptionStyle={{
                            fontSize: 12
                          }}
                          title="Some"
                          description="Thing"
                        />

                        <BoxComponent
                          containerStyle={{
                            width: 142,
                            height: 113,
                            marginRight: 10
                          }}
                          titleStyle={{
                            fontSize: 20
                          }}
                          descriptionStyle={{
                            fontSize: 12
                          }}
                          title="Some"
                          description="Thing"
                        />

                        <BoxComponent
                          containerStyle={{
                            width: 142,
                            height: 113,
                            marginRight: 10
                          }}
                          titleStyle={{
                            fontSize: 20
                          }}
                          descriptionStyle={{
                            fontSize: 12
                          }}
                          title="Some"
                          description="Thing"
                        />
                      </DivRow>
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
              {exhibitionState.UPCOMING != exhibitionDetail.state && (
                <Fragment>
                  <NavHeader title="CATEGORIES"></NavHeader>
                  <DivRow className={styles.category_list_container}>
                    {map(exhibitionDetail.categories, category => (
                      <CategoryListItem />
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
                  <DivRow className={styles.product_list_container}>
                    {map(exhibitionDetail.products, product => (
                      <ProductListItem />
                    ))}
                  </DivRow>
                </Fragment>
              )}
            </DivColumn>
          </InitialPageLoader>

          <AttachProductModal open={showModal} onClose={this.onCloseModal} />
        </DivColumn>
      </SectionedContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    exhibitionReducer: state.exhibitionReducer
  };
};

const mapDispathToProps = dispatch => {
  return {
    getExhibitionDetailAction: bindActionCreators(
      getExhibitionDetailAction,
      dispatch
    ),
    logoutAction: bindActionCreators(logoutAction, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(ExhibitionDetailsPage));
