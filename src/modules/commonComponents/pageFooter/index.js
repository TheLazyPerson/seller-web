import React, { Component } from 'react';
import DivColumn from 'CommonComponents/divColumn';
import DivRow from 'CommonComponents/divRow';
import styles from './page_footer.module.scss';
import playStoreImage from 'Images/google-play-badge.png';
import appStoreImage from 'Images/app-store-badge.svg';
import translatorHoc from 'Hoc/translatorHoc';

class PageFooter extends Component {
  render() {
    const { translate } = this.props;

    return (
      <DivColumn fillSelfHorizontal className={styles.footer_container}>
       <DivRow className={styles.footer_content}>
        <DivColumn className={styles.footer_link_container}>
          <b className={styles.link_header}>{translate('footer.title_app')}</b>
          <a className={styles.link} href="/">{translate('footer.home')}</a>
          <a className={styles.link} href="/profile">{translate('footer.profile')}</a>
          <a className={styles.link} href="/wishlist">{translate('footer.wishlist')}</a>
          <a className={styles.link} href="/profile/heplcenter">{translate('footer.helpcenter')}</a>
          <a className={styles.link} href="/profile/settings">{translate('footer.settings')}</a>
        </DivColumn>
        <DivColumn className={styles.footer_link_container}>
          <b className={styles.link_header}>{translate('footer.title_link')}</b>
          <a className={styles.link} href="/faq">{translate('footer.faq')}</a>
          <a className={styles.link} href="/privacy-policy">{translate('footer.privacy_policy')}</a>
          <a className={styles.link} href="/terms-and-condition">{translate('footer.terms')}</a>
          <a className={styles.link} href="/shipping-and-returns">{translate('footer.shipping')}</a>
        </DivColumn>
        <DivColumn className={styles.footer_link_container}>
          <b className={styles.link_header}>{translate('footer.experience')}</b>
          <DivRow verticalCenter>
           <img className={styles.badge_icon} src={playStoreImage} />
           <img className={styles.apple_badge} src={appStoreImage} />
          </DivRow>

          <b className={styles.link_header} style={{marginTop: 16}}>{translate('footer.keep_in_touch')}</b>
          <DivRow>
            <a className={styles.facebook}></a>
            <a className={styles.twitter}></a>
            <a className={styles.youtube}></a>
            <a className={styles.insta}></a>
          </DivRow>
        </DivColumn>
       </DivRow>
      </DivColumn>
    );
  }
}


export default translatorHoc(PageFooter);
