/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import NavHeader from "CommonComponents/navHeader";
import CapsuleButton from "CommonComponents/capsuleButton";
import map from "lodash/map";
import styles from "./exhibition_page.module.scss";
import SideNav from "CommonComponents/sideNav";
import navigatorHoc from "Hoc/navigatorHoc";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getExhibitionAction } from "Core/modules/exhibition/exhibitionActions";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import isEmpty from "lodash/isEmpty";
import translatorHoc from "Hoc/translatorHoc";
import {
  formatUnixTimeStampToDateTime,
  calculateDateDiff,
} from "Utils/formatHelper";

class ExhibitionListingPage extends Component {
  onClickViewExhibitionDetail = (exhibition) => {
    const { navigateTo } = this.props;
    navigateTo("exhibition-details", exhibition);
  };
  onClickViewEnrolledExhibitions() {
    const { navigateTo } = this.props;
    navigateTo("your-exhibitions");
  }

  getListItem = (listItem) => {
    const {
      translate,
      isRTL,
      languageReducer: { languageCode },
    } = this.props;
    return (
      <DivRow className={` ${styles.item} ${isRTL ? styles.rtl : ""}`}>
        <img className={styles.image} src={listItem.base_image} />
        <div className={styles.item_content}>
          <div className={styles.title}>
            {listItem.translations[languageCode].title}
          </div>
          <div className={styles.description}>
            {listItem.translations[languageCode].short_description}
          </div>

          <DivRow className={styles.category_header_container}>
            <div className={styles.category_header}>
              {isRTL ? ":" : ""}
              {translate("exhibition_list_page.category")}
              {!isRTL ? ":" : ""}
            </div>
            <div className={styles.category_value}>
              &nbsp; {listItem.categories[languageCode]} &nbsp;
            </div>
          </DivRow>

          <DivColumn className={styles.date_container}>
            <DivRow>
              <div className={styles.date_title}>
                {isRTL ? ":" : ""}
                {translate("exhibition_list_page.starts_at")}
                {!isRTL ? ":" : ""}
              </div>
              <div className={styles.date_value}>
                &nbsp;
                {formatUnixTimeStampToDateTime(listItem.starts_from)} &nbsp;
              </div>
            </DivRow>
            <DivRow>
              <div className={styles.date_title}>
                {isRTL ? ":" : ""}
                {translate("exhibition_list_page.ends_on")}
                {!isRTL ? ":" : ""}
              </div>
              <div className={styles.date_value}>
                &nbsp;
                {formatUnixTimeStampToDateTime(listItem.ends_till)} &nbsp;
              </div>
            </DivRow>
          </DivColumn>
          <DivRow className={styles.action_container}>
            <div className={styles.last_date}>
              &nbsp; {translate("exhibition_list_page.last")}
              &nbsp; {calculateDateDiff(listItem.last_date_of_enrollment)}
              &nbsp; {translate("exhibition_list_page.left_to_enroll")} &nbsp;
            </div>
            <CapsuleButton
              className={styles.action_button}
              onClick={() => this.onClickViewExhibitionDetail(listItem)}
            >
              {translate("exhibition_list_page.view_details")}
            </CapsuleButton>
          </DivRow>
          <DivRow className={styles.mobile_action_button}>
            <CapsuleButton
              onClick={() => this.onClickViewExhibitionDetail(listItem)}
            >
              {translate("exhibition_list_page.view_details")}
            </CapsuleButton>
          </DivRow>
        </div>
      </DivRow>
    );
  };
  render() {
    const {
      exhibitionReducer: { exhibitionList },
      getExhibitionAction,
      translate,
    } = this.props;
    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <DivColumn fillParent className={styles.exhibition_page_container}>
          <NavHeader title={translate("exhibition_list_page.btn_title")}>
            <CapsuleButton
              onClick={() => this.onClickViewEnrolledExhibitions()}
            >
              {translate("exhibition_list_page.your_exhibition")}
            </CapsuleButton>
          </NavHeader>
          <div fillParent className={styles.content_container}>
            <InitialPageLoader
              initialPageApi={getExhibitionAction}
              isEmpty={isEmpty(exhibitionList)}
            >
              {map(exhibitionList, (exhibition) => {
                return this.getListItem(exhibition);
              })}
            </InitialPageLoader>
          </div>
        </DivColumn>
      </SectionedContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    exhibitionReducer: state.exhibitionReducer,
    isRTL: state.languageReducer.isRTL,
    languageReducer: state.languageReducer,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    getExhibitionAction: bindActionCreators(getExhibitionAction, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(translatorHoc(ExhibitionListingPage)));
