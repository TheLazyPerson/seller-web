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
    return (
      <DivRow className={styles.item}>
        <img className={styles.image} src={listItem.base_image} />

        <DivColumn className={styles.item_content}>
          <div className={styles.title}>{listItem.title}</div>
          <div className={styles.description}>{listItem.short_description}</div>

          <DivRow>
            <div className={styles.category_header}>Category:</div>
            <div className={styles.category_value}>{listItem.categories}</div>
          </DivRow>

          <DivRow className={styles.date_container}>
            <div className={styles.date_title}>Starts At:</div>
            <div className={styles.date_value}>
              {" "}
              {formatUnixTimeStampToDateTime(listItem.starts_from)}
            </div>
          </DivRow>

          <DivRow className={styles.date_container}>
            <div className={styles.date_title}>Ends On:</div>
            <div className={styles.date_value}>
              {" "}
              {formatUnixTimeStampToDateTime(listItem.ends_till)}
            </div>
          </DivRow>

          <DivRow className={styles.action_container}>
            <div className={styles.last_date}>
              LAST {listItem.last_date_of_enrollment} LEFT TO TO SUBMIT PRODUCTS
            </div>
            <CapsuleButton
              onClick={() => this.onClickViewExhibitionDetail(listItem)}
            >
              View Details
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
    } = this.props;
    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <DivColumn fillParent className={styles.exhibition_page_container}>
          <NavHeader
            title="Your Exhibitions"
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
)(navigatorHoc(YourExhibitionListingPage));
