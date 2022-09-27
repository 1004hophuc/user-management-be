export enum AccountRoles {
  SUPPER_ADMIN = 'admin-dev',
  ADMIN = 'admin',
  ADMIN_COMPANY = 'admin-company',
  MODE = 'mode',
  USER = 'user',
  MKT = 'marketing',
  ACCOUNTANT = 'accountant',
  HR = 'hr',
  STAFF = 'staff',
}

export const makeUid = (length: number) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
