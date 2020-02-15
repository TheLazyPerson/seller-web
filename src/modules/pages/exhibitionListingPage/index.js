import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import NavHeader from "CommonComponents/navHeader";
import CapsuleButton from "CommonComponents/capsuleButton";
import map from "lodash/map";
import styles from "./exhibition_page.module.scss";
import { profileListItem } from "Constants/profileConstants";
import SideNav from "CommonComponents/sideNav";
import navigatorHoc from "Hoc/navigatorHoc";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getExhibitionAction } from "Core/modules/exhibition/exhibitionActions";

class ExhibitionListingPage extends Component {
  getListItem = listItem => {
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
            <div className={styles.date_value}>{listItem.starts_from}</div>
          </DivRow>

          <DivRow className={styles.date_container}>
            <div className={styles.date_title}>Ends On:</div>
            <div className={styles.date_value}>{listItem.ends_till}</div>
          </DivRow>

          <DivRow className={styles.action_container}>
            <div className={styles.last_date}>
              LAST {listItem.last_date_of_enrollment} LEFT TO ENROLL
            </div>
            <CapsuleButton>ENROLL</CapsuleButton>
          </DivRow>
        </DivColumn>
      </DivRow>
    );
  };
  render() {
    const {
      exhibitionReducer: { exhibitionList }
    } = this.props;
    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <DivColumn fillParent className={styles.exhibition_page_container}>
          <NavHeader title="Exhibitions">
            <CapsuleButton>Your Exhibitions</CapsuleButton>
          </NavHeader>
          <DivColumn fillParent className={styles.content_container}>
            {map(exhibitionList, exhibition => {
              return this.getListItem(exhibition);
            })}
          </DivColumn>
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
    getExhibitionAction: bindActionCreators(getExhibitionAction, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(ExhibitionListingPage));
