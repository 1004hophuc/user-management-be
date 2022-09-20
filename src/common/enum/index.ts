export enum StaffRoles {
  MKT = 'marketing',
  ACCOUNTANT = 'accountant',
  HR = 'hr',
  STAFF = 'staff',
}

export enum AccountRoles {
  ADMIN_DEV = 'admin-dev',
  ADMIN_COMPANY = 'admin-company',
  USER = 'user',
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
