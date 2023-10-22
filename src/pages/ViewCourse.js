import { Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'; // Remove 'useEffect' import as it's not used
import Select from 'react-select';
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
export const ViewCourse = () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
    const {id} = useParams()
  const [courseInfo, setCourseInfo] = useState({
    name: '',
    description: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCourseInfo({ ...courseInfo, [name]: value });
  };

  const handleUpdate = () => {
    if (!courseInfo.name) {
      toast.warning('Please enter a Name');
      return;
    }

    if (!courseInfo.description) {
      toast.warning('Please enter Description');
      return;
    }

    axios.post(`${baseUrl}/course/add`, courseInfo)
      .then((res) => {
        toast.success("Course updated successfully!");
        navigate("/courses");
      })
      .catch(e => {
        toast.error("Failed to update Course");
      });
  };


  //get course list
const courseData = ()=>{
    axios.get(baseUrl+`/course/${id}`).then((response) => {
        const { name, description } = response?.data;
        setCourseInfo({ name, description });
    });
  }
  useEffect(() => {
  courseData()
  
  }, [])

  return (
    <div>
      <Typography variant='h4' textAlign="center" sx={{ mt: 2, mb: 2 }}>Add Course</Typography>
      {/* fields */}
      <div style={{ width: "500px", margin: "0 auto" }}>
        <TextField
          sx={{ display: "block", mb: 2 }}
          id="outlined-basic"
          label="Name"
          variant="outlined"
          name="name"
          value={courseInfo.name}
          onChange={handleInputChange}
        />
        <TextField
          sx={{ display: "block", mb: 2 }}
          id="outlined-basic"
          label="Description"
          variant="outlined"
          name="description" 
          value={courseInfo.description}
          onChange={handleInputChange}
        />

        <Button
          onClick={handleUpdate}
          variant="contained"
          sx={{ mt: 2, mb: 2, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          Update Course
        </Button>
      </div>
    </div>
  );
};
