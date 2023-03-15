export const EMAIL_REG_EXP = new RegExp(
  '/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/'
);
export const STRONG_PASSWORD_REG_EXP = new RegExp(
  '/^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{6,}$/'
);
export const USER_REG_EXP = new RegExp('/^[a-zA-Z0-9-]+$/');
