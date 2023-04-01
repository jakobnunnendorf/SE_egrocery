import React, { Component } from "react";
import "react-tabs/style/react-tabs.css";
import Tracking from "./Tracking/Tracking";
import RecurringOrders from "./RecurringOrders/RecurringOrders";
import PurchaseHistory from "./PurchaseHistory/PurchaseHistory";
import AccountInfo from "./AccountInfo/AccountInfo";
import mockData from "../mockUserData.js";
import "./MyAccount.css";

export default class MyAccount extends Component {
  state = {
    activeTab: "accountInformation",
  };

  handleTabClick = (tab) => {
    this.setState({ activeTab: tab });
  };

  renderTabContent = () => {
    const { activeTab } = this.state;

    switch (activeTab) {
      case "accountInformation":
        return <AccountInfo userData={mockData[0]} />;
      case "purchaseHistory":
        return <PurchaseHistory purchaseData={mockData[0].purchaseHistory}/>;
      case "tracking":
        return <Tracking />;
      case "groceryLists":
        return <RecurringOrders />;
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
          <button
            onClick={() => this.handleTabClick("groceryLists")}
            className="flex-grow-1 list-group-item list-group-item-action"
          >
            Grocery Lists
          </button>
        </div>
        <div >{this.renderTabContent()}</div>
      </div>
    );
  }
}
