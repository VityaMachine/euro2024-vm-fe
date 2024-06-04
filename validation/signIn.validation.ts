const passPattern =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const signInValidator = (data: ISignInFormData): ISignInFormErrors | null => {
  const errData: ISignInFormErrors = {
    login: null,
    password: null,
  };

  if (typeof data.login !== "string") {
    errData.login = "Невірний тип паролю";
  } else if (data.login.length < 5 || data.login.length > 30) {
    errData.login = "Логін або email є обов'язковими";
  }

  if (typeof data.password !== "string") {
    errData.password = "Wrong password type";
  } else if (!passPattern.test(data.password)) {
    errData.password =
      "Невірний пароль. Має містити 1 велику літеру, 1 малу літеру, число та спецсимвол. Символи кирилиці НЕДОСТУПНІ";
  }

  if (errData.login || errData.password) {
    return errData;
  }

  return null;
};

export default signInValidator;
