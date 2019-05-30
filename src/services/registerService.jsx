import axios from "axios";
import registerModel from "../models/registerModel.jsx";
import auth from "../constants/defaultValues";

export default class registerService {
  async registerUser(model) {
    if (model.password != model.confirmPassword) {
      alert("رمز عبور با تایید رمز عبور برابر نیست");
      return;
    }
    axios
      .post(auth.serverUrl + auth.registerUrl, model.getData())
      .then(response => {
        if (response.status == 200) {
          alert("ثبت نام صورت پذیرفت لطفا از صفحه لاگین وارد شوید");
        }
      })
      .catch(e => {
        console.log(e.response.data.error);
        alert(e.response.data.error);
      });
  }
}
