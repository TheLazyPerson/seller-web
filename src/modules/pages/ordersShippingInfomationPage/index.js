import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import NavHeader from "CommonComponents/navHeader";
import CapsuleButton from "CommonComponents/capsuleButton";
import isEmpty from "lodash/isEmpty";
import styles from "./orders_shipping.module.scss";
import SideNav from "CommonComponents/sideNav";
import navigatorHoc from "Hoc/navigatorHoc";
import { logoutAction } from "Core/modules/signin/signinActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DataTableContainer from "CommonContainers/dataTableContainer";
import DataTable from "react-data-table-component";
import { showSuccessFlashMessage } from "Redux/actions/flashMessageActions";

import {
  getOrderDetailsAction,
  createPickupRequestAction,
} from "Core/modules/order/orderActions";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import HorizontalBorder from "CommonComponents/horizontalBorder";
import SecondaryCapsuleButton from "CommonComponents/secondaryCapsuleButton";
import { Form, Field } from "react-final-form";
import InputTextComponent from "CommonComponents/InputTextComponent";
import { isEmptyValidator } from "Utils/validators";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class OrderShippingInformationPage extends Component {
  state = {
    startDate: null,
  };

  onBackPress = () => {
    const { pop } = this.props;
    pop();
  };

  validate = (values) => {
    const errors = {};
    const validators = {
      pickupDate: isEmptyValidator(values.pickupDate),
    };

    Object.keys(validators).forEach((key) => {
      if (!validators[key].result) errors[key] = validators[key].error;
    });

    return errors;
  };

  onSubmit = (form) => {
    const {
      createPickupRequestAction,
      navigateTo,
      match: { params },
      showSuccessFlashMessage,
    } = this.props;

    createPickupRequestAction(params.orderId, {
      pickup_date: form.pickupDate,
    }).then(({ payload }) => {
      if (payload.code === 200 || payload.code === 201) {
        navigateTo("order-details", { orderId: params.orderId });
        showSuccessFlashMessage("Pickup Request Created successfuly");
      }
    });
  };

  render() {
    const rowStyle = {
      fontSize: 12,
      color: "#19202c",
    };
    const columns = [
      {
        name: "ITEM CODE",
        selector: "sku",
        style: rowStyle,
      },
      {
        name: "NAME",
        selector: "name",
        style: rowStyle,
      },
      {
        name: "EXHIBITION NAME",
        selector: "exhibition.title",
        grow: 2,
        style: rowStyle,
      },
      {
        name: "QUANTITY",
        selector: "qty_ordered",
        style: rowStyle,
      },
      {
        name: "QUANTITY TO SHIP",
        selector: "qty_ordered",
        style: rowStyle,
      },
    ];

    const customStyles = {
      headRow: {
        style: {
          borderTop: "1px solid #ededed",
          borderBottom: "1px solid #ededed",
          backgroundColor: "#f4f7fa",
        },
      },
      headCells: {
        style: {
          color: "#202124",
          fontSize: 12,
          fontWeight: "bold",
          color: "#7c858e",
        },
      },
    };
    let startDate = null;
    if (this.state.startDate) {
      startDate = this.state.startDate;
    }
    const {
      orderReducer: { order },
      match: { params },
      getOrderDetailsAction,
    } = this.props;

    const CustomRenderInput = ({ input, value, onClick, meta }) => {
      return (
        <InputTextComponent
          {...input}
          meta={meta}
          placeholder="Select Pickup Date"
          value={value}
          className={styles.input_text}
          onClick={onClick}
        />
      );
    };

    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <NavHeader
          title="Create Shipping Request"
          onBackClick={this.onBackPress}
        ></NavHeader>
        <InitialPageLoader
          initialPageApi={() => getOrderDetailsAction(params.orderId)}
        >
          <DivColumn className={styles.order_page_container}>
            <DivColumn className={styles.order_container}>
              <div className={styles.order_id}>
                Order ID: <b>{order.id}</b>
              </div>
              <div className={styles.placed_on}>
                Placed On: {order.created_at}
              </div>
              <div className={styles.status}>{order.status_label}</div>
            </DivColumn>
          </DivColumn>
          <div className={styles.header}>FILL IN THESE DETAILS</div>
          <Form
            onSubmit={this.onSubmit}
            validate={this.validate}
            // initialValues={{
            //   iban: bankDetails.iban ? bankDetails.iban : "",
            // }}
            //TODO: add time

            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form className={styles.form_container} onSubmit={handleSubmit}>
                <Field name="pickupDate">
                  {({ input, meta }) => (
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => {
                        this.setState({ startDate: date });
                        input.onChange(date.valueOf());
                      }}
                      minDate={new Date()}
                      customInput={
                        <CustomRenderInput meta={meta} input={input} />
                      }
                    />
                  )}
                </Field>
                <DivRow className={styles.form_button_container}>
                  <CapsuleButton type="submit" disabled={submitting}>
                    Create Request
                  </CapsuleButton>
                </DivRow>
              </form>
            )}
          />
          <div className={styles.header}>CUSTOMER DETAILS</div>
          <DivColumn className={styles.normal_container}>
            <DivRow className={styles.title}>
              Name:{" "}
              <div className={styles.value}>
                {order.customer_first_name} {order.customer_last_name}
              </div>
            </DivRow>
            <DivRow className={styles.title}>
              Email: <div className={styles.value}>{order.customer_email}</div>
            </DivRow>
          </DivColumn>
          <div className={styles.header}>PRODUCTS ORDERED</div>
          <DataTable
            columns={columns}
            customStyles={customStyles}
            data={order.items}
            style={{ minHeight: 200 }}
            noHeader={true}
          />
          <HorizontalBorder />
          <DivRow className={styles.address_container}>
            <DivColumn className={styles.address_item_container}>
              <div className={styles.title}>SHIPPING ADDRESS</div>
              <div className={styles.description}>
                <span>
                  Building 43B 4th Floor, Suite 402 Street Number 3 P.O. Box 593
                  Kuwait Safat 13006
                </span>
              </div>
            </DivColumn>

            <DivColumn className={styles.address_item_container}>
              <div className={styles.title}>BILLING ADDRESS</div>
              <div className={styles.description}>
                <span>
                  Building 43B 4th Floor, Suite 402 Street Number 3 P.O. Box 593
                  Kuwait Safat 13006
                </span>
              </div>
            </DivColumn>

            <HorizontalBorder />
            <DivColumn className={styles.address_item_container}>
              <div className={styles.title}>SHIPPING METHOD</div>
              <div className={styles.description}>Flat Rate - Flat Rate</div>
            </DivColumn>

            <DivColumn className={styles.address_item_container}>
              <div className={styles.title}>PAYMENT METHOD</div>
              <div className={styles.description}>Cash On Delivery</div>
            </DivColumn>
          </DivRow>
        </InitialPageLoader>
      </SectionedContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orderReducer: state.orderReducer,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    getOrderDetailsAction: bindActionCreators(getOrderDetailsAction, dispatch),
    createPickupRequestAction: bindActionCreators(
      createPickupRequestAction,
      dispatch
    ),
    showSuccessFlashMessage: bindActionCreators(
      showSuccessFlashMessage,
      dispatch
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(OrderShippingInformationPage));
