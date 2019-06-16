export const defaultMenuType = "menu-default"; // 'menu-default', 'menu-sub-hidden', 'menu-hidden';
export const defaultStartPath = "/app/dashboards/default";
export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = "fa";
export const localeOptions = [
  { id: "en", name: "English" },
  { id: "es", name: "Español" },
  { id: "fa", name: "فارسی" }
];

export const firebaseConfig = {
  apiKey: "AIzaSyBBksq-Asxq2M4Ot-75X19IyrEYJqNBPcg",
  authDomain: "gogo-react-login.firebaseapp.com",
  databaseURL: "https://gogo-react-login.firebaseio.com",
  projectId: "gogo-react-login",
  storageBucket: "gogo-react-login.appspot.com",
  messagingSenderId: "216495999563"
};

export const serverConfig = {
  baseUrl: "http://192.168.1.5:40679/api/",
  ostanUrl: "address/ostan",
  shahrestanUrl: "address/Shahrestan?codeostan=",
  bakhshUrl: "address/bakhsh?idShahrestan=",
  dehestanUrl: "address/Dehestan?IdBakhsh=",
  roostaUrl: "address/roosta?IdDehestan=",
  hostTypeUrl: "common/PersisService?type=residency",
  hostUrl: "residency/host"
};

const authConfig = {
  serverUrl: "http://auth.moroorgaran.com/",
  loginUrl: "login",
  registerUrl: "api/registers",
  userUrl: "api/users/",
  appKey: "5ED239940DBB2201427DF98038A1B56F1EC9D72DD62B8ACE6286F569C9280A4D"
};

export default authConfig;

export const searchPath = "/app/layouts/search";