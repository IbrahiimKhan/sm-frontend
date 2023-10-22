import { Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

export const ViewStudent = () => {
const { id } = useParams();
const navigate = useNavigate()
const baseUrl = process.env.REACT_APP_API_URL
const [course, setCourse] = useState([])
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


  console.log(selectedOptions,"selected options")
    setStudentInfo({
      ...studentInfo,
      courses: selectedOptions,
    });
  };

  const handleUpdateStudent = () => {
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
      studentInfo.id = id

      console.log(studentInfo,"final")
      axios.post(baseUrl+"/student/update",studentInfo).then((res)=>{
          toast.success("Student Updated successfully!")
          navigate("/")
        })
      .catch(e=>{
          toast.error("Faield to update student")
      })

  };


  //get studetn info

  const getStudent = () => {
    axios.get(baseUrl + `/student/${id}`).then((response) => {
      const coursesWithAttributes = response?.data.courses.map((course) => ({
        ...course,
        value: course.id,
        label: course.name,
      }));
  
      setStudentInfo({
        name: response?.data.name,
        phone: response?.data.phone,
        email: response?.data.email,
        roll: response?.data.roll,
        address: response?.data.address,
        courses: coursesWithAttributes, 
      });
    });
  }
//get course list
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
  getStudent()
  }, [])

  return (
    <div>
      <Typography variant='h4' textAlign={"center"} sx={{ mt: 2, mb: 2 }}>View Student</Typography>
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
          value={studentInfo?.courses}
           onChange={handleCourseSelect}
        />
      <Button
        onClick={handleUpdateStudent}
        variant="contained"
        sx={{ mt: 2, mb: 2, display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        Update Student
      </Button>
      </div>
    </div>
  );
};
