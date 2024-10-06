import { body } from "express-validator";

function isValidMobileNumber(mobileNumber) {
  const mobileStr = String(mobileNumber);

  return mobileStr.length === 10;
}
function isValidPassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return passwordRegex.test(password);
}

export const validationRules = () => {
  return [
    body("name").notEmpty().withMessage("Name is Required"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("mobile").custom((value) => {
      if (!isValidMobileNumber(value)) {
        throw new Error("Invalid Mobile Number");
      }
      return true;
    }),
    body("password").custom((value) => {
      if (!isValidPassword(value)) {
        throw new Error(
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
        );
      }
      return true;
    }),
  ];
};
