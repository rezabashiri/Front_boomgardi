import registerModel from "../models/registerModel.jsx";
import { userContext } from "../helpers/contextHelper";
import { loginContext } from "../helpers/contextHelper";
import authConfig from "../constants/defaultValues";
import swal from "sweetalert";

export default class registerService {
  async registerUser(model) {
    /*
    if (model.password != model.confirmPassword) {
      swal("پیغام", "رمز عبور با تایید رمز عبور برابر نیست", "warning");

      return;
    }*/
    userContext()
      .post(authConfig.registerUrl, model.getData())
      .then(response => {
        //return response.data;
        if (response.status === 201) {
          swal(
            "پیغام",
            "ثبت نام صورت پذیرفت لطفا از صفحه لاگین وارد شوید",
            "success"
          );
        }
      })
      .catch(e => {
        console.log(e);

        swal(
          "پیغام",
          "خطا : ثبت نام انجام نشد" + e.response.data.error,
          "warning"
        );
        return response.data;
      });
  }
}
