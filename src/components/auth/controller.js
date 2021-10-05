const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const {
  retrieveUsersDb,
  insertUserDb,
  updateUserDb,
  removeUserDb,
} = require("./request");

async function retrieveUsers() {
  const users = await retrieveUsersDb();

  return users.length
    ? { status: 200, body: users }
    : { status: 404, body: "Any users found" };
}

async function insertUser({ email, password, role }) {
  const passwordHashed = bcrypt.hashSync(password, 8);

  const { created, status } = await insertUserDb(email, passwordHashed, role);

  return { status, body: created };
}

async function login({ email, password }) {
  const userFound = await retrieveUsersDb({ email });

  if (userFound.length === 0) return { status: 404, body: "User Not found" };

  const passwordIsValid = bcrypt.compareSync(password, userFound[0].password);

  if (!passwordIsValid) {
    return {
      status: 401,
      accessToken: null,
      message: "Invalid Password",
    };
  }

  const accessToken = jwt.sign(
    {
      id: userFound[0].id,
      email: userFound[0].email,
      role: userFound[0].role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 86400, // 24 hours
    }
  );

  return {
    status: 200,
    body: {
      accessToken,
    },
  };
}

async function updateUser(id, newData) {
  if (newData.password) newData.password = bcrypt.hashSync(newData.password, 8);

  const { modifiedCount } = await updateUserDb(id, newData);

  return modifiedCount
    ? { status: 200, body: "Updated successfully" }
    : { status: 403, body: "Nothing to update" };
}

async function removeUser(id) {
  const removed = await removeUserDb(id);

  return removed !== null
    ? { status: 200, body: "Deleted successfully" }
    : { status: 404, body: "Any record found" };
}

module.exports = {
  retrieveUsers,
  insertUser,
  login,
  updateUser,
  removeUser,
};
