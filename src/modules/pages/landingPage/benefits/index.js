import React, { Component } from "react";
import navigatorHoc from "Hoc/navigatorHoc";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import { benefitsListItems } from "Constants/benefitsConstants";
import map from "lodash/map";

class Benefits extends Component {
  getBenefitsListItem = listItem => {
    return (
      <DivColumn fillParent>
        <img src={listItem.heroImage} />
        <DivColumn>
          <div>{listItem.title}</div>
          <div>{listItem.description}</div>
        </DivColumn>
      </DivColumn>
    );
  };
  render() {
    return (
      <DivRow fillParent>
        {map(benefitsListItems, listItem => {
          return this.getBenefitsListItem(listItem);
        })}
        ;
      </DivRow>
    );
  }
}

export default navigatorHoc(Benefits);
