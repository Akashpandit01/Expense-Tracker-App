export const initialState = {

  transactions:

    JSON.parse(
      localStorage.getItem(
        "transactions"
      )
    ) || []

};

function ExpenseReducer(
  state,
  action
) {

  switch (action.type) {

    // ADD

    case "ADD_TRANSACTION":

      const updatedTransactions = [

        ...state.transactions,

        action.payload

      ];

      localStorage.setItem(

        "transactions",

        JSON.stringify(
          updatedTransactions
        )

      );

      return {

        ...state,

        transactions:
          updatedTransactions

      };

    // DELETE

    case "DELETE_TRANSACTION":

      const filteredTransactions =

        state.transactions.filter(
          (item) =>
            item.id !==
            action.payload
        );

      localStorage.setItem(

        "transactions",

        JSON.stringify(
          filteredTransactions
        )

      );

      return {

        ...state,

        transactions:
          filteredTransactions

      };

    // EDIT

    case "EDIT_TRANSACTION":

      const updatedData =

        state.transactions.map(
          (item) =>

            item.id ===
            action.payload.id

              ? action.payload

              : item
        );

      localStorage.setItem(

        "transactions",

        JSON.stringify(
          updatedData
        )

      );

      return {

        ...state,

        transactions:
          updatedData

      };

    default:

      return state;
  }
}

export default ExpenseReducer;