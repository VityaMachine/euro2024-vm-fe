
 interface ISignUpFormData {
  firstName: string;
  lastName: string;
  userName: string;
  birthDate: string;
  email: string;
  password: string;
  rePassword: string;
}

interface ISignInFormData {
  login: string;
  password: string;
}

interface ISignUpFormErrors {
  firstName: string | null;
  lastName: string | null;
  userName: string | null;
  birthDate: string | null;
  email: string | null;
  password: string | null;
  rePassword: string | null;
}

interface ISignInFormErrors {
  login: string | null;
  password: string | null;
}

interface IAuthUser {
  id: string;
  username: string;
  email: string;
  firstname: string;
  secondname: string;
  birthdate: string;
}

interface ISignInError {
  data: {
    message: string
  },
  status: number
}

interface IAuthContext {
  user: IAuthUser | null
  token: string;
  signIn: (login: string, password: string) => any;
  signOut: () => void;
}
