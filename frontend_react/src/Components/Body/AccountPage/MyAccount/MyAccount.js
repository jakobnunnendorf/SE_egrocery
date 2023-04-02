import React, { Component } from "react";
import "react-tabs/style/react-tabs.css";
import Tracking from "./Tracking/Tracking";
import AdminPanel from "./AdminPanel/AdminPanel";
import PurchaseHistory from "./PurchaseHistory/PurchaseHistory";
import AccountInfo from "./AccountInfo/AccountInfo";
import "./MyAccount.css";

export default class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "accountInformation",
    };
  }

  handleTabClick = (tab) => {
    this.setState({ activeTab: tab });
  };

  renderTabContent = () => {
    const { activeTab } = this.state;

    switch (activeTab) {
      case "accountInformation":
        return <AccountInfo
          userData={this.props.loggedInUser} />;
      case "purchaseHistory":
        return (
          <PurchaseHistory
            purchaseData={this.props.loggedInUser.purchaseHistory}
          />
        );
      case "tracking":
        return <Tracking status={this.props.loggedInUser.purchaseHistory[1].status} />;  //input can be either processing, shipped, or delivered
      case "groceryLists":
        return <AdminPanel />;
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="container">
        <div className="d-flex navb">
          <button
            onClick={() => this.handleTabClick("accountInformation")}
            className="flex-grow-1 list-group-item list-group-item-action"
          >
            Account Information
          </button>
          <button
            onClick={() => this.handleTabClick("purchaseHistory")}
            className="flex-grow-1 list-group-item list-group-item-action"
          >
            Purchase History
          </button>
          <button
            onClick={() => this.handleTabClick("tracking")}
            className="flex-grow-1 list-group-item list-group-item-action"
          >
            Tracking
          </button>
          {this.props.loggedInUser.role === "admin" && <button
            onClick={() => this.handleTabClick("groceryLists")}
            className="flex-grow-1 list-group-item list-group-item-action"
          >
            Admin Panel
          </button>}
        </div>
        <div >{this.renderTabContent()}</div>
      </div>
    );
  }
}
