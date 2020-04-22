import React, { Component } from "react";
import styles from "./input_checkbox.module.scss";
import DivRow from "CommonComponents/divRow";
import translatorHoc from "Hoc/translatorHoc";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
  CheckBoxOutlineBlankOutlined,
  DescriptionOutlined,
  CheckBoxOutlined,
  FolderOutlined,
  FolderOpenOutlined,
  CheckOutlined,
  AddOutlined,
  RemoveOutlined,
  ChevronRightOutlined,
  KeyboardArrowDownOutlined,
} from "@material-ui/icons";

const nodes = [
  {
    value: "mars",
    label: "Mars",
    children: [
      {
        value: "phobos",
        label: "Phobos",
        children: [
          { value: "sample", label: "Phobos" },
          { value: "sample-2", label: "Deimos" },
        ],
      },
      { value: "deimos", label: "Deimos" },
    ],
  },
];

class InputCheckboxTreeComponent extends Component {
  state = {
    checked: [],
    expanded: [],
  };

  render() {
    return (
      <CheckboxTree
        nodes={nodes}
        checked={this.state.checked}
        expanded={this.state.expanded}
        onCheck={(checked) => this.setState({ checked })}
        onExpand={(expanded) => this.setState({ expanded })}
        showExpandAll={true}
        icons={{
          check: <CheckBoxOutlined />,
          uncheck: <CheckBoxOutlineBlankOutlined />,
          halfCheck: <CheckOutlined />,
          expandClose: <ChevronRightOutlined />,
          expandOpen: <KeyboardArrowDownOutlined />,
          expandAll: <AddOutlined />,
          collapseAll: <RemoveOutlined />,
          parentClose: <FolderOutlined />,
          parentOpen: <FolderOpenOutlined />,
          leaf: <DescriptionOutlined />,
        }}
      />
    );
  }
}

export default translatorHoc(InputCheckboxTreeComponent);
