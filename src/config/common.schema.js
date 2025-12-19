const mongoose = require("mongoose")
const { Status} = require("./constants")

const StatusSchema = {
  type: String,
  enum: [Status.ACTIVE, Status.INACTIVE],
  default: Status.INACTIVE,
};

const AddressSchema = new mongoose.Schema({
      address: String,
      wardNo: Number,
      municpality:String,
      // district: {
        // type: mongoose.Types.ObjectId, 
        // ref: "District"
      // },
      state: {
        type: String, 
        enum: ["Koshi","Madhesh","Bagmati","Gandaki","Lumbini","Karnali","SudurPaschim"]
      }
  })


module.exports = {
  StatusSchema,
  AddressSchema
}