import { combineReducers } from "redux";
import { setAdmin, SetEmployeesReducer, setMember } from "./employeesReducer";

const reducer = combineReducers({
  allMembers: SetEmployeesReducer,
  isAdmin: setAdmin,
  member: setMember,
});

export default reducer;
