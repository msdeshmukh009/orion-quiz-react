type LogInUserInput = {
  email: string;
  password: string;
};

type UserDetailType = {
  firstName: string;
  lastName: string;
  confirmPassword: string;
  agreement: string;
};

export type { LogInUserInput, UserDetailType };
