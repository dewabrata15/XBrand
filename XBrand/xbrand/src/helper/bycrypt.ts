import bcrypt from "bcryptjs";

export const hashing = (planText: string) => {
  return bcrypt.hashSync(planText, bcrypt.genSaltSync(10));
};

export const comaprePass = (planText: string, password: string) => {
  return bcrypt.compareSync(planText, password);
};
