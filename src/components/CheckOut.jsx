import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import { Box } from '@mui/system';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DatePicker from "react-datepicker";
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import "react-datepicker/dist/react-datepicker.css"

import moment from 'moment/moment';
import { userLocation } from "../CardData/cardData"


const CheckOut = () => {


  const [location, setLocation] = useState(null)
  const [cost, setTotaCost] = useState()
  const [eventStart, setEventStart] = useState(null)
  const [eventEnd, setEventEnd] = useState(null)

  const [aSetupDate, setSetUpDate] = useState(null);
  //const gameCost =useSelector((state)=>(state.CardsReducer.totalPrice))
  const totalAmount=useSelector((state)=>state.CardDataAll.totalPrice);
  console.log("game cost ",totalAmount);

  useEffect(() => {
    setSetUpDate(new Date())

  }, [])

  if (aSetupDate) {
    console.log("Today", moment(aSetupDate).format("MMM Do YY"))
  }


  const setTime = moment(aSetupDate);
  const startTime = moment(eventStart);
  const endTime = moment(eventEnd);
  const diff = endTime.diff(startTime);
  const diffset = startTime.diff(setTime)
  const diffDuration = moment.duration(diff);


  const diffsetupDuration = moment.duration(diffset)
  const dayDurationOfStart = diffsetupDuration.days()
  const Endtime = diffsetupDuration.hours();


  const dayDuration = diffDuration.days()
  const timeDuration = diffDuration.hours()



  const handleDuration = () => {


    if (dayDurationOfStart > 1) {

    } else {
      alert("Event Start Date less then one day ,Error, set Date getter then one")
    }

    if (timeDuration > 2 && dayDuration < 1) {

    } else if (timeDuration < 2 && dayDuration < 1) {
      alert("Event should be Minimum 2 hours , Erorr");

    } else if (timeDuration < 2 && dayDuration > 1) {
      alert('event Should be Minimun One day ,Erorr');

    } else {
      alert("Event Create successfully....");


    }


  }

  const handleLocationChange=(e)=>{
    setLocation(e.target.value);
    console.log("location",location);

  }

  useEffect(()=>{

    if(location && location*2>30){
      const extDist=location*2 -30;
      const totalCost = 1500 + (extDist*50)
      setTotaCost(totalCost);
    }else{
      const totalCost=1500
      setTotaCost(totalCost);
    }




  }
  ,[location])

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div">
              Game Check Out
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ padding: "20px" }}>
          <div> setup Timer: {moment(aSetupDate).format("MMM Do YY")}</div>

          <p>Event Start :
            <DatePicker showTimeSelect
              dateFormat="MMMM d, yyyy h:mmaa"
              minDate={aSetupDate}
              endDate={eventEnd}
              timeFormat="HH:mm" selected={eventStart} onChange={(date) => setEventStart(date)} />

          </p>

          <p>Event End:
            <DatePicker showTimeSelect
              dateFormat="MMMM d, yyyy h:mmaa"
              minDate={eventStart}
              timeFormat="HH:mm" selected={eventEnd} onChange={(date) => setEventEnd(date)} />
          </p>

          <Button onClick={handleDuration}>Submit</Button>
        </Box>
        <Box sx={{padding:"30px"}}>

          {/* <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="demo-simple-select-autowidth-label">Location</InputLabel>
            <Select

              value={location}
              onChange={handleChange}
              autoWidth
              label="Location"
            >
              {userLocation.map((item) =>

                <MenuItem key={item.Id} value={item.name}>{item.name}</MenuItem>
              )

              }
            </Select>
          </FormControl> */}
          <label htmlFor="">Select Your Location:</label>
          <select onChange={handleLocationChange}>

            {userLocation.map((item) => (
              <option key={item.Id} value={item.Distance}>{item.name}</option>
            ))}
          </select>
          <br />
          <p>your selected location distance:{location}km and total distance: {location*2} Km</p>


        </Box>

        <Box sx={{padding:"20px"}}>
          <p>Transport charge :{cost}</p>
          
          <p>total cost :{totalAmount +cost}</p>
        </Box>


        
      </Box>

    </>
  )
}

export default CheckOut
