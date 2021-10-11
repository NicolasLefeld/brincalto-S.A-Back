const { userSchema } = require("../../schema/user");

async function retrieveUsersDb(filter = {}, projection = "") {
  return userSchema.find(filter, projection);
}

async function insertUserDb(email, password, role) {
  const user = await userSchema.find({ email });

  if (user.length) return false;

  const created = await userSchema.create({
    email,
    password,
    role,
  });

  return true;
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
