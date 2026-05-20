import "../styles/Dashboard.css";
import {

  MdFastfood,
  MdShoppingBag,
  MdDirectionsBus,
  MdFlight,
  MdHome,
  MdHealthAndSafety,
  MdReceipt,
  MdInventory,
  MdEdit

} from "react-icons/md";
import BottomNav from "../components//BottomNav";
import { MdMenu } from "react-icons/md";
import {
  useContext
} from "react";

import {
  ExpenseContext
} from "../context/ExpenseContext";

function Dashboard() {

  const { transactions } =
    useContext(ExpenseContext);

  // Total Income

  const totalIncome =
    transactions
      .filter(
        item => item.type === "income"
      )
      .reduce(
        (acc, item) =>
          acc + item.amount,
        0
      );

  // Total Expense

  const totalExpense =
    transactions
      .filter(
        item => item.type === "expense"
      )
      .reduce(
        (acc, item) =>
          acc + item.amount,
        0
      );

  // Balance

  const totalBalance =
    totalIncome - totalExpense;

  return (

    <div className="dashboard">

      {/* Header */}

      <div className="header">

        <div className="header-left">

          <MdMenu className="menu-icon" />

          <h3>Financial Serenity</h3>

        </div>

        <div className="profile">
          A
        </div>

      </div>

      {/* Balance */}

      <div className="balance-section">

        <p className="balance-title">
          TOTAL BALANCE
        </p>

        <h1>
          ${totalBalance}
        </h1>

        <span>
          Updated in real-time
        </span>

      </div>

      {/* Summary Cards */}

      <div className="summary-container">

        <div className="summary-card">

          <p>INCOME</p>

          <h2>
            ${totalIncome}
          </h2>

        </div>

        <div className="summary-card">

          <p>EXPENSE</p>

          <h2>
            ${totalExpense}
          </h2>

        </div>

      </div>

      {/* Analytics Banner */}

      <div className="analytics-banner">

        <h3>Spend Analytics</h3>

        <p>
          Track your expenses
          efficiently
        </p>

      </div>

      {/* Recent Activity */}

      <div className="recent-header">

        <h3>Recent Activity</h3>

      </div>

      {/* Transactions */}

      <div className="transactions-list">

        {transactions.length === 0 ? (

          <div className="empty-state">

            <p>
              No Transactions Yet
            </p>

          </div>

        ) : (

          transactions
            .slice(-5)
            .reverse()
            .map((item) => (

              <div
                className="transaction-item"
                key={item.id}
              >

                <div>

                  <h4 className="transaction-title">

                    {item.category === "Food" && (
                      <MdFastfood size={20} />
                    )}

                    {item.category === "Shopping" && (
                      <MdShoppingBag size={20} />
                    )}

                    {item.category === "Travel" && (
                      <MdFlight size={20} />
                    )}

                    {item.category === "Rent" && (
                      <MdHome size={20} />
                    )}

                    {item.category === "Health" && (
                      <MdHealthAndSafety size={20} />
                    )}

                    {item.category === "Bills" && (
                      <MdReceipt size={20} />
                    )}

                    {item.category === "Other" && (
                      <MdInventory size={20} />
                    )}

                    {item.note || item.category}

                  </h4>

                  <div className="transaction-meta">

                    <p>
                      {item.category}
                    </p>

                    {/* <small>

                      {
                        new Date(item.date)
                          .toLocaleDateString(
                            "en-IN",
                            {

                              day: "numeric",

                              month: "short",

                              year: "numeric"

                            }
                          )
                      }

                    </small> */}

                  </div>

                </div>

                <div className="amount-section-right">

                  <span
                    className={
                      item.type === "income"

                        ? "income-text"

                        : "expense-text"
                    }
                  >

                    {
                      item.type === "income"
                        ? "+"
                        : "-"
                    }

                    ${item.amount}

                  </span>

                  <small>

                    {
                      new Date(item.date)
                        .toLocaleDateString(
                          "en-IN",
                          {

                            day: "numeric",

                            month: "short"

                          }
                        )
                    }

                  </small>

                </div>

              </div>

            ))

        )}

      </div>

      <BottomNav />

    </div>

  );
}

export default Dashboard;