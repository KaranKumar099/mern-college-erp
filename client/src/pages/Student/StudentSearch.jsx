import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DataGrid } from '@material-ui/data-grid'
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

import styled from 'styled-components'
import StudentNavbar from '../../components/StudentNavbar'

import { Person, CalendarToday, Search, Class, Explore } from '@material-ui/icons'

const Container = styled.div` 
width:100%;
max-width: 100vw;
box-sizing:border-box;
background-color: rgb(255, 255, 255);
display:flex;
flex-direction:column;
border-left: 1px solid rgba(0, 0, 0, 0.158);
height: 100vh;
overflow-x: hidden;
`
const Heading = styled.h1` 
font:400 2rem;
padding: 1rem; 
box-sizing:border-box;
color:#0077b6;
transition: all 0.5s;
margin: 1rem 0;
text-align: center;
border-bottom:1px solid rgba(0, 119, 182, 0.2);

@media screen and (max-width: 426px) {
    font-size: 1.5rem;
}
`
const Form = styled.form` 
width:100%;
display: flex;
flex-direction: column;
align-items: center;
margin: 0;
padding: 2rem;
background-color: white;
box-sizing: border-box;
`

const FormItemContainer = styled.div` 
display:flex;
justify-content:center;
width: 100%;

@media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
}
`
const FormItem = styled.div` 
display: flex;
align-items: center;
margin: 1.5rem;
position: relative;

@media screen and (max-width: 768px) {
    margin: 0.8rem 0;
    width: 90%;
}

>select{
    padding: 12px 12px 12px 40px;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    font: 300 1rem;
    outline: none;
}
>svg{
    position:absolute;
    transform:translateX(10px);
    font-size: 1.5rem; 
    color:rgba(0,0,0,0.6)
}
`

const Button = styled.button` 
    border-radius: 10px;
    border:none;
    background-color: #0077b6;
    font: 400 1rem;
    color: white;
    text-decoration: none;
    padding: 10px 30px;
    width: max-content;
    margin: 1rem;
    text-align: center;
    cursor:pointer;
    transition: all 0.3s;

    &:hover {
        background-color: #005f92;
    }
    
    @media screen and (max-width: 426px) {
        width: 80%;
        margin: 2rem auto;
        font-size: 1rem;
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


const StudentSearch = () => {

    const student = useSelector((store) => store.student);
    const navigate = useNavigate();


    const [department, setDepartment] = useState("")
    const [year, setYear] = useState("")
    const [section, setSection] = useState("")
    const [result, setResult] = useState([])

    const fetchStudents = async () => {
        try {
            const { data } = await axios.post('http://localhost:3000/api/student/getAllStudents', {
                department, year, section
            })

            setResult(data.result);

        } catch (err) {
            alert("Something went wrong..");
        }
    }

    const columns = [
        { field: "num", headerName: "S.R No.", flex: 0.2, minWidth: 70 },
        { field: "id", headerName: "G.R Number", flex: 0.5, minWidth: 150 },
        { field: "name", headerName: "Name", flex: 0.5, minWidth: 150 },
        { field: "email", headerName: "Email", flex: 0.5, minWidth: 200 },
        { field: "section", headerName: "Section", flex: 0.3, minWidth: 100 },
        {
            field: "visit", headerName: "Visit", flex: 0.2, minWidth: 80, sortable: false, renderCell: (params) => {
                return (
                    <Link to={`/profile/${params.row.id}`}>
                        <Explore style={{ color: "#0077b6" }} />
                    </Link>
                )
            }
        }
    ]

    /*
    const subjects = [
        {no:1,code:12345,name:"Shifon Shaikh",email:"abc123@gmail.com",year:"A"},
        {no:2,code:12345,name:"Rahul Yadav",email:"abc123@gmail.com",year:"B"},
        {no:3,code:12345,name:"Disha Patani",email:"abc123@gmail.com",year:"C"},
        {no:4,code:12345,name:"Rakesh Mali",email:"abc123@gmail.com",year:"C"},
        {no:5,code:12345,name:"Raj Aryan",email:"abc123@gmail.com",year:"D"},
    ]
    */

    const rows = [];
    result && result.forEach((item, index) => {
        rows.push({
            num: index + 1,
            id: item.registrationNumber,
            name: item.name,
            email: item.email,
            section: item.section
        })
    })

    const formHandler = (e) => {
        e.preventDefault();
        fetchStudents();
    }

    return (
        <>
            <StudentNavbar />
            <Container>
                <Form onSubmit={formHandler}>
                    <Heading>Search Students</Heading>
                    <FormItemContainer>
                        <FormItem>
                            <Person />
                            <select onChange={(e) => setDepartment(e.target.value)}>
                                <option>Department</option>
                                <option>C.S.E</option>
                                <option>E.C.E</option>
                                <option>I.T</option>
                                <option>Civil</option>
                                <option>Mechanical</option>
                            </select>
                        </FormItem>
                        <FormItem>
                            <CalendarToday />
                            <select onChange={(e) => setYear(e.target.value)}>
                                <option>Year</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                        </FormItem>
                        <FormItem>
                            <Class />
                            <select onChange={(e) => setSection(e.target.value)}>
                                <option>Section</option>
                                <option>A</option>
                                <option>B</option>
                                <option>C</option>
                                <option>D</option>
                            </select>
                        </FormItem>
                    </FormItemContainer>
                    <Button type="submit">
                        Search
                    </Button>
                </Form>
                <TableContainer>
                    <div style={{ minWidth: '700px', width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[5, 10, 20]}
                            disableSelectionOnClick
                            autoHeight
                            className="custom-datagrid"
                        />
                    </div>
                </TableContainer>
            </Container>
        </>
    )
}

export default StudentSearch
