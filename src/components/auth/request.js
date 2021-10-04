const { userSchema } = require("../../schema/user");

async function retrieveUsersDb(filter = {}) {
  return userSchema.find(filter);
}

async function insertUserDb(email, password, role) {
  const user = await userSchema.find({ email });

  if (user.length) return { created: "User already exist", status: 200 };

  const created = await userSchema.create({
    email,
    password,
    role,
  });

  return { created: "User created successfully", status: 201 };
}

async function updateUserDb(id, newData) {
  return userSchema.updateOne({ _id: id }, newData);
}

async function removeUserDb(id) {
  return userSchema.findByIdAndDelete(id);
}

module.exports = {
  retrieveUsersDb,
  insertUserDb,
  updateUserDb,
  removeUserDb
};
