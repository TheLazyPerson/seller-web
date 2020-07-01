/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import SideNav from "CommonComponents/sideNav";
import styles from "./profile_help_center.module.scss";
import NavHeader from "CommonComponents/navHeader";
import CapsuleButton from "CommonComponents/capsuleButton";
import cartIcon from "Icons/cart-bag-icon-black.svg";
import faqIcon from "Icons/faq-icon-black.svg";
import { isEmptyValidator } from "Utils/validators";
import { Form, Field } from "react-final-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { sendFeedbackAction } from "Core/modules/support/supportActions";
import { showSuccessFlashMessage } from "Redux/actions/flashMessageActions";
import map from "lodash/map";
import navigatorHoc from "Hoc/navigatorHoc";
import translatorHoc from "Hoc/translatorHoc";

class HelpCenter extends Component {
  state = {
    helpCenterList: [
      {
        en: {
          title: "TRACK, CANCEL, RETURN/EXCHANGE",
          description: "Check your order status",
        },
        ar: {
          title: "المسار ، الإلغاء ، العودة / التبادل",
          description: "تحقق من حالة طلبك",
        },
        image: cartIcon,
        redirectTo: "orders",
      },
      {
        en: {
          title: "FREQUENTLY ASKED QUESTIONS",
          description: "More queries related to your experience",
        },
        ar: {
          title: "أسئلة مكررة",
          description: "المزيد من الاستفسارات المتعلقة بتجربتك",
        },
        image: faqIcon,
        redirectTo: "faq",
      },
    ],
  };

  validate = (values) => {
    const errors = {};
    const validators = {
      feedback: isEmptyValidator(values.oldPassword),
    };

    Object.keys(validators).forEach((key) => {
      if (!validators[key].result) errors[key] = validators[key].error;
    });

    return errors;
  };

  onSubmit = (form) => {
    const { sendFeedbackAction, showSuccessFlashMessage } = this.props;

    sendFeedbackAction({
      issue_summary: form.feedback,
    }).then(({ payload }) => {
      if (payload.code === 200 || payload.code === 201) {
        showSuccessFlashMessage("Feedback sent successfuly");
      }
    });
  };

  onBackPress = () => {
    const { pop } = this.props;
    pop();
  };

  onHelpCenterItemSelect = (redirectTo) => {
    const { navigateTo } = this.props;
    navigateTo(redirectTo);
  };

  render() {
    const { helpCenterList } = this.state;
    const {
      translate,
      languageReducer: { languageCode },
    } = this.props;
    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <NavHeader title={translate("help_center.header_title")} />

        <DivColumn fillParent className={styles.help_center_container}>
          <DivRow className={styles.list_container}>
            {map(helpCenterList, (helpCenterItem) => (
              <DivColumn
                verticalCenter
                horizontalCenter
                className={styles.item_container}
                onClick={() =>
                  this.onHelpCenterItemSelect(helpCenterItem.redirectTo)
                }
              >
                <img src={helpCenterItem.image} className={styles.item_icon} />
                <div className={styles.item_title}>
                  {helpCenterItem[languageCode].title}
                </div>
                <div className={styles.item_description}>
                  {helpCenterItem[languageCode].description}
                </div>
              </DivColumn>
            ))}
          </DivRow>
          <div className={styles.form_header}>
            {translate("help_center.more_help")}
          </div>

          <DivColumn className={styles.form_container}>
            <Form
              onSubmit={this.onSubmit}
              validate={this.validate}
              render={({
                handleSubmit,
                form,
                submitting,
                pristine,
                values,
              }) => (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <Field name="feedback">
                    {({ input, meta }) => (
                      <textarea
                        meta={meta}
                        {...input}
                        placeholder={translate("help_center.your_concern")}
                        className={styles.text_area}
                      />
                    )}
                  </Field>
                  <DivRow>
                    <CapsuleButton
                      type="submit"
                      disabled={submitting}
                      onClick={() => this.onSubmit(values)}
                    >
                      {translate("help_center.callback")}
                    </CapsuleButton>
                  </DivRow>
                </form>
              )}
            />
          </DivColumn>
        </DivColumn>
      </SectionedContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    supportReducer: state.supportReducer,
    languageReducer: state.languageReducer,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    sendFeedbackAction: bindActionCreators(sendFeedbackAction, dispatch),
    showSuccessFlashMessage: bindActionCreators(
      showSuccessFlashMessage,
      dispatch
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(translatorHoc(HelpCenter)));
