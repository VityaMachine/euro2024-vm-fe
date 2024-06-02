const emailPattern = new RegExp(
  "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}"
);
const passPattern =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const today = new Date();

const signUpValidator = (data: ISignUpFormData): ISignUpFormErrors | null => {
  const errData: ISignUpFormErrors = {
    firstName: null,
    lastName: null,
    userName: null,
    birthDate: null,
    email: null,
    password: null,
    rePassword: null,
  };

  const bdayDate = new Date(data.birthDate);

  if (typeof data.firstName !== "string") {
    errData.firstName = "Wrong First name type";
  }

  if (data.firstName.length < 3 || data.firstName.length > 30) {
    errData.firstName = "First name is required (min 3 symbols)";
  }

  if (typeof data.lastName !== "string") {
    errData.lastName = "Wrong Last name type";
  } else if (data.lastName.length < 3 || data.lastName.length > 30) {
    errData.lastName = "Last name is required (min 3 symbols)";
  }

  if (typeof data.userName !== "string") {
    errData.userName = "Wrong Login type";
  } else if (data.userName.length < 5 || data.userName.length > 30) {
    errData.userName = "Login is required (min 5 symbols)";
  }

  if (typeof data.birthDate !== "string") {
    errData.birthDate = "Wrong birth date type";
  } else if (data.birthDate.length < 10) {
    errData.birthDate = "Birth date is required";
  } else if (bdayDate > today) {
    errData.birthDate = "Birth date cant be grater then today";
  }

  if (typeof data.email !== "string") {
    errData.email = "Wrong email type";
  } else if (!emailPattern.test(data.email)) {
    errData.email = "Wrong email";
  }

  if (typeof data.password !== "string") {
    errData.password = "Wrong password type";
    errData.rePassword = "Wrong password type";
  } else if (
    !passPattern.test(data.password) ||
    data.password !== data.rePassword
  ) {
    errData.password =
      "Wrong password (must contain UpperCase, LowerCase letter, number and special symbol). Password and repeat password must be equal";
    errData.rePassword =
      "Wrong password (must contain UpperCase, LowerCase letter, number and special symbol). Password and repeat password must be equal";
  }

  if (
    errData.birthDate ||
    errData.email ||
    errData.firstName ||
    errData.lastName ||
    errData.password ||
    errData.rePassword ||
    errData.userName
  ) {
    return errData;
  }

  return null;
};

export default signUpValidator;
