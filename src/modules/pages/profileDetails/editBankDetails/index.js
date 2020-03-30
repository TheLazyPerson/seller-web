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
import { passwordValidator, isEmptyValidator } from "Utils/validators";
import { Form, Field } from "react-final-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { editBankDetailsAction } from "Core/modules/bankDetails/bankDetailsActions";
import { showSuccessFlashMessage } from "Redux/actions/flashMessageActions";

class EditBankDetails extends Component {
  validate = values => {
    const errors = {};
    const validators = {
      account_holder: isEmptyValidator(values.accountHolder),
      bank_name: isEmptyValidator(values.bankName),
      iban: isEmptyValidator(values.iban)
    };

    Object.keys(validators).forEach(key => {
      if (!validators[key].result) errors[key] = validators[key].error;
    });

    return errors;
  };

  onSubmit = form => {
    const {
      editBankDetailsAction,
      navigateTo,
      showSuccessFlashMessage
    } = this.props;

    editBankDetailsAction({
      account_holder: form.accountHolder,
      bank_name: form.bankName,
      iban: form.iban
    }).then(({ payload }) => {
      if (payload.code === 200 || payload.code === 201) {
        navigateTo("profile-details");
        showSuccessFlashMessage("Bank Details Changed successfuly");
      }
    });
  };

  onBackPress = () => {
    const { pop } = this.props;
    pop();
  };

  onClickCancel = () => {
    this.onBackPress();
  };

  render() {
    const {
      bankDetailsReducer: { bankDetails }
    } = this.props;

    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <NavHeader title="Edit Bank Details" onBackClick={this.onBackPress} />
        <Form
          onSubmit={this.onSubmit}
          validate={this.validate}
          initialValues={{
            accountHolder: bankDetails.account_holder
              ? bankDetails.account_holder
              : "",
            bankName: bankDetails.bank_name ? bankDetails.bank_name : "",
            iban: bankDetails.iban ? bankDetails.iban : ""
          }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <Field name="accountHolder">
                {({ input, meta }) => (
                  <InputTextComponent
                    meta={meta}
                    {...input}
                    type="text"
                    placeholder="Account Holder Name"
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
                    placeholder="Bank Name"
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
                    placeholder="IBAN"
                    className={styles.input_text}
                  />
                )}
              </Field>

              <DivRow className={styles.form_button_container}>
                <SecondaryCapsuleButton onClick={this.onClickCancel}>
                  Cancel
                </SecondaryCapsuleButton>
                <CapsuleButton type="submit" disabled={submitting}>
                  Confirm
                </CapsuleButton>
              </DivRow>
            </form>
          )}
        />
      </SectionedContainer>
    );
  }
}
const mapStateToProps = state => {
  return {
    bankDetailsReducer: state.bankDetailsReducer
  };
};

const mapDispathToProps = dispatch => {
  return {
    editBankDetailsAction: bindActionCreators(editBankDetailsAction, dispatch),
    showSuccessFlashMessage: bindActionCreators(
      showSuccessFlashMessage,
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(EditBankDetails));
