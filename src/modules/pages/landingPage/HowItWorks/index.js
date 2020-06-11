import React, { Component } from "react";
import navigatorHoc from "Hoc/navigatorHoc";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import { howItWorksListItems } from "Constants/howItWorksConstants";
import map from "lodash/map";
import styles from "./how_it_works.module.scss";
import { connect } from "react-redux";

class HowItWorks extends Component {
  howItWorksListItems = (listItem, index) => {
    const {
      languageReducer: { languageCode },
    } = this.props;
    return (
      <DivRow
        fillParent
        className={`${styles.list_item} ${
          index % 2 == 0 ? styles.reverse_directions : ""
        }`}
      >
        <DivColumn className={styles.image_container}>
          <img className={styles.image} src={listItem.heroImage} />
        </DivColumn>
        <DivColumn className={styles.title_group}>
          <div className={styles.title}>{listItem[languageCode].title}</div>
          <div className={styles.description}>
            {listItem[languageCode].description}
          </div>
        </DivColumn>
      </DivRow>
    );
  };
  render() {
    let inde;
    return (
      <DivColumn fillParent className={styles.how_it_works}>
        {map(howItWorksListItems, (listItem, index) => {
          return this.howItWorksListItems(listItem, index);
        })}
      </DivColumn>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    languageReducer: state.languageReducer,
  };
};

export default connect(mapStateToProps, null)(navigatorHoc(HowItWorks));
