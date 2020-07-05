import React, { Component } from "react";
import DivColumn from "CommonComponents/divColumn";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./personal_details.module.scss";
import InputTextComponent from "CommonComponents/InputTextComponent";
import { Form, Field } from "react-final-form";
import { showSuccessFlashMessage } from "Redux/actions/flashMessageActions";
import navigatorHoc from "Hoc/navigatorHoc";

import translatorHoc from "Hoc/translatorHoc";
import {
  isEmptyValidator,
  isPhoneNumber,
  isCivilIdValid,
} from "Utils/validators";
import DatePicker from "react-datepicker";
import { subtractFromDate } from "Utils/formatHelper";

class PersonalDetails extends Component {
  state = {
    startDate: null,
  };

  onSubmit = (form) => {
    const updatedPostData = {
      civil_id: form.civil_id,
      phone_number: form.phone_number,
      birthday: form.birthday,
    };

    this.props.profileUpdate(updatedPostData);
  };

  validate = (values) => {
    const errors = {};
    const validators = {
      civil_id: isCivilIdValid(values.civil_id),
      phone_number: isPhoneNumber(values.phone_number),
      birthday: isEmptyValidator(values.birthday),
    };

    Object.keys(validators).forEach((key) => {
      if (!validators[key].result) errors[key] = validators[key].error;
    });

    return errors;
  };

  render() {
    const CustomRenderInput = ({ input, value, onClick, meta }) => {
      return (
        <InputTextComponent
          {...input}
          meta={meta}
          placeholder={translate("personal_detail_page.birthday")}
          value={value}
          className={styles.input_text}
          onClick={onClick}
        />
      );
    };

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
              <Field name="civil_id">
                {({ input, meta }) => (
                  <InputTextComponent
                    meta={meta}
                    type="text"
                    {...input}
                    placeholder={translate("personal_detail_page.civil_id")}
                    className={styles.input_text}
                  />
                )}
              </Field>

              <Field name="phone_number">
                {({ input, meta }) => (
                  <InputTextComponent
                    meta={meta}
                    type="text"
                    {...input}
                    placeholder={translate("personal_detail_page.phone_number")}
                    className={styles.input_text}
                  />
                )}
              </Field>
              <Field name="birthday">
                {({ input, meta }) => (
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={this.state.startDate}
                    onChange={(date) => {
                      this.setState({ startDate: date });
                      input.onChange(date);
                    }}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    openToDate={subtractFromDate(new Date(), 18, "years")}
                    maxDate={subtractFromDate(new Date(), 18, "years")}
                    customInput={
                      <CustomRenderInput meta={meta} input={input} />
                    }
                  />
                )}
              </Field>

              <input
                type="submit"
                value={translate("personal_detail_page.create")}
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
)(translatorHoc(navigatorHoc(PersonalDetails)));
