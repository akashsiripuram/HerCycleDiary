const mongoose=require("mongoose");
const periodSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    startDate: Date,
    endDate: Date,
    crampLevel: Number, // 1-10
    notes: String,
    createdAt: { type: Date, default: Date.now }
  });

const Period=mongoose.model("Period",periodSchema);

module.exports=Period;
  