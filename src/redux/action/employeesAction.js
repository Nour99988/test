import { adminTypes, employeesType } from "../contants/employeesType";

export const setEmployees = (payload) => {
  return {
    type: employeesType.SET_EMPLOYEES,
    payload: payload,
  };
};
export const setAdmin = (payload) => {
  return {
    type: adminTypes.SET_ADMIN,
    payload: payload,
  };
};
export const setMember = (payload) => {
  return {
    type: employeesType.SET_MEMBER,
    payload: payload,
  };
};
