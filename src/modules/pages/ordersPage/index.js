import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import NavHeader from "CommonComponents/navHeader";
import CapsuleButton from "CommonComponents/capsuleButton";
import map from "lodash/map";
import styles from "./orders.module.scss";
import SideNav from "CommonComponents/sideNav";
import navigatorHoc from "Hoc/navigatorHoc";
import { logoutAction } from "Core/modules/signin/signinActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CookieService } from "Utils/cookieService";
import { USER_DATA_COOKIE } from "Constants/cookieConstants";
import DataTable, { createTheme } from 'react-data-table-component';
import differenceBy from 'lodash/differenceBy';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Delete from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/Add';
import memoize from 'memoize-one';

const sortIcon = <ArrowDownward />;
const selectProps = { indeterminate: isIndeterminate => isIndeterminate };
const actions = (
  <IconButton
    color="primary"
  >
    <Add />
  </IconButton>
);
const contextActions = memoize(deleteHandler => (
  <IconButton
    color="secondary"
    onClick={deleteHandler}
  >
    <Delete />
  </IconButton>
));

const columns = memoize(() => [
  {
    name: 'ID',
    selector: 'id',
    sortable: true,
  },
  {
    name: 'ORDER DATE',
    selector: 'order_date',
    sortable: true,
  },
  {
    name: 'EXHIBITION NAME',
    selector: 'exhibition_name',
    sortable: true,
    grow: 2,
  },
  {
    name: 'GRAND TOTAL',
    selector: 'grand_total',
    sortable: true,
  },
  {
    name: 'TOTAL ITEMS',
    selector: 'total_items',
    sortable: true,
  },
  {
    name: 'STATUS',
    selector: 'status',
    sortable: true,
  }
]);


class OrdersPage extends Component {
  state = {
    selectedRows: [], toggleCleared: false, data: [
      {
        id: 20,
        order_date: "16 Nov 2020",
        exhibtion_name: "Sample Name",
        grand_total: "KD 76 ",
        total_items: "7",
        status: "Pending"
      },
      {
        id: 20,
        order_date: "16 Nov 2020",
        exhibtion_name: "Sample Name",
        grand_total: "KD 76 ",
        total_items: "7",
        status: "Pending"
      }
    ]
  };

  handleChange = state => {
    this.setState({ selectedRows: state.selectedRows });
  };

  handleRowClicked = row => {

    console.log(`${row.name} was clicked!`);
  }

  deleteAll = () => {
    const { selectedRows } = this.state;
    const rows = selectedRows.map(r => r.name);

    if (window.confirm(`Are you sure you want to delete:\r ${rows}?`)) {
      this.setState(state => ({ toggleCleared: !state.toggleCleared, data: differenceBy(state.data, state.selectedRows, 'name') }));
    }
  }

  render() {
    const { data, toggleCleared } = this.state;

    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <DivColumn fillParent className={styles.orders_page_container}>


          {/* <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      // indeterminate={numSelected > 0 && numSelected < rowCount}
                      // checked={rowCount > 0 && numSelected === rowCount}
                      // onChange={onSelectAllClick}
                      // inputProps={{ "aria-label": "select all desserts" }}
                    />
                  </TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>ORDER DATE</TableCell>
                  <TableCell >EXHIBITION NAME</TableCell>
                  <TableCell>GRAND TOTAL</TableCell>
                  <TableCell >TOTAL ITEMS</TableCell>
                  <TableCell >STATUS</TableCell>
                  <TableCell >ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.id}>
                    <TableCell> <Checkbox /> </TableCell>
                    <TableCell >{row.id}</TableCell>
                    <TableCell >{row.order_date}</TableCell>
                    <TableCell >
                      {row.exhibtion_name}
                    </TableCell>
                    <TableCell >{row.grand_total}</TableCell>
                    <TableCell >{row.total_items}</TableCell>
                    <TableCell >{row.status}</TableCell>
                    <TableCell ></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> */}

          <Card style={{ height: '100%' }}>
            <DataTable
              title="Desserts"
              columns={columns()}
              data={data}
              selectableRows
              highlightOnHover
              defaultSortField="name"
              actions={actions}
              contextActions={contextActions(this.deleteAll)}
              sortIcon={sortIcon}
              selectableRowsComponent={Checkbox}
              selectableRowsComponentProps={selectProps}
              onSelectedRowsChange={this.handleChange}
              clearSelectedRows={toggleCleared}
              onRowClicked={this.handleRowClicked}
              pagination
              expandableRows
            />
          </Card>


        </DivColumn>
      </SectionedContainer>
    );
  }
}

const mapDispathToProps = dispatch => {
  return {
    logoutAction: bindActionCreators(logoutAction, dispatch)
  };
};

export default connect(
  null,
  mapDispathToProps
)(navigatorHoc(OrdersPage));
