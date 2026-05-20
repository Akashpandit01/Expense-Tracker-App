import "../styles/Transactions.css";

import BottomNav from "../components/BottomNav";

import {
  useContext,
  useState
} from "react";

import {

  MdFastfood,
  MdShoppingBag,
  MdDirectionsBus,
  MdFlight,
  MdHome,
  MdHealthAndSafety,
  MdReceipt,
  MdInventory,
  MdEdit,
  MdMenu

} from "react-icons/md";

import {
  ExpenseContext
} from "../context/ExpenseContext";

import {
  useNavigate
} from "react-router-dom";

function Transactions() {

  const {

    transactions,

    deleteTransaction

  } = useContext(
    ExpenseContext
  );

  const navigate =
    useNavigate();

  const [search, setSearch] =
    useState("");

  const [selectedCategory,
    setSelectedCategory
  ] = useState("All");

  // Categories

  const categories = [

    "All",

    "Food",
    "Travel",

    "Transport",

    "Shopping",

    "Bills",

    "Health",

    "Rent",

    "Other"

  ];

  // Date Grouping

  const getFormattedDate =
    (dateString) => {

      const today =
        new Date();

      const yesterday =
        new Date();

      yesterday.setDate(
        today.getDate() - 1
      );

      const date =
        new Date(dateString);

      if (
        date.toDateString() ===
        today.toDateString()
      ) {

        return "Today";
      }

      if (
        date.toDateString() ===
        yesterday.toDateString()
      ) {

        return "Yesterday";
      }

      return date
        .toLocaleDateString();

    };

  // Filters

  const filteredTransactions =

    transactions.filter(
      (item) => {

        const matchesSearch =

          item.note
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )

          ||

          item.category
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesCategory =

          selectedCategory ===
            "All"

            ? true

            : item.category ===
            selectedCategory;

        return (

          matchesSearch &&
          matchesCategory

        );

      }
    );

  // Group Transactions

  const groupedTransactions = {};

  filteredTransactions.forEach(
    (item) => {

      const formattedDate =
        getFormattedDate(
          item.date
        );

      if (
        !groupedTransactions[
        formattedDate
        ]
      ) {

        groupedTransactions[
          formattedDate
        ] = [];

      }

      groupedTransactions[
        formattedDate
      ].push(item);

    }
  );

  return (

    <div className="transactions-page">

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

      {/* Search */}

      <div className="search-box">

        <input
          type="text"
          placeholder="Search transactions"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* Horizontal Chips */}

      <div className="filter-container">

        {categories.map((item) => (

          <button
            key={item}

            className={
              selectedCategory === item
                ? "active-chip"
                : ""
            }

            onClick={() =>
              setSelectedCategory(item)
            }
          >

            {item}

          </button>

        ))}

      </div>

      {/* Transactions */}

      <div className="transactions-list">

        {
          Object.keys(
            groupedTransactions
          ).length === 0 ? (

            <div className="empty-state">

              <p>
                No transactions found
              </p>

            </div>

          ) : (

            Object.keys(groupedTransactions)

              .sort((a, b) => {

                if (a === "Today") return -1;

                if (b === "Today") return 1;

                if (a === "Yesterday") return -1;

                if (b === "Yesterday") return 1;

                return 0;
              })

              .map((date) => (

                <div
                  className="date-group"
                  key={date}
                >

                  {/* Date */}

                  <p className="date-title">

                    {date}

                  </p>

                  {/* Cards */}

                  {
                    groupedTransactions[
                      date
                    ]
                      .slice()
                      .reverse()
                      .map((item) => (

                        <div
                          className="transaction-card"
                          key={item.id}
                        >

                          {/* Left */}

                          <div>

                            <h4 className="transaction-title">

                              <div className="transaction-icon">

                                {item.category === "Food" &&
                                  <MdFastfood size={18} />
                                }

                                {item.category === "Shopping" &&
                                  <MdShoppingBag size={18} />
                                }

                                {item.category === "Travel" &&
                                  <MdFlight size={18} />
                                }

                                {item.category === "Transport" &&
                                  <MdDirectionsBus size={18} />
                                }

                                {item.category === "Rent" &&
                                  <MdHome size={18} />
                                }

                                {item.category === "Health" &&
                                  <MdHealthAndSafety size={18} />
                                }

                                {item.category === "Bills" &&
                                  <MdReceipt size={18} />
                                }

                                {item.category === "Other" &&
                                  <MdInventory size={18} />
                                }

                              </div>

                              {item.note}

                            </h4>

                            <span>
                              {item.category}
                            </span>

                          </div>

                          {/* Right */}

                          <div className="right-section">

                            <p
                              className={
                                item.type ===
                                  "income"

                                  ? "income"

                                  : "expense"
                              }
                            >

                              {
                                item.type ===
                                  "income"

                                  ? "+"

                                  : "-"
                              }

                              ${item.amount}

                            </p>

                            <div className="action-buttons">

                              {/* Edit */}

                              <button
                                className="edit-btn"

                                onClick={() => {

                                  localStorage.setItem(

                                    "editTransaction",

                                    JSON.stringify(item)

                                  );

                                  navigate("/add");

                                }}
                              >

                                <MdEdit size={16} />

                              </button>

                              {/* Delete */}

                              <button
                                className="delete-btn"

                                onClick={() =>
                                  deleteTransaction(
                                    item.id
                                  )
                                }
                              >

                                Delete

                              </button>

                            </div>

                          </div>

                        </div>

                      ))
                  }

                </div>

              ))

          )
        }

      </div>

      <BottomNav />

    </div>
  );
}

export default Transactions;