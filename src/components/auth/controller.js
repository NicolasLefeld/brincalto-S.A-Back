const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const {
  retrieveUsersRecords,
  insertUserRecord,
  updateUserRecord,
  removeUserRecord,
} = require("./request");

async function retrieveUsers() {
  const records = await retrieveUsersRecords();

  const recordsMapped = records.map(({ role, username, email, _id }) => {
    return { role, username, email, _id };
  });

  if (recordsMapped.length > 0) return { status: 200, body: recordsMapped };
  return { status: 404, body: "Users not found" };
}

async function insertUser({ username, email, password, role }) {
  const passwordHashed = bcrypt.hashSync(password, 8);

  const { created, status } = await insertUserRecord(
    username,
    email,
    passwordHashed,
    role
  );

  if (created) return { status, body: created };
  return { status: 500 };
}

async function login({ username, password }) {
  const userFound = await retrieveUsersRecords({ username });

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
      username: userFound[0].username,
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
  
  const { nModified, ok } = await updateUserRecord(id, newData);

  if (ok) return { status: 200, body: { nModified, ok } };
  return { status: 404 };
}

async function removeUser(id) {
  const removed = await removeUserRecord(id);

  if (removed !== null) return { status: 200 };
  return { status: 404 };
}

module.exports = {
  retrieveUsers,
  insertUser,
  login,
  updateUser,
  removeUser,
};
