import { ADD_EMAIL_DADOS } from '../actions/addEmail';

const INNICIAL_STATE = {
  email: '', // string que armazena o email da pessoa usuária
};

const userReducer = (state = INNICIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EMAIL_DADOS:
    return { ...state, email: action.payload };
  default:
    return state;
  }
};

export default userReducer;
