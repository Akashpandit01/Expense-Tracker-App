import "../styles/AddTransaction.css";

import BottomNav from "../components/BottomNav";

import {
  useContext,
  useState
} from "react";

import {
  ExpenseContext
} from "../context/ExpenseContext";

import {
  useNavigate
} from "react-router-dom";

import {

  MdFastfood,
  MdFlight,
  MdShoppingBag,
  MdReceipt,
  MdHealthAndSafety,
  MdHome,
  MdInventory

} from "react-icons/md";

function AddTransaction() {

  const {

    addTransaction,

    editTransaction

  } = useContext(
    ExpenseContext
  );

  const navigate =
    useNavigate();

  // Edit Data

  const editingData =

    JSON.parse(
      localStorage.getItem(
        "editTransaction"
      )
    );

  // States

  const [type, setType] =
    useState(
      editingData?.type ||
      "expense"
    );

  const [amount, setAmount] =
    useState(
      editingData?.amount || ""
    );

  const [category, setCategory] =
    useState(
      editingData?.category ||
      "Food"
    );

  const [note, setNote] =
    useState(
      editingData?.note || ""
    );

  const [date, setDate] =
    useState(

      editingData?.date

        ? editingData.date
            .split("T")[0]

        : new Date()
            .toISOString()
            .split("T")[0]
    );

  // Categories

  const categories = [

    {
      name: "Food",
      icon:
        <MdFastfood size={22} />
    },

    {
      name: "Travel",
      icon:
        <MdFlight size={22} />
    },

    {
      name: "Shopping",
      icon:
        <MdShoppingBag size={22} />
    },

    {
      name: "Bills",
      icon:
        <MdReceipt size={22} />
    },

    {
      name: "Health",
      icon:
        <MdHealthAndSafety size={22} />
    },

    {
      name: "Rent",
      icon:
        <MdHome size={22} />
    },

    {
      name: "Other",
      icon:
        <MdInventory size={22} />
    }

  ];

  // Submit

  const handleSubmit = () => {

    if (
      !amount ||
      !note
    ) {

      alert(
        "Please fill all fields"
      );

      return;
    }

    const transaction = {

      id:
        editingData?.id ||
        Date.now(),

      type,

      amount:
        Number(amount),

      category,

      note,

      date

    };

    // Edit

    if (editingData) {

      editTransaction(
        transaction
      );

      localStorage.removeItem(
        "editTransaction"
      );

    }

    // Add

    else {

      addTransaction(
        transaction
      );

    }

    navigate("/");

  };

  return (

    <div className="add-page">

      {/* Header */}

      <div className="add-header">

        <h2>

          {
            editingData

              ? "Edit Transaction"

              : "Add Transaction"
          }

        </h2>

      </div>

      {/* Toggle */}

      <div className="toggle-container">

        <button
          className={
            type === "expense"

              ? "active-toggle"

              : ""
          }

          onClick={() =>
            setType("expense")
          }
        >

          Expense

        </button>

        <button
          className={
            type === "income"

              ? "active-toggle"

              : ""
          }

          onClick={() =>
            setType("income")
          }
        >

          Income

        </button>

      </div>

      {/* Amount */}

      <div className="amount-section">

        <span>$</span>

        <input
          type="number"
          placeholder="0"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
        />

      </div>

      {/* Category Heading */}

      <div className="category-heading">

        <p>
          CATEGORY
        </p>

      </div>

      {/* Categories */}

      <div className="category-grid">

        {
          categories.map((item) => (

            <div
              key={item.name}

              className={
                category === item.name

                  ? "category-item active-category"

                  : "category-item"
              }

              onClick={() =>
                setCategory(item.name)
              }
            >

              <div className="category-icon">

                {item.icon}

              </div>

              <p>
                {item.name}
              </p>

            </div>

          ))
        }

      </div>

      {/* Date */}

      <div className="date-heading">

        <p>
          DATE
        </p>

      </div>

      <div className="date-input-container">

        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
        />

      </div>

      {/* Note */}

      <div className="note-heading">

        <p>
          NOTE
        </p>

      </div>

      <div className="form-group">

        <input
          type="text"
          placeholder="Add note"
          value={note}
          onChange={(e) =>
            setNote(e.target.value)
          }
        />

      </div>

      {/* Button */}

      <button
        className="save-btn"
        onClick={handleSubmit}
      >

        {
          editingData

            ? "Update Transaction"

            : "Save Transaction"
        }

      </button>

      <BottomNav />

    </div>

  );
}

export default AddTransaction;