import React, { Component } from "react";
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
import Modal from "@material-ui/core/Modal";
import { getExhibitionDetailAction } from "Core/modules/exhibition/exhibitionActions";
import InitialPageLoader from "CommonContainers/initialPageLoader";

class ExhibitionDetailsPage extends Component {
  onBackPress = () => {
    const { pop } = this.props;
    pop();
  };
  onClickSubscribe = exhibitionId => {
    const { navigateTo } = this.props;
    navigateTo("exhibition-subscribe", { id: exhibitionId });
  };

  render() {
    const {
      exhibitionReducer: { exhibitionDetail },
      match: { params },
      getExhibitionDetailAction
    } = this.props;

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
                  Enroll
                </CapsuleButton>
              </DivRow>
              <NavHeader title="BASIC DETAILS"></NavHeader>
              <DivRow className={styles.full_description_container}>
                <DivColumn className={styles.left_container}>
                  <div className={styles.title}>DESCRIPTION:</div>
                  <div className={styles.description}>
                    {exhibitionDetail.description}
                  </div>
                </DivColumn>

                <DivColumn className={styles.right_container}>
                  <div className={styles.title}>DATES:</div>
                  <div className={styles.date}>
                    <b>STARTS AT:</b> {exhibitionDetail.starts_from}
                  </div>
                  <div className={styles.date}>
                    <b>ENDS ON:</b> {exhibitionDetail.ends_till}
                  </div>
                </DivColumn>
              </DivRow>
              <NavHeader title="CATEGORIES"></NavHeader>
              <DivRow className={styles.category_list_container}>
                <CategoryListItem />
                <CategoryListItem />
                <CategoryListItem />
                <CategoryListItem />
              </DivRow>
              <NavHeader title="PRODUCT DETAILS"></NavHeader>
              <DivRow className={styles.product_list_container}>
                <ProductListItem />
                <ProductListItem />
                <ProductListItem />
                <ProductListItem />
                <ProductListItem />
              </DivRow>
            </DivColumn>
          </InitialPageLoader>
          {/* <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={true}
            onClose={()=>{}}
          >
            <div style={{height: 500, width: 500, background: 'black'}}>
              
            </div>
          </Modal> */}
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
