import React, { Component } from "react";
import DivColumn from "CommonComponents/divColumn";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./location_details.module.scss";
import InputTextComponent from "CommonComponents/InputTextComponent";
import { Form, Field } from "react-final-form";
import { showSuccessFlashMessage } from "Redux/actions/flashMessageActions";
import navigatorHoc from "Hoc/navigatorHoc";
import translatorHoc from "Hoc/translatorHoc";
import { isEmptyValidator } from "Utils/validators";

class LocationDetails extends Component {
  onSubmit = (form) => {
    const updatedPostData = {
      shop_location: {
        area: form.area,
        block_number: form.block_number,
        house_number: form.house_number,
        street_number: form.street_number,
        avenue: form.avenue,
        landmark: form.landmark,
        city: form.city,
      },
    };

    this.props.profileUpdate(updatedPostData);
  };

  validate = (values) => {
    const errors = {};
    const validators = {
      area: isEmptyValidator(values.area),
      block_number: isEmptyValidator(values.block_number),
      house_number: isEmptyValidator(values.house_number),
      street_number: isEmptyValidator(values.street_number),
      landmark: isEmptyValidator(values.landmark),
      city: isEmptyValidator(values.city),
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
              <Field name="area">
                {({ input, meta }) => (
                  <InputTextComponent
                    meta={meta}
                    type="text"
                    {...input}
                    placeholder={translate("location_detail_page.area")}
                    className={styles.input_text}
                  />
                )}
              </Field>

              <Field name="block_number">
                {({ input, meta }) => (
                  <InputTextComponent
                    meta={meta}
                    type="text"
                    {...input}
                    placeholder={translate("location_detail_page.block_number")}
                    className={styles.input_text}
                  />
                )}
              </Field>

              <Field name="house_number">
                {({ input, meta }) => (
                  <InputTextComponent
                    meta={meta}
                    type="text"
                    {...input}
                    placeholder={translate("location_detail_page.house_number")}
                    className={styles.input_text}
                  />
                )}
              </Field>

              <Field name="street_number">
                {({ input, meta }) => (
                  <InputTextComponent
                    meta={meta}
                    type="text"
                    {...input}
                    placeholder={translate(
                      "location_detail_page.street_number"
                    )}
                    className={styles.input_text}
                  />
                )}
              </Field>

              <Field name="avenue">
                {({ input, meta }) => (
                  <InputTextComponent
                    meta={meta}
                    type="text"
                    {...input}
                    placeholder={translate("location_detail_page.avenue")}
                    className={styles.input_text}
                  />
                )}
              </Field>

              <Field name="landmark">
                {({ input, meta }) => (
                  <InputTextComponent
                    meta={meta}
                    type="text"
                    {...input}
                    placeholder={translate("location_detail_page.landmark")}
                    className={styles.input_text}
                  />
                )}
              </Field>

              <Field name="city">
                {({ input, meta }) => (
                  <InputTextComponent
                    meta={meta}
                    type="text"
                    {...input}
                    placeholder={translate("location_detail_page.city")}
                    className={styles.input_text}
                  />
                )}
              </Field>

              <input
                type="submit"
                value={translate("location_detail_page.create")}
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
)(translatorHoc(navigatorHoc(LocationDetails)));
