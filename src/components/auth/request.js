const { userSchema } = require("../../schema/user");

async function retrieveUsersRecords(filter = {}) {
  return userSchema.find(filter);
}

async function insertUserRecord(email, password, role) {
  const user = await userSchema.find({ email });

  if (user.length) return { created: "User already exist", status: 200 };

  const created = await userSchema.create({
    email,
    password,
    role,
  });

  return { created: "User created successfully", status: 201 };
}

async function updateUserRecord(id, newData) {
  return userSchema.updateOne({ _id: id }, newData);
}

async function removeUserRecord(id) {
  return userSchema.findByIdAndDelete(id);
}

module.exports = {
  retrieveUsersRecords,
  insertUserRecord,
  updateUserRecord,
  removeUserRecord
};
