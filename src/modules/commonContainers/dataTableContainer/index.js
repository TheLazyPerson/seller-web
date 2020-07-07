import React, { Component } from "react";
import DivColumn from "CommonComponents/divColumn";
import styles from "./data_table_container.module.scss";
import navigatorHoc from "Hoc/navigatorHoc";
import { logoutAction } from "Core/modules/signin/signinActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DataTable from "react-data-table-component";
import differenceBy from "lodash/differenceBy";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Delete from "@material-ui/icons/Delete";
import memoize from "memoize-one";
import SearchBarComponent from "CommonComponents/searchBarComponent";

const sortIcon = <ArrowDownward />;
const selectProps = { indeterminate: (isIndeterminate) => isIndeterminate };

const contextActions = memoize((deleteHandler) => (
  <IconButton color="secondary" onClick={deleteHandler}>
    <Delete />
  </IconButton>
));

class OrdersPage extends Component {
  state = {
    selectedRows: [],
    toggleCleared: false,
  };

  handleChange = (state) => {
    this.setState({ selectedRows: state.selectedRows });
  };

  handleRowClicked = (row) => {};

  deleteAll = () => {
    const { selectedRows } = this.state;
    const rows = selectedRows.map((r) => r.name);

    if (window.confirm(`Are you sure you want to delete:\r ${rows}?`)) {
      this.setState((state) => ({
        toggleCleared: !state.toggleCleared,
        data: differenceBy(state.data, state.selectedRows, "name"),
      }));
    }
  };

  render() {
    const { toggleCleared } = this.state;
    const { data, columns, title, isRTL } = this.props;
    return (
      <DivColumn className={styles.date_container}>
        <div style={{ marginBottom: 20 }}>
          <SearchBarComponent />
        </div>

        <Card>
          <DataTable
            title={title ? title : "Orders"}
            columns={columns ? columns : columns()}
            data={data}
            //TODO: Configure later
            // selectableRows
            highlightOnHover
            overflowY={false}
            defaultSortField="name"
            contextActions={contextActions(this.deleteAll)}
            sortIcon={sortIcon}
            selectableRowsComponent={Checkbox}
            selectableRowsComponentProps={selectProps}
            onSelectedRowsChange={this.handleChange}
            clearSelectedRows={toggleCleared}
            onRowClicked={this.handleRowClicked}
            pagination
            noHeader={true}
            direction={isRTL ? "rtl" : "ltr"}
            responsive={true}
            //TODO: Configure later
            // expandableRows
          />
        </Card>
      </DivColumn>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isRTL: state.languageReducer.isRTL,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    logoutAction: bindActionCreators(logoutAction, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(OrdersPage));
