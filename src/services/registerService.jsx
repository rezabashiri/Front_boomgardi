import axios from "axios";
import registerModel from "../models/registerModel.jsx";
import auth from "../constants/defaultValues";
import { userContext } from "../helpers/contextHelper";
import { loginContext } from "../helpers/contextHelper";

export default class registerService {
  async registerUser(model) {
    /*
    if (model.password != model.confirmPassword) {
      alert("رمز عبور با تایید رمز عبور برابر نیست");
      return;
    }*/
    try {
      let response = await userContext().post(
        auth.registerUrl,
        model.getData()
      );
      return response.data;
      /*.then(response => {
        if (response.status == 201) {
          alert("ثبت نام صورت پذیرفت لطفا از صفحه لاگین وارد شوید");
          return true;
          return response;
        }
      })*/
    } catch (e) {}
    /* catch(e => {
        console.log(e.response.data.error);
        alert(e.response.data.error);
      });*/
  }
}
