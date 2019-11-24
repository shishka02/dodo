const initialState = "lux";

const TableChoice = (state = initialState, action) => {
  const o = {
    "set table choice": () => action.tasks
  };
  return o[action.type] ? o[action.type]() : state;
};

export default TableChoice;
