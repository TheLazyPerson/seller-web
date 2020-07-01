import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import SideNav from "CommonComponents/sideNav";
import styles from "./profile_settings.module.scss";
import InputCheckbox from "CommonComponents/InputCheckbox";
import navigatorHoc from "Hoc/navigatorHoc";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getSettingsAction,
  updateSettingsAction,
} from "Core/modules/settings/settingsActions";
import translatorHoc from "Hoc/translatorHoc";
import InitialPageLoader from "CommonContainers/initialPageLoader";
class Settings extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isGoing: true,
  //     numberOfGuests: 2
  //   };

  //   this.handleInputChange = this.handleInputChange.bind(this);
  // }

  state = {
    isGoing: true,
    numberOfGuests: 2,
  };

  updateNotificationStatus = (isInputChecked) => {
    const { updateSettingsAction } = this.props;
    const formData = {
      wants_updates: isInputChecked ? 1 : 0,
    };

    updateSettingsAction(formData).then((response) => {
      const { code } = response.payload;
      if (code === 200 || code === 201) {
      } else if (code === 400 || code === 404) {
        console.log("error");
      }
    });
  };

  render() {
    const {
      getSettingsAction,
      settingsReducer: { settings },
      translate,
    } = this.props;

    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <DivColumn fillParent>
          <DivRow className={styles.header}>
            <div className={styles.header_text}>
              {translate("setting_page.header_title")}
            </div>
          </DivRow>
          <InitialPageLoader initialPageApi={() => getSettingsAction()}>
            <DivRow verticalCenter className={styles.settings_item_container}>
              <DivColumn>
                <div className={styles.item_title}>
                  {translate("setting_page.notification")}
                </div>
                <div className={styles.item_description}>
                  {translate("setting_page.subtitile")}
                </div>
              </DivColumn>
              <InputCheckbox
                name="isGoing"
                type="checkbox"
                isChecked={settings.wants_updates}
                handleCheckBoxUpdate={this.updateNotificationStatus}
              />
            </DivRow>
          </InitialPageLoader>
        </DivColumn>
      </SectionedContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    settingsReducer: state.settingsReducer,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    getSettingsAction: bindActionCreators(getSettingsAction, dispatch),
    updateSettingsAction: bindActionCreators(updateSettingsAction, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(translatorHoc(navigatorHoc(Settings)));
