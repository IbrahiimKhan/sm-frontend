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

const Studentlist = () => {
const navigate= useNavigate()
const baseUrl = process.env.REACT_APP_API_URL
const [studentData, setStudentData] = useState([])
const [searchQuery, setSearchQuery] = useState("")
const [course, setCourse] = useState([])

//get student list

const getStudentData = ()=>{
  axios.get(baseUrl+"/student/all").then((response) => {
    console.log(response)
    setStudentData(response?.data);
  });
}
const courseData = ()=>{
  axios.get(baseUrl+"/course/all").then((response) => {
    setCourse(response?.data?.map((elem)=>elem?.name));
  });
}
useEffect(() => {
courseData()
}, [])

//handle filter

const handleFilter =(e)=>{

  axios.get(baseUrl+`/student/all?course=${e.value}`).then((res)=>{


    console.log("ki palam".res?.data)
    setStudentData(res?.data)
    console.log("searched res",res)
  }).catch((e)=>console.log("error"))

}
//handle search

const handleSearch=(e)=>{
  setSearchQuery(e.target.value);
  axios.get(baseUrl+`/student/search?name=${e.target.value}`).then((res)=>{
    setStudentData(res?.data)
    console.log("searched res",res)
  }).catch((e)=>console.log("error"))
}
useEffect(() => {
getStudentData()
}, [])

console.log(studentData)
  return (
    <div>
      <Box sx={{display:"flex",my:2}}>
     
      <Typography sx={{mr:2,mt:1}}>Student List</Typography>
      
      <Button
      onClick={()=>{navigate("create/student")}}
      variant="contained" >Add Student</Button>
      

<form style={{marginLeft:"20px"}}>
    <TextField
      id="search-bar"
      className="text"
      onInput={(e) => {
        handleSearch(e)
      }}
      label="Enter a keyword"
      variant="outlined"
      placeholder="Search..."
      size="small"
    />
    <IconButton type="submit" aria-label="search">
      <SearchIcon style={{ fill: "blue" }} />
    </IconButton>
  </form>
  <div style={{display:"flex"}}>
    <Typography sx={{mx:2, mt:1}}>Filter by Courses</Typography>
  <Dropdown options={course} onChange={(e)=>(handleFilter(e))}  placeholder="Select an option" />
  <Button
  sx={{ml:2}}
      onClick={()=>{navigate("/courses")}}
      variant="contained" >View Courses</Button>
  </div>
      </Box>
      <DataTable data = {studentData?studentData:[]} getData ={getStudentData}/>
      
    </div>
  )
}

export default Studentlist