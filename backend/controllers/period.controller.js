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


const getPeriods = async (req, res) => {
  try {
    const userId = req.user._id; // from middleware
    const periods = await Period.find({ userId }).sort({ startDate: -1 });

    let nextPredicted = null;
    if (periods.length > 0) {
      const lastPeriod = periods[0].startDate;
      const cycleLength = 28; // Could also be saved per user
      nextPredicted = new Date(lastPeriod);
      nextPredicted.setDate(nextPredicted.getDate() + cycleLength);
    }

    res.status(200).json({
      periods,
      nextPredicted,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch periods' });
  }
};

module.exports={
    addPeriod,
    getPeriods
}