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

interface IAuthContext {
  user: {
    userName: string,
    userId: string,
  },
  token: string,
  getUser: (token: string) => void
  signIn: (login: string, password: string) => void;
  signOut: () => void
}