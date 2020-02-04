import React, { Component, Fragment } from "react";
import styles from "./new_home_page.module.scss";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import socialFacebookIcon from "Icons/social-facebook-icon-white.svg";
import socialInstagramIcon from "Icons/social-instagram-icon-white.svg";
import socialTwitterIcon from "Icons/social-twitter-icon-white.svg";
import arrowRightIcon from "Icons/arrow-right-icon-white.svg";
import shareIcon from "Icons/share-icon-black.svg";
import LanguageSelect from "CommonComponents/languageSelect";
import Swiper from "react-id-swiper";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "swiper/css/swiper.css";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import map from "lodash/map";
import SectionedHeader from "CommonContainers/sectionedHeader";
import appIcon from "Images/logo-image.png";
import navigatorHoc from "Hoc/navigatorHoc";
import PageFooter from "CommonComponents/pageFooter";
import translatorHoc from "Hoc/translatorHoc";
import CapsuleButton from "CommonComponents/capsuleButton";

class HomePage extends Component {
  state = {
    currentSlide: 0
  };

  onClickExhibitionItem = id => {
    const { navigateTo } = this.props;
    navigateTo("plp", {
      id
    });
  };

  onClickSellerButton = () => {
    window.location.href =
      "http://ec2-15-206-82-110.ap-south-1.compute.amazonaws.com/";
  };

  render() {
    const params = {
      containerClass: "custom_container",
      on: {
        slideChange: () =>
          this.setState({ currentSlide: this.swiper.realIndex })
      }
    };

    const {
      homePageReducer: {},
      translate
    } = this.props;

    return (
      <SectionedContainer>
        
      </SectionedContainer>
  );
  }
}

const mapStateToProps = state => {
  return {
    homePageReducer: {}
  };
};

const mapDispathToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(translatorHoc(navigatorHoc(HomePage)));
