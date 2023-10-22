import { Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export const Student = () => {
const baseUrl = process.env.REACT_APP_API_URL
const [course, setCourse] = useState([])
const navigate = useNavigate()
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    phone: '',
    email: '',
    roll: '',
    address: '',
    courses: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStudentInfo({
      ...studentInfo,
      [name]: value,
    });
  };

  const handleCourseSelect = (selectedOptions) => {
  //   selectedOptions?.forEach((elm) => {
  //     delete elm.value;
  //     delete elm.label;
  // });
    setStudentInfo({
      ...studentInfo,
      courses: selectedOptions,
    });
  };

  const handleAddStudent = () => {
    if (!studentInfo.name) {
        toast.warning('Please enter a Name');
        return;
      }
    
      if (!studentInfo.phone) {
        toast.warning('Please enter a Phone');
        return;
      }
    
      if (!studentInfo.email) {
        toast.warning('Please enter an Email');
        return;
      }
    
      if (!studentInfo.roll) {
        toast.warning('Please enter a Roll');
        return;
      }
    
      if (!studentInfo.address) {
        toast.warning('Please enter an Address');
        return;
      }


      if (studentInfo?.courses.length>0) {
          studentInfo?.courses?.forEach((elm) => {
      delete elm.value;
      delete elm.label;
      });
        
      }
      axios.post(baseUrl+"/student/add",studentInfo).then((res)=>{
          toast.success("Student added successfully!")
          navigate("/")
          
        })
      .catch(e=>{
          toast.error("Failed to add student")
      })

  };

//get student list
const courseData = ()=>{
    axios.get(baseUrl+"/course/all").then((response) => {
      response?.data?.forEach(course => {
        course.value = course.id;
        course.label = course.name;
    });
    console.log("modified courses",response?.data)
      setCourse(response?.data);
    });
  }
  useEffect(() => {
  courseData()
  }, [])

  return (
    <div>
      <Typography variant='h4' textAlign={"center"} sx={{ mt: 2, mb: 2 }}>Add Student</Typography>
      {/* fields */}
      <div style={{width:"500px",margin:"0 auto" }}>
        <TextField
          sx={{ display: "block", mb: 2 }}
          id="outlined-basic"
          label="Name"
          variant="outlined"
          name="name"
          value={studentInfo.name}
          onChange={handleInputChange}
        />
        <TextField
          sx={{ display: "block", mb: 2 }}
          id="outlined-basic"
          label="Phone"
          variant="outlined"
          name="phone"
          value={studentInfo.phone}
          onChange={handleInputChange}
        />
        <TextField
          sx={{ display: "block", mb: 2 }}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          name="email"
          value={studentInfo.email}
          onChange={handleInputChange}
        />
        <TextField
          sx={{ display: "block", mb: 2 }}
          id="outlined-basic"
          label="Roll"
          variant="outlined"
          name="roll"
          value={studentInfo.roll}
          onChange={handleInputChange}
        />
        <TextField
          sx={{ display: "block", mb: 2 }}
          id="outlined-basic"
          label="Address"
          variant="outlined"
          name="address"
          value={studentInfo.address}
          onChange={handleInputChange}
        />
        <Typography  sx={{ my: 2 }} >Selct Courses</Typography>
        <Select
          isMulti
          options={course}
           onChange={handleCourseSelect}
        />
      <Button
        onClick={handleAddStudent}
        variant="contained"
        sx={{ mt: 2, mb: 2, display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        Add Student
      </Button>
      </div>
    </div>
  );
};
