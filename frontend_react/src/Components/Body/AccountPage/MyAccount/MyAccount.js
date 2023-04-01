import React, { Component } from "react";
import "react-tabs/style/react-tabs.css";
import Tracking from "./Tracking/Tracking";
import RecurringOrders from "./RecurringOrders/RecurringOrders";
import PurchaseHistory from "./PurchaseHistory/PurchaseHistory";
import AccountInfo from "./AccountInfo/AccountInfo";
import mockData from "../mockUserData.js";

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
        return <PurchaseHistory />;
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
        <div className="row">
          <div className="col-md-4">
            <div className="list-group">
              <button
                onClick={() => this.handleTabClick("accountInformation")}
                className="list-group-item list-group-item-action"
              >
                Account Information
              </button>
              <button
                onClick={() => this.handleTabClick("purchaseHistory")}
                className="list-group-item list-group-item-action"
              >
                Purchase History
              </button>
              <button
                onClick={() => this.handleTabClick("tracking")}
                className="list-group-item list-group-item-action"
              >
                Tracking
              </button>
              <button
                onClick={() => this.handleTabClick("groceryLists")}
                className="list-group-item list-group-item-action"
              >
                Grocery Lists
              </button>
            </div>
          </div>
          <div className="col-md-8">{this.renderTabContent()}</div>
        </div>
      </div>
    );
  }
}
