export const mobileValidation = {
  required: { value: true, errorMessage: "موبایل الزامی است" },
  pattern: {
    value: "^09[0-9]+$",
    errorMessage: "موبایل را به شکل 09--------- وارد کنید"
  },
  minLength: {
    value: 11,
    errorMessage: "موبایل را  کامل وارد کنید"
  },
  maxLength: { value: 11 }
};
export const tellValidation = {
  required: { value: true, errorMessage: "تلفن الزامی است" },
  pattern: { value: "^0[0-9]+$", errorMessage: "تلفن را درست وارد کنید" },
  minLength: { value: 11, errorMessage: "تلفن را درست وارد کنید" },
  maxLength: { value: 11 }
};

export const codeMeliValidation = {
  required: { value: true, errorMessage: "کد ملی الزامی است" },
  pattern: { value: "^[0-9]+$", errorMessage: "کد ملی  را درست وارد کنید" },
  minLength: { value: 10, errorMessage: "کد ملی  را درست وارد کنید" },
  maxLength: { value: 10 }
};
export const nameValidation = {
  required: { value: true, errorMessage: "نام الزامی است" },
  pattern: {
    value: "^[A-Za-zا-ی ]+$",
    errorMessage: "نام فقط شامل کاراکتر است"
  },
  minLength: { value: 3, errorMessage: "نام باید حداقل 3 کاراکتر باشد" },
  maxLength: { value: 30 }
};

export const passwordValidation = {
  required: {
    value: true,
    errorMessage: "رمز عبور الزامی است"
  },
  minLength: {
    value: 6,
    errorMessage: "رمز عبور باید حداقل 6 کاراکتر باشد"
  },
  maxLength: { value: 30 }
};

export const confirmPasswordValidation = {
  required: {
    value: true,
    errorMessage: "تکرار رمز عبور الزامی است"
  },
  minLength: {
    value: 6,
    errorMessage: "رمز عبور باید حداقل 6 کاراکتر باشد"
  },
  maxLength: { value: 30 }
};
