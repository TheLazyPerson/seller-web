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
import { getEnrolledExhibitionAction } from "Core/modules/exhibition/exhibitionActions";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import isEmpty from "lodash/isEmpty";
import { formatUnixTimeStampToDateTime } from "Utils/formatHelper";
import translatorHoc from "Hoc/translatorHoc";

class YourExhibitionListingPage extends Component {
  onClickViewExhibitionDetail = (exhibition) => {
    const { navigateTo } = this.props;
    navigateTo("exhibition-details", exhibition);
  };

  onBackPress = () => {
    const { pop } = this.props;
    pop();
  };

  getListItem = (listItem) => {
    const { translate, isRTL } = this.props;

    return (
      <DivRow className={` ${styles.item} ${isRTL ? styles.rtl : ""}`}>
        <img className={styles.image} src={listItem.base_image} />

        <DivColumn className={styles.item_content}>
          <div className={styles.title}>{listItem.title}</div>
          <div className={styles.description}>{listItem.short_description}</div>

          <DivRow className={styles.category_header_container}>
            <div className={styles.category_header}>
              {translate("your_exhibition_list_page.category")}
            </div>
            <div className={styles.category_value}>{listItem.categories}</div>
          </DivRow>

          <DivRow className={styles.date_container}>
            <div className={styles.date_title}>
              {translate("your_exhibition_list_page.starts_at")}:
            </div>
            <div className={styles.date_value}>
              {formatUnixTimeStampToDateTime(listItem.starts_from)}
            </div>
          </DivRow>

          <DivRow className={styles.date_container}>
            <div className={styles.date_title}>
              {translate("your_exhibition_list_page.ends_on")}:
            </div>
            <div className={styles.date_value}>
              {" "}
              {formatUnixTimeStampToDateTime(listItem.ends_till)}
            </div>
          </DivRow>

          <DivRow className={styles.action_container}>
            <div className={styles.last_date}>
              {translate("your_exhibition_list_page.last")}
              {listItem.last_date_of_enrollment}
              {translate("your_exhibition_list_page.left_to_enroll")}
            </div>
            <CapsuleButton
              onClick={() => this.onClickViewExhibitionDetail(listItem)}
            >
              {translate("your_exhibition_list_page.view_details")}
            </CapsuleButton>
          </DivRow>
        </DivColumn>
      </DivRow>
    );
  };
  render() {
    const {
      exhibitionReducer: { subscribedExhibitionList },
      getEnrolledExhibitionAction,
      translate,
    } = this.props;
    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <DivColumn fillParent className={styles.exhibition_page_container}>
          <NavHeader
            title={translate("your_exhibition_list_page.your_exhibition")}
            onBackClick={this.onBackPress}
          ></NavHeader>
          <DivColumn fillParent className={styles.content_container}>
            <InitialPageLoader
              initialPageApi={getEnrolledExhibitionAction}
              isEmpty={isEmpty(subscribedExhibitionList)}
            >
              {map(subscribedExhibitionList, (exhibition) => {
                return this.getListItem(exhibition);
              })}
            </InitialPageLoader>
          </DivColumn>
        </DivColumn>
      </SectionedContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    exhibitionReducer: state.exhibitionReducer,
    isRTL: state.languageReducer.isRTL,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    getEnrolledExhibitionAction: bindActionCreators(
      getEnrolledExhibitionAction,
      dispatch
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(translatorHoc(YourExhibitionListingPage)));
