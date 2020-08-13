import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivRow from "CommonComponents/divRow";
import SideNav from "CommonComponents/sideNav";
import styles from "./edit_bank_details.module.scss";
import NavHeader from "CommonComponents/navHeader";
import CapsuleButton from "CommonComponents/capsuleButton";
import SecondaryCapsuleButton from "CommonComponents/secondaryCapsuleButton";
import InputTextComponent from "CommonComponents/InputTextComponent";
import navigatorHoc from "Hoc/navigatorHoc";
import { isEmptyValidator } from "Utils/validators";
import { Form, Field } from "react-final-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { editBankDetailsAction } from "Core/modules/bankDetails/bankDetailsActions";
import { showSuccessFlashMessage } from "Redux/actions/flashMessageActions";
import translatorHoc from "Hoc/translatorHoc";
import { getBankDetailsAction } from "Core/modules/bankDetails/bankDetailsActions";

class EditBankDetails extends Component {
  validate = (values) => {
    const errors = {};
    const validators = {
      account_holder: isEmptyValidator(values.accountHolder),
      bank_name: isEmptyValidator(values.bankName),
      iban: isEmptyValidator(values.iban),
    };

    Object.keys(validators).forEach((key) => {
      if (!validators[key].result) errors[key] = validators[key].error;
    });

    return errors;
  };

  onSubmit = (form) => {
    const {
      editBankDetailsAction,
      navigateTo,
      showSuccessFlashMessage,
    } = this.props;

    editBankDetailsAction({
      account_holder: form.accountHolder,
      bank_name: form.bankName,
      iban: form.iban,
    }).then(({ payload }) => {
      if (payload.code === 200 || payload.code === 201) {
        navigateTo("profile-details");
        showSuccessFlashMessage("Bank Details Changed successfuly");
      }
    });
  };

  componentDidMount() {
    // TODO: To add to check if reducer data is not available.
    this.props.getBankDetailsAction().then(({ payload }) => {
      if (payload.code === 200 || payload.code === 201) {
        // code here
      }
    });
  }

  onBackPress = () => {
    const { pop } = this.props;
    pop();
  };

  onClickCancel = () => {
    this.onBackPress();
  };

  render() {
    const {
      bankDetailsReducer: { bankDetails },
      translate,
      isRTL,
    } = this.props;

    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <NavHeader
          title={translate("profile_details.edit_bank_details")}
          onBackClick={this.onBackPress}
        />
        <DivRow className={` ${isRTL ? styles.rtl : ""}`}>
          <Form
            onSubmit={this.onSubmit}
            validate={this.validate}
            initialValues={{
              accountHolder: bankDetails.account_holder
                ? bankDetails.account_holder
                : "",
              bankName: bankDetails.bank_name ? bankDetails.bank_name : "",
              iban: bankDetails.iban ? bankDetails.iban : "",
            }}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form className={styles.form_container} onSubmit={handleSubmit}>
                <Field name="accountHolder">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      type="text"
                      placeholder={translate("profile_details.account_holder")}
                      className={styles.input_text}
                    />
                  )}
                </Field>
                <Field name="bankName">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      type="text"
                      placeholder={translate("profile_details.bank_name")}
                      className={styles.input_text}
                    />
                  )}
                </Field>
                <Field name="iban">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      type="text"
                      placeholder={translate("profile_details.IBAN")}
                      className={styles.input_text}
                    />
                  )}
                </Field>

                <DivRow className={styles.form_button_container}>
                  <SecondaryCapsuleButton onClick={this.onClickCancel}>
                    {translate("profile_details.cancle")}
                  </SecondaryCapsuleButton>
                  <CapsuleButton type="submit" disabled={submitting}>
                    {translate("profile_details.submit")}
                  </CapsuleButton>
                </DivRow>
              </form>
            )}
          />
        </DivRow>
      </SectionedContainer>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    bankDetailsReducer: state.bankDetailsReducer,
    isRTL: state.languageReducer.isRTL,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    editBankDetailsAction: bindActionCreators(editBankDetailsAction, dispatch),
    showSuccessFlashMessage: bindActionCreators(
      showSuccessFlashMessage,
      dispatch
    ),
    getBankDetailsAction: bindActionCreators(getBankDetailsAction, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(translatorHoc(EditBankDetails)));
