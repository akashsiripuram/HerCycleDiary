const mongoose=require("mongoose");

const UserSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    averagePeriodLength: { type: Number, default: null },
  averageCycleLength: { type: Number, default: null },
  daysUntilNextPeriod: {
    type: Number,
  },
  nextPeriodDate: {
    type: Date,
  },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    },
})

const User=mongoose.model("User",UserSchema);

module.exports=User;