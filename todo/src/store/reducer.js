const reducer = (state, action) => {
  switch (action.type) {
    case "toggleAddTask":
      return { ...state, openAddTask: !state.openAddTask };
    default:
      return { ...state };
  }
};

export default reducer;
