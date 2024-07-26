import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export const hash = async (password: string) => {
  return bcrypt.hash(password, saltOrRounds);
};

export const verify = async (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};
