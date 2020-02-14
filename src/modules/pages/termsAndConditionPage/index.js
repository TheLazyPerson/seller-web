import React, { Component } from 'react';
import { termsAndCondition } from 'Constants/termsAndConditionConstants';
import StaticDataPageContainer from 'CommonContainers/staticDataPageContanier';

export default class TermsAndConditionPage extends Component {
  render() {
     return (
       <StaticDataPageContainer 
        subTitle="TERMS OF USE"
        title="Terms and Conditions"
        staticDataArray={termsAndCondition}
       />
     )
  }
}
