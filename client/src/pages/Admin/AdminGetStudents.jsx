import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DataGrid } from '@material-ui/data-grid'
import { useNavigate } from 'react-router-dom'

import styled from 'styled-components'
import AdminNavbar from '../../components/AdminNavbar'
import Loader from '../../components/Loader'

import { CalendarToday, Apartment } from '@material-ui/icons'
import { adminGetAllStudent } from '../../redux/actions/adminAction'


const Container = styled.div` 
width:100%;
box-sizing:border-box;
background-color: rgb(255, 255, 255);
display:flex;
flex-direction:column;
border-left: 1px solid rgba(0, 0, 0, 0.158);
height: 100vh;
`
const Heading = styled.h1` 
font:400 2rem;
padding:0.5vmax; 
box-sizing:border-box;
color:#0077b6;
transition: all 0.5s;
margin: 2rem;
text-align: center;
width: 100%;

@media screen and (max-width: 426px) {
    font-size: 1.5rem;
    margin: 1rem 0;
}
`
const Form = styled.form` 
width: 100%;
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
align-items: center;
margin: auto;
padding: 1vmax;
background-color: white;
box-sizing: border-box;
`

const FormItem = styled.div` 
display: flex;
width: 20rem;
align-items: center;
margin: 1rem;

@media screen and (max-width: 426px) {
    width: 90%;
    margin: 0.5rem 0;
}
>select{
    padding:1vmax 4vmax;
    padding-right:1vmax;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.267);
    border-radius: 4px;
    font: 300 0.9vmax;
    outline: none;
}
>svg{
    position:absolute;
    transform:translateX(1vmax);
    font-size:1.6vmax; 
    color:rgba(0,0,0,0.623)
}
`

const Button = styled.button` 
    border-radius: 10px;
    border:none;
    background-color: #0077b6;
    font: 400 1vmax;
    color: white;
    text-decoration: none;
    padding: 1vmax;
    width: 10rem;
    margin: 1rem;
    text-align: center;
    cursor:pointer;

    @media screen and (max-width: 426px) {
        width: 80%;
        font-size: 1rem;
    }
`


const AdminGetStudents = () => {
    const admin = useSelector((store) => store.admin);
    const dispatch = useDispatch();
    const [department, setDepartment] = useState("C.S.E")
    const [year, setYear] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        if (admin.allStudent.length !== 0) {
            setIsLoading(false)
        }

    }, [admin.allStudent.length])

    const formHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);
        dispatch(adminGetAllStudent({ department, year }));
    }

    const columns = [
        { field: "id", headerName: "No.", flex: 0.3 },
        { field: "code", headerName: "Registration Number", flex: 0.5 },
        { field: "name", headerName: "Name", flex: 0.5 },
        { field: "email", headerName: "Email", flex: 0.3 },
        { field: "section", headerName: "Section", flex: 0.4 }
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
    admin.allStudent.forEach((item, index) => {
        rows.push({
            id: index + 1,
            code: item.registrationNumber,
            name: item.name,
            email: item.email,
            section: item.section
        })
    })


    return (
        <>
            {
                admin.isAuthenticated ? (
                    <>
                        <AdminNavbar />
                        <Container>
                            <Form onSubmit={formHandler}>
                                <Heading>Search Students</Heading>
                                <FormItem>
                                    <Apartment />
                                    <select onChange={(e) => setDepartment(e.target.value)}>
                                        <option>Department</option>
                                        <option value="C.S.E">C.S.E</option>
                                        <option value="E.C.E">E.C.E</option>
                                        <option value="I.T">I.T</option>
                                        <option value="Civil">Civil</option>
                                        <option value="Mechanical">Mechanical</option>
                                    </select>
                                </FormItem>
                                <FormItem>
                                    <CalendarToday />
                                    <select onChange={(e) => setYear(e.target.value)}>
                                        <option>Year</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </FormItem>
                                <Button type="submit">
                                    Search
                                </Button>
                            </Form>
                            {
                                isLoading ? (
                                    <Loader />
                                ) : (
                                    <DataGrid rows={rows} columns={columns} pageSize={5} disableSelectionOnClick autoHeight />
                                )
                            }



                        </Container>
                    </>
                ) : (
                    navigate('/admin/login')
                )
            }



        </>
    )
}

export default AdminGetStudents
