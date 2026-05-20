import "../styles/Analytics.css";

import BottomNav from "../components/BottomNav";

import {
  useContext
} from "react";

import {
  ExpenseContext
} from "../context/ExpenseContext";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis
} from "recharts";

function Analytics() {

  const { transactions } =
    useContext(ExpenseContext);

  // Expense Transactions

  const expenses =
    transactions.filter(
      item => item.type === "expense"
    );

  // Total Expense

  const totalExpense =
    expenses.reduce(
      (acc, item) =>
        acc + Number(item.amount),
      0
    );

  // Category Breakdown

  const categoryMap = {};

  expenses.forEach((item) => {

    if (categoryMap[item.category]) {

      categoryMap[item.category] +=
        Number(item.amount);

    } else {

      categoryMap[item.category] =
        Number(item.amount);

    }

  });

  const chartData =
    Object.keys(categoryMap).map(
      (key) => ({

        name: key,

        value: categoryMap[key]

      })
    );

  // Trend Data

  const trendData = [

    { month: "May", amount: 1200 },

    { month: "Jun", amount: 1800 },

    { month: "Jul", amount: 1400 },

    { month: "Aug", amount: 2200 },

    { month: "Sep", amount: 1700 },

    { month: "Oct", amount: totalExpense }

  ];

  const COLORS = [
    "#000000",
    "#4F6F52",
    "#9e9e9e",
    "#d6d6d6",
    "#777777"
  ];

  return (

    <div className="analytics-page">

      {/* Header */}

      <div className="analytics-header">

        <div className="menu-logo">

          <span>☰</span>

          <h2>
            Financial Serenity
          </h2>

        </div>

        <div className="profile">
          A
        </div>

      </div>

      {/* Period */}

      <div className="period-section">

        <button>
          &#8249;
        </button>

        <div>
          <p>CURRENT PERIOD</p>

          <h3>
            {new Date().toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h3>
        </div>

        <button>
          &#8250;
        </button>

      </div>

      {/* Expense Card */}

      <div className="expense-card">

        <div className="expense-line"></div>

        <div>

          <p>
            TOTAL EXPENDITURE
          </p>

          <h1>
            ${totalExpense}
          </h1>

          <span>
            ↓ 12% less than September
          </span>

        </div>

      </div>

      {/* Chart */}

      <div className="chart-container">

        <p className="chart-title">

          SPENDING BREAKDOWN

        </p>

        {
          chartData.length === 0 ? (

            <div className="empty-state">

              <p>
                No expense data
              </p>

            </div>

          ) : (

            <>
              <ResponsiveContainer
                width="100%"
                height={320}
              >

                <PieChart>

                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    dataKey="value"
                  >

                    {
                      chartData.map(
                        (entry, index) => (

                          <Cell
                            key={index}
                            fill={
                              COLORS[
                              index %
                              COLORS.length
                              ]
                            }
                          />

                        )
                      )
                    }

                  </Pie>

                </PieChart>

              </ResponsiveContainer>

              <div className="chart-center">

                <h3>

                  {
                    chartData.length > 0

                      ? `${Math.round(
                        (
                          chartData[0]
                            .value /

                          totalExpense
                        ) * 100
                      )}%`

                      : "0%"
                  }

                </h3>

                <p>

                  {
                    chartData.length > 0

                      ? chartData[0]
                        .name
                        .toUpperCase()

                      : "NO DATA"
                  }

                </p>

              </div>
            </>

          )
        }

      </div>

      {/* Breakdown */}

      <div className="category-breakdown">

        {
          chartData.map(
            (item, index) => {

              const percentage = (

                (
                  item.value /
                  totalExpense
                ) * 100

              ).toFixed(0);

              return (

                <div
                  className="category-row"
                  key={item.name}
                >

                  <div className="category-left">

                    <div
                      className="category-dot"

                      style={{
                        background:
                          COLORS[index]
                      }}
                    ></div>

                    <div>

                      <p>
                        {item.name}
                      </p>

                      <span>
                        {percentage}%
                      </span>

                    </div>

                  </div>

                  <h4>
                    ${item.value}
                  </h4>

                </div>

              );

            }
          )
        }

      </div>

      {/* Button */}

      <button className="report-btn">

        VIEW DETAILED REPORT

      </button>

      {/* Trend */}

      <div className="trend-section">

        <p>
          6-MONTH TREND
        </p>

        <div className="trend-box">

          <ResponsiveContainer
            width="100%"
            height={180}
          >

            <BarChart data={trendData}>

              <XAxis
                dataKey="month"
              />

              <Bar
                dataKey="amount"
                fill="#111"
                radius={[10, 10, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      <BottomNav />

    </div>

  );
}

export default Analytics;