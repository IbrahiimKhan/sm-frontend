import {Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import { Container,Box, Typography } from "@mui/material";
import { Student } from "./pages/Student";
import { ViewStudent } from "./pages/ViewStudent";
import CourseList from "./courses/CourseList";
import { Course } from "./pages/Course";
import { ViewCourse } from "./pages/ViewCourse";
function App() {
  return (
    <div>

<Container fixed>
  
        <Box sx={{ bgcolor: '', height: '100vh' }} >
          <Typography textAlign={"center"}  variant="h2">Student Management System</Typography>
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/create/student" element={<Student/>} />
        <Route path="/courses/create/course" element={<Course/>} />
        <Route path="/courses" element={<CourseList/>} />
        <Route path="/student/view/:id" element={<ViewStudent/>} />
        <Route path="/courses/course/view/:id" element={<ViewCourse/>} />
      </Routes>
        </Box>
      </Container>
    </div>
  );
}

export default App;