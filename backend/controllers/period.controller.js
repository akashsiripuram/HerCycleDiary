const Period=require("../models/Period");
const User = require("../models/User");
const addPeriod=async (req,res)=>{
    const {startDate,endDate,crampLevel,notes}=req.body;
    const userId=req.user.id;
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
    const userId = req.user.id;
    const periods = await Period.find({ userId }).sort({ startDate: -1 });

    let nextPredicted = null;
    let avgPeriodLength = null;
    let avgCycleLength = null;
    let daysUntilNextPeriod = null;

    if (periods.length > 0) {
      const lastPeriodStart = new Date(periods[0].startDate);
      nextPredicted = new Date(lastPeriodStart);
      nextPredicted.setDate(nextPredicted.getDate() + 28); // You can change 28 to avgCycleLength if calculated below

      // Calculate days until next period
      const today = new Date();
      const timeDiff = nextPredicted - today;
      daysUntilNextPeriod = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      let totalPeriodLength = 0;
      let totalCycleLength = 0;
      let periodCount = 0;
      let cycleCount = 0;

      for (let i = 0; i < periods.length; i++) {
        const start = new Date(periods[i].startDate);
        const end = new Date(periods[i].endDate);

        if (end >= start) {
          totalPeriodLength += (end - start) / (1000 * 60 * 60 * 24);
          periodCount++;
        }

        if (i < periods.length - 1) {
          const nextStart = new Date(periods[i + 1].startDate);
          const diff = (start - nextStart) / (1000 * 60 * 60 * 24);
          if (diff > 0 && diff < 100) {
            totalCycleLength += diff;
            cycleCount++;
          }
        }
      }

      if (periodCount > 0) {
        avgPeriodLength = parseFloat((totalPeriodLength / periodCount).toFixed(1));
      }

      if (cycleCount > 0) {
        avgCycleLength = parseFloat((totalCycleLength / cycleCount).toFixed(1));
        nextPredicted = new Date(lastPeriodStart);
        nextPredicted.setDate(nextPredicted.getDate() + Math.round(avgCycleLength));
        daysUntilNextPeriod = Math.ceil((nextPredicted - today) / (1000 * 60 * 60 * 24));
      }
      
      // ✅ Update user document
      await User.findByIdAndUpdate(userId, {
        averagePeriodLength: avgPeriodLength,
        averageCycleLength: avgCycleLength,
        daysUntilNextPeriod: daysUntilNextPeriod,
        nextPeriodDate: nextPredicted,
      });
      
    }

    res.status(200).json({
      success:true,
      periods,
      nextPredicted,
      averagePeriodLength: avgPeriodLength,
      averageCycleLength: avgCycleLength,
      daysUntilNextPeriod,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch periods" });
  }
};

module.exports={
    addPeriod,
    getPeriods
}