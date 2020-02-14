import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import SideNav from "CommonComponents/sideNav";
import styles from "./profile_settings.module.scss";
import InputCheckbox from "CommonComponents/InputCheckbox";

export default class Settings extends Component {
  render() {
    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <DivColumn fillParent>
          <DivRow className={styles.header}>
            <div className={styles.header_text}>Settings</div>
          </DivRow>

          <DivRow verticalCenter className={styles.settings_item_container}>
            <DivColumn>
              <div className={styles.item_title}>Notification</div>
              <div className={styles.item_description}>
                This will not affect order updates.
              </div>
            </DivColumn>
            <InputCheckbox />
          </DivRow>
        </DivColumn>
      </SectionedContainer>
    );
  }
}
