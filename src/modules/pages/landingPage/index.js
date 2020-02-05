import React, { Component } from "react";
import FullWidthContainer from "CommonContainers/fullwidthContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import map from "lodash/map";
import styles from "./landing_page.module.scss";
import { profileListItem } from "Constants/profileConstants";
import navigatorHoc from "Hoc/navigatorHoc";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class LandingPage extends Component {
  render() {
    return (
     <FullWidthContainer>
      <div>Content here</div>
     </FullWidthContainer>
    );
  }
}

const mapDispathToProps = dispatch => {
  return {};
};

export default connect(null, mapDispathToProps)(navigatorHoc(LandingPage));
