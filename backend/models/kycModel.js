const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema({
  nidNumber: { type: String, required: true, unique: true },
  fullNameEnglish: { type: String, required: true },
  fullNameBangla: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
});

const KYC = mongoose.model("KYC", kycSchema);
module.exports = { KYC };
