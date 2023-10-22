import React, { useEffect, useState } from 'react'
import axios from "axios";
import DataTable from '../components/DataTable';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import DataTable2 from '../components/DataTable2';

const CourseList = () => {
const navigate= useNavigate()
const baseUrl = process.env.REACT_APP_API_URL
const [course, setCourse] = useState([])


const courseData = ()=>{
  axios.get(baseUrl+"/course/all").then((response) => {
    setCourse(response?.data);
  });
}
useEffect(() => {
courseData()
}, [])

//handle search

// const handleSearch=(e)=>{
//   axios.get(baseUrl+`/student/search?name=${e.target.value}`).then((res)=>{
//     setCourse(res?.data)
//     console.log("searched res",res)
//   }).catch((e)=>console.log("error"))
// }

  return (
    <div>
      <Box sx={{display:"flex",my:2}}>
     
      <Typography sx={{mr:2,mt:1}}>Course List</Typography>
      
      <Button
      onClick={()=>{navigate("create/course")}}
      variant="contained" >Add Course</Button>
      

<form style={{marginLeft:"20px"}}>
    {/* <TextField
      id="search-bar"
      className="text"
      onInput={(e) => {
        handleSearch(e)
      }}
      label="Enter a keyword"
      variant="outlined"
      placeholder="Search..."
      size="small"
    /> */}
    {/* <IconButton type="submit" aria-label="search">
      <SearchIcon style={{ fill: "blue" }} />
    </IconButton> */}
  </form>
  <div style={{display:"flex"}}>
  <Button
  sx={{ml:2}}
      onClick={()=>{navigate("/")}}
      variant="contained" >View Students</Button>
  </div>
      </Box>
      <DataTable2 data = {course
        ?course:[]} getData ={courseData}/>
      
    </div>
  )
}

export default CourseList