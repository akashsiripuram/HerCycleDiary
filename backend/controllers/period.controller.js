const Period=require("../models/Period");

const addPeriod=async (req,res)=>{
    const {startDate,endDate,crampLevel,notes}=req.body;
    const userId=req.user._id;
    try {
        const newPeriod=new Period({
            userId,
            startDate,
            endDate,
            crampLevel,
            notes
        })
        await newPeriod.save();
        res.status(200).json({success:true,message:"Period data added successfully"});
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}

const getPeriods=async (req,res)=>{
    const userId=req.user._id;
    try {
        const periods=await Period.find({userId}).sort({createdAt:-1});
        res.status(200).json({success:true,periods});
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}