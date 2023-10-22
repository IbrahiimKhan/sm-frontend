import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
const DataTable = ({ data ,getData}) => {
const baseUrl = process.env.REACT_APP_API_URL

  const navigate = useNavigate()
  if (!data || data.length === 0) {
    return <div></div>;
  }

  const columns = [
    ...Object.keys(data[0]).map((key) => {
      if (key === 'courses') {
        return {
          field: key,
          headerName: 'Courses',
          width: 200,
          renderCell: (params) => {
            const courseNames = params.value.map((course) => course.name).join(', ');
            return <div>{courseNames}</div>;
          },
        };
      } else {
        return {
          field: key,
          headerName: key.charAt(0).toUpperCase() + key.slice(1),
          width: 100,
          renderCell: (params) => {
            // Check if the cell value is empty (null or undefined)
            const cellValue = params.value;
            const displayValue = cellValue === null || cellValue === undefined ? 'N/Y' : cellValue;
            return <div>{displayValue}</div>;
          },
        };
      }
    }),
    {
      field: 'view',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            <Button onClick={() => handleViewClick(params.row.id)}>
              View
            </Button>
            <Button onClick={() => handleDeleteClick(params.row.id)}>
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const handleViewClick = (rowId) => {
        navigate(`student/view/${rowId}`)
  };

  const handleDeleteClick = (rowId) => {
    axios.get(baseUrl+`/student/${rowId}/delete`).then((res)=>{
      toast.success("Student deleted successfully")
      getData()
  })
    .catch((e)=>toast.error("Filed to delete student"))


  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        // autoPageSize={true}
      />
    </div>
  );
}

export default DataTable;
