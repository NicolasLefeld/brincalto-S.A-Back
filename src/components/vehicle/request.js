const { vehicleSchema } = require('../../schema/vehicle');

async function retrieveVehicleRecords(filter = {}) {
  return vehicleSchema.find(filter);
}

async function insertVehicleRecord(plate, comment) {
  const created = await vehicleSchema.create({ plate, comment });

  return created;
}

async function updateVehicleRecord(id, newData) {
  return vehicleSchema.updateOne({ _id: id }, newData);
}

async function removeVehicleRecord(id) {
  return vehicleSchema.findByIdAndDelete(id);
}

module.exports = {
  retrieveVehicleRecords, insertVehicleRecord, updateVehicleRecord, removeVehicleRecord,
};
