import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  CHECK_LOGIN
} from "../actions";
import { sjcl } from "sjcl";

const user = (state = null, action) => {
  switch (action.type) {


    case LOGIN_REQUEST:
      return {...state, isFetching: true };

    case LOGIN_SUCCESS:
      sessionStorage.setItem("token", action.token);
      sessionStorage.setItem("email", action.email);
      return {...state,
        isFetching: false,
        token: action.token,
        email: action.email,
        lastUpdated: action.receivedAt
      };
    case CHECK_LOGIN:
      return (state && state.user.token);


    default:
      return state
  }
};

export default user;