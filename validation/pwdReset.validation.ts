const emailPattern = new RegExp(
  "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}"
);
const passPattern =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const today = new Date();

const resetPwdValidator = (data: IResetPwdFormData): IResetPwdErrors | null => {
  const errData: IResetPwdErrors = {
    password: null,
    rePassword: null,
  };

  if (typeof data.password !== "string") {
    errData.password = "Wrong password type";
    errData.rePassword = "Wrong password type";
  } else if (
    !passPattern.test(data.password) ||
    data.password !== data.repeatPassword
  ) {
    errData.password =
      "Невірний пароль. Має містити 1 велику літеру, 1 малу літеру, число та спецсимвол. Символи кирилиці НЕДОСТУПНІ. Пароль та повторений пароль мають бути однакові";
    errData.rePassword =
      "Невірний пароль. Має містити 1 велику літеру, 1 малу літеру, число та спецсимвол. Символи кирилиці НЕДОСТУПНІ. Пароль та повторений пароль мають бути однакові";
  }

  if (errData.password || errData.rePassword) {
    return errData;
  }

  return null;
};

export default resetPwdValidator;
