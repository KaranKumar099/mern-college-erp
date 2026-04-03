import React,{useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {DataGrid} from '@material-ui/data-grid'
import {useSelector,useDispatch} from 'react-redux'

import StudentNavbar from '../../components/StudentNavbar'
import styled from 'styled-components'
import {getAllSubjects} from '../../redux/actions/studentAction'

const Container = styled.div` 
width:100%;
box-sizing:border-box;
background-color: rgb(255, 255, 255);
display:flex;
flex-direction:column;
border-left: 1px solid rgba(0, 0, 0, 0.158);
height: 100vh;
`

const Header = styled.h1` 
font:400 2rem;
padding:0.5vmax;
box-sizing:border-box;
color:#0077b6;
transition: all 0.5s;
margin: 2rem;
text-align: center;

@media screen and (max-width: 426px) {
    font-size: 1.5rem;
    margin: 1rem 0;
}
`

const TableContainer = styled.div`
    width: 100%;
    max-width: 100%;
    margin: 1rem 0;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    overflow-x: auto;
    padding: 1rem;
    box-sizing: border-box;

    .custom-datagrid {
        border: none;
        font-family: 'Poppins', sans-serif;
        
        .MuiDataGrid-columnHeaderTitle {
            font-weight: 600;
            color: #0077b6;
        }

        .MuiDataGrid-cell {
            color: #333;
        }

        .MuiDataGrid-row:hover {
            background-color: #f0faff;
        }
    }

    &::-webkit-scrollbar {
        height: 6px;
    }
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background: #0077b6;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: #005f92;
    }
`;

const GridWrapper = styled.div`
    width: 100%;
    @media screen and (max-width: 768px) {
        min-width: 700px;
    }
`;

const StudentSubjectList = () => {

    const student = useSelector((store) => store.student)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(getAllSubjects())
    },[])

    const columns = [
        { field: "id", headerName: "Subject No.", flex: 0.1, minWidth: 70 },
        { field: "code", headerName: "Subject Code", flex: 0.5, minWidth: 120 },
        { field: "name", headerName: "Subject Name", flex: 1, minWidth: 200 },
        { field: "year", headerName: "Year", flex: 0.2, minWidth: 70 },
        { field: "total", headerName: "Total Hours", flex: 0.2, minWidth: 100 }
    ]

    /*
    const subjects = [
        {no:1,code:12345,name:"Data Structures",year:2,total:24},
        {no:2,code:12345,name:"Algorithms",year:2,total:28},
        {no:3,code:12345,name:"Operating Systems",year:2,total:36},
        {no:4,code:12345,name:"Database Management",year:2,total:36},
        {no:5,code:12345,name:"Machine Learning",year:2,total:24},
    ]
    */

    const rows = [];
    student.allSubjects.forEach((item,index) => {
        rows.push({
            id:index+1,
            code:item.subjectCode,
            name:item.subjectName,
            year:item.year,
            total:item.totalLectures
        })
    })

    //console.log(rows);

    return(
        <>
        {
            student.isAuthenticated?
            (
             <>
             <StudentNavbar/>
        <Container style={{ overflowX: 'hidden' }}>
            <Header>SUBJECTS LIST</Header>
            <TableContainer>
                <GridWrapper>
                    <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[5, 10, 20]} disableSelectionOnClick autoHeight className="custom-datagrid" />
                </GridWrapper>
            </TableContainer>
        </Container>
             </>
            ):(
                navigate('/')
            )
        }
        </>
    )
}

export default StudentSubjectList;