import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'; // Remove 'useEffect' import as it's not used
import Select from 'react-select';
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const Course = () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [courseInfo, setCourseInfo] = useState({
    name: '',
    description: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCourseInfo({ ...courseInfo, [name]: value });
  };

  const handleAddCourse = () => {
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
        toast.success("Course added successfully!");
        navigate("/courses");
      })
      .catch(e => {
        toast.error("Failed to add Course");
      });
  };

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
          onClick={handleAddCourse}
          variant="contained"
          sx={{ mt: 2, mb: 2, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          Add Course
        </Button>
      </div>
    </div>
  );
};
