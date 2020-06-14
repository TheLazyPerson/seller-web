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

// const columns = memoize(() => [
//   {
//     name: "ID",
//     selector: "id",
//     sortable: true,
//   },
//   {
//     name: "ORDER DATE",
//     selector: "order_date",
//     sortable: true,
//   },
//   {
//     name: "EXHIBITION NAME",
//     selector: "exhibition_name",
//     sortable: true,
//     grow: 2,
//   },
//   {
//     name: "GRAND TOTAL",
//     selector: "grand_total",
//     sortable: true,
//   },
//   {
//     name: "TOTAL ITEMS",
//     selector: "total_items",
//     sortable: true,
//   },
//   {
//     name: "STATUS",
//     selector: "status",
//     sortable: true,
//   },
// ]);

class OrdersPage extends Component {
  state = {
    selectedRows: [],
    toggleCleared: false,
  };

  handleChange = (state) => {
    this.setState({ selectedRows: state.selectedRows });
  };

  handleRowClicked = (row) => {
    console.log(`${row.name} was clicked!`);
  };

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
    const { data, columns, title } = this.props;

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
            //TODO: Configure later
            // expandableRows
          />
        </Card>
      </DivColumn>
    );
  }
}

const mapDispathToProps = (dispatch) => {
  return {
    logoutAction: bindActionCreators(logoutAction, dispatch),
  };
};

export default connect(null, mapDispathToProps)(navigatorHoc(OrdersPage));
