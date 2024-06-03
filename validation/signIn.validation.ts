const passPattern =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const signInValidator = (data: ISignInFormData): ISignInFormErrors | null => {
  const errData: ISignInFormErrors = {
    login: null,
    password: null,
  };

  if (typeof data.login !== "string") {
    errData.login = "Wrong Login type";
  } else if (data.login.length < 5 || data.login.length > 30) {
    errData.login = "Login or email is required";
  }

  if (typeof data.password !== "string") {
    errData.password = "Wrong password type";
  } else if (!passPattern.test(data.password)) {
    errData.password =
      "Wrong password (must contain UpperCase, LowerCase letter, number and special symbol)";
  }

  if (errData.login || errData.password) {
    return errData;
  }

  return null;
};

export default signInValidator;
