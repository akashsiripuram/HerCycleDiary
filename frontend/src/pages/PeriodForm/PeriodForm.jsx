import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
function PeriodForm() {
    const [startdate, setStartDate] = useState(new Date().toISOString().split('T')[0]); 
    const [enddate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [crampLevel, setCrampLevel] = useState(5); // default value
    const [notes, setNotes] = useState("");
    const navigate=useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const periodData={
            startdate,
            enddate,
            crampLevel,
            notes
        }
        console.log(periodData);
        // send data to backend
        const response=await axios.fetch("/api/period/add",periodData,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}` 
            }
        })
        if(response.data.success){
            toast.success("Period data added successfully");
        }else{
            toast.error("Error adding period data");
        }
        // navigate to home page
        navigate("/tracker");
        
    }
    return ( 
        <div>
            <h1>Period Form</h1>
            <input type="date" value={startdate} onChange={
                (e) => setStartDate(e.target.value) 
            } required/>
            <input type="date" value={enddate} onChange={
                (e) => setEndDate(e.target.value)
            } />
            {/* cramp level slider 1-10 with emojis */}
            <input type="range" min="1" max="10" onChange={(e)=>{
                setCrampLevel(e.target.value)
            }} defaultValue="5" className="slider" id="crampLevel" />
            <label htmlFor="crampLevel">Cramp Level</label>
            <div className="emoji-slider">
                <span role="img" aria-label="1">😩</span>
                <span role="img" aria-label="2">😖</span>
                <span role="img" aria-label="3">😣</span>
                <span role="img" aria-label="4">😕</span>
                <span role="img" aria-label="5">😐</span>
                <span role="img" aria-label="6">😊</span>
                <span role="img" aria-label="7">😁</span>
                <span role="img" aria-label="8">😄</span>
                <span role="img" aria-label="9">😆</span>
                <span role="img" aria-label="10">😂</span>
            </div>
            {/* notes */}
            <textarea placeholder="Notes" rows="4" cols="50" onChange={(e)=>{
                setNotes(e.target.value)
            }}></textarea>
            {/* submit button */}
            <button type="submit" onClick={handleSubmit} className="submit-button">Submit</button>
            {/* cancel button */}
            <button type="button" className="cancel-button">Cancel</button>
           

        </div>
     );
}

export default PeriodForm;