import React, { Component } from "react";
export default class CustomNotification extends Component {
  render() {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          backgroundColor: "#69779b",
          borderRadius: 5,
          color: "#fff",
          padding: "5px 10px",
          borderLeft: "5px solid #30384c"
        }}
      >
        {/* <AlligatorAvatar/> */}
        <div>
          <h4>Alligator.io</h4>
          <p>Has joined the chat</p>
        </div>
      </div>
    );
  }
}
