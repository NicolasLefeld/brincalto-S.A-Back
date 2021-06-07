const {
  retrieveVehicleRecords, insertVehicleRecord, updateVehicleRecord, removeVehicleRecord,
} = require('./request');

async function retrieveVehicle() {
  const records = await retrieveVehicleRecords();

  if (records.length > 0) return { status: 200, body: records };
  return { status: 404 };
}

async function insertVehicle(plate, comment) {
  const created = await insertVehicleRecord(plate, comment);

  if (created) return { status: 201, body: created };
  return { status: 404 };
}

async function updateVehicle(id, newData) {
  const { nModified, ok } = await updateVehicleRecord(id, newData);

  if (ok) return { status: 200, body: { nModified, ok } };
  return { status: 404 };
}

async function removeVehicle(id) {
  const removed = await removeVehicleRecord(id);

  if (removed !== null) return { status: 200 };
  return { status: 404 };
}

module.exports = {
  retrieveVehicle, insertVehicle, updateVehicle, removeVehicle,
};
