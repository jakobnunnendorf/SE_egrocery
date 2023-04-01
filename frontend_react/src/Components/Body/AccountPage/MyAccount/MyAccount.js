import React, { Component } from "react";
import "react-tabs/style/react-tabs.css";

export default class MyAccount extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="list-group">
              <a
                href="#accountInformation"
                className="list-group-item list-group-item-action"
                data-toggle="list"
                role="tab"
              >
                Account Information
              </a>
              <a
                href="#purchaseHistory"
                className="list-group-item list-group-item-action"
                data-toggle="list"
                role="tab"
              >
                Purchase History
              </a>
              <a
                href="#tracking"
                className="list-group-item list-group-item-action"
                data-toggle="list"
                role="tab"
              >
                Tracking
              </a>
              <a
                href="#groceryLists"
                className="list-group-item list-group-item-action"
                data-toggle="list"
                role="tab"
              >
                Grocery Lists
              </a>
            </div>
          </div>
          <div className="col-md-8">
            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="accountInformation"
                role="tabpanel"
              >
                <h3>Account Information</h3>
                {/* Add your account information content here */}
              </div>
              <div
                className="tab-pane fade"
                id="purchaseHistory"
                role="tabpanel"
              >
                <h3>Purchase History</h3>
                {/* Add your purchase history content here */}
              </div>
              <div className="tab-pane fade" id="tracking" role="tabpanel">
                <h3>Tracking</h3>
                {/* Add your tracking content here */}
              </div>
              <div className="tab-pane fade" id="groceryLists" role="tabpanel">
                <h3>Grocery Lists</h3>
                {/* Add your grocery lists content here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
