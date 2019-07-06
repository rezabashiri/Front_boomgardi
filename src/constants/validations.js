export const mobileValidation = {
  required: { value: true },
  pattern: { value: "^09[0-9]+$" },
  minLength: { value: 11 },
  maxLength: { value: 11 }
};
export const tellValidation = {
  required: { value: true },
  pattern: { value: "^0[0-9]+$" },
  minLength: { value: 11 },
  maxLength: { value: 11 }
};

export const codeMeliValidation = {
  required: { value: true },
  pattern: { value: "^[0-9]+$" },
  minLength: { value: 10 },
  maxLength: { value: 10 }
};
export const nameValidation = {
  required: { value: true },
  pattern: { value: "^[A-Za-z]+$" },
  minLength: { value: 3 },
  maxLength: { value: 30 }
};
