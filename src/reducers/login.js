import {LOGIN,ORG_INFO} from '../actions';
let initState=window.localStorage.getItem('__INITIAL_LOGIN__');
let initLogin={
    account:'',
    password:'',
    rememberPassword:false,
};
if(initState){
    initLogin=JSON.parse(initState);
}
export default function login(state =initLogin, action) {
  switch (action.type) {
    case LOGIN.SUCCESS:
      return Object.assign({}, state,action.response)
    default:
      return state;
  }
}
