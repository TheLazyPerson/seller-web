import React, { Component } from 'react';
import SectionedHeader from 'CommonContainers/sectionedHeader';
import DivRow from 'CommonComponents/divRow';
import DivColumn from 'CommonComponents/divColumn';
import styles from './full_width_container.module.scss';
import LanguageSelect from 'CommonComponents/languageSelect';
import appIcon from 'Images/logo-image.png';
import PageFooter from 'CommonComponents/pageFooter';
import FullwidthHeader from 'CommonContainers/fullwidthHeader';

class FullWidthContainer extends Component {

  render() {
    const { children } = this.props;

     return (
       <DivColumn fillParent className={styles.page_container}>
         <DivColumn fillParent className={styles.content_container}>

        <FullwidthHeader />

          <DivColumn fillParent className={styles.inner_content_container}>
            <DivColumn fillParent className={styles.content}>
              { children }
            </DivColumn>
            <PageFooter />
          </DivColumn>

         </DivColumn>
       </DivColumn>
     )
  }
}

export default FullWidthContainer;