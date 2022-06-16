export type AuthEntityType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
  verifiedEmail: boolean;
  verificationLink: string;
  roles: string;
  password: string;
  currentRefreshToken: string;
  createdAt: Date;
  updatedAt: Date;
};
