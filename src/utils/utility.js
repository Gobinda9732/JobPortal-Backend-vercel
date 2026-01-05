import bcrypt from "bcryptjs";

const validatePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

const hashedPassword = (password) => {
  return bcrypt.hashSync(password, Number(process.env.HASH_SALT));
};

export { validatePassword, hashedPassword };
