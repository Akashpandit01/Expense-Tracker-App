import {
  createContext,
  useReducer
} from "react";

import ExpenseReducer,
{
  initialState
} from "./ExpenseReducer";

export const ExpenseContext =
  createContext();

function ExpenseProvider({
  children
}) {

  const [state, dispatch] =
    useReducer(
      ExpenseReducer,
      initialState
    );

  // Add

  const addTransaction = (
    transaction
  ) => {

    dispatch({

      type:
        "ADD_TRANSACTION",

      payload:
        transaction

    });

  };

  // Delete

  const deleteTransaction =
    (id) => {

      dispatch({

        type:
          "DELETE_TRANSACTION",

        payload: id

      });

    };

  // Edit

  const editTransaction = (
    transaction
  ) => {

    dispatch({

      type:
        "EDIT_TRANSACTION",

      payload:
        transaction

    });

  };

  return (

    <ExpenseContext.Provider

      value={{

        transactions:
          state.transactions,

        addTransaction,

        deleteTransaction,

        editTransaction

      }}
    >

      {children}

    </ExpenseContext.Provider>

  );
}

export default ExpenseProvider;