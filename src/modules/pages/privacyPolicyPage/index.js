import React, { Component } from 'react';
import { privacyPolicy } from 'Constants/privacyPolicyConstants';
import StaticDataPageContainer from 'CommonContainers/staticDataPageContanier';

export default class PrivacyPolicyPage extends Component {
  render() {
     return (
       <StaticDataPageContainer 
        subTitle="PRIVACY"
        title="Privacy Policy"
        staticDataArray={privacyPolicy}
       />
     )
  }
}