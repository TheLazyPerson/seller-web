import React, { Component } from "react";
import DivColumn from "CommonComponents/divColumn";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./bank_details.module.scss";
import InputTextComponent from "CommonComponents/InputTextComponent";
import { Form, Field } from "react-final-form";
import { showSuccessFlashMessage } from "Redux/actions/flashMessageActions";
import navigatorHoc from "Hoc/navigatorHoc";

import translatorHoc from "Hoc/translatorHoc";
import { isEmptyValidator } from "Utils/validators";

class BankDetails extends Component {
  onSubmit = (form) => {
    const updatedPostData = {
      bank_details: {
        account_holder: form.account_holder,
        bank_name: form.bank_name,
        IBAN: form.iban,
      },
    };

    this.props.profileUpdate(updatedPostData);
  };

  validate = (values) => {
    const errors = {};
    const validators = {
      account_holder: isEmptyValidator(values.account_holder),
      bank_name: isEmptyValidator(values.bank_name),
      iban: isEmptyValidator(values.iban),
    };

    Object.keys(validators).forEach((key) => {
      if (!validators[key].result) errors[key] = validators[key].error;
    });

    return errors;
  };

  render() {
    const { translate } = this.props;

    return (
      <DivColumn
        verticalCenter
        horizontalCenter
        className={styles.page_container}
      >
        <Form
          onSubmit={this.onSubmit}
          validate={this.validate}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <Field name="account_holder">
                {({ input, meta }) => (
                  <InputTextComponent
                    meta={meta}
                    type="text"
                    {...input}
                    placeholder={translate("bank_detail_page.acount_holder")}
                    className={styles.input_text}
                  />
                )}
              </Field>

              <Field name="bank_name">
                {({ input, meta }) => (
                  <InputTextComponent
                    meta={meta}
                    type="text"
                    {...input}
                    placeholder={translate("bank_detail_page.bank_name")}
                    className={styles.input_text}
                  />
                )}
              </Field>

              <Field name="iban">
                {({ input, meta }) => (
                  <InputTextComponent
                    meta={meta}
                    type="text"
                    {...input}
                    placeholder={translate("bank_detail_page.iban")}
                    className={styles.input_text}
                  />
                )}
              </Field>
              <input
                type="submit"
                value={translate("bank_detail_page.create")}
                className={styles.input_submit}
                disabled={submitting}
              />
            </form>
          )}
        />
      </DivColumn>
    );
  }
}

const mapDispathToProps = (dispatch) => {
  return {
    showSuccessFlashMessage: bindActionCreators(
      showSuccessFlashMessage,
      dispatch
    ),
  };
};

export default connect(
  null,
  mapDispathToProps
)(translatorHoc(navigatorHoc(BankDetails)));
