//factory
import { makeReactiveVar } from './make-reactvar';

const authVarId = '_auth_data';
//reacte-var o valor some ao fechar o navegador
// armezar no localstorage para poder pegar depois
const initialValue = {
  userName: '',
  userId: '',
  isLoggedIn: false,
};

export const authDataManager = makeReactiveVar(initialValue, authVarId);

export const useAuthVar = authDataManager.useHook;
