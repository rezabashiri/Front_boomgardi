import Cookies from "js-cookie";
let key = "acc_token";

export const setJwt = token => {
  //localStorage.setItem(key, token);
  //document.cookie = "acc_token" + "=" + token;

  Cookies.set(key, token, { expires: 1 });
  //cookie.set(key, token);
  //setCookie("acc_token", token, { path: "/" });
};
export const getJwt = () => {
  let cookie = Cookies.get(key);
  console.log(cookie);
  return cookie;
  //return localStorage.getItem(key);
};
export const rmJwt = () => {
  Cookies.remove(key);
  //localStorage.removeItem(key);
};
