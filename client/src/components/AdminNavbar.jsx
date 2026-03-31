import React, {useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'

import {PersonAdd,LibraryAdd, HowToReg,Person,ExitToApp,Group,LibraryBooks,Menu,Close} from '@material-ui/icons'
import styled from 'styled-components'

import {adminLogout} from '../redux/actions/adminAction'

const Container = styled.div`
 width: 100%;
 display:flex;
 border-bottom:0.5px solid #0077b6;
 box-sizing: border-box;
`

const Wrapper = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
padding:10px 20px;
background-color:white;
width:100%;
box-sizing: border-box;
`

const Left = styled.div` 
flex:1;
display:flex;
align-items:center;
>a{
  text-decoration:none;
}
`

const Logo = styled.h1`
font-weight:bold;
color:#0077b6;
cursor:pointer;
`

const Right = styled.div`
flex:1;
display: flex;
align-items: center;
justify-content: flex-end;

@media screen and (max-width: 425px) {
    display: ${props => props.open ? "flex" : "none"};
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 5px;
    right: 0;
    width: 100%;
    background-color: white;
    box-shadow: 0 5px 10px rgba(0,0,0,0.1);
    z-index: 1000;
    padding: 20px;
    align-items: flex-start;
}
`

const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  @media screen and (max-width: 426px) {
    display: block;
    color: #0077b6;
  }
`

const MenuItem = styled.div` 
font-size:14px;
cursor:pointer;
margin-left:25px;
display: flex;
align-items: center;
a{
    text-decoration:none;
    color:white;
}

@media screen and (max-width: 426px) {
    margin: 10px 0;
    margin-left: 0;
    width: 100%;
}
`

const MenuLabel = styled.span`
  display: none;
  @media screen and (max-width: 426px) {
    display: block;
    margin-left: 10px;
    color: #0077b6;
    font-weight: 500;
  }
`


const AdminNavbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name,setName] = useState("");
    const [open, setOpen] = useState(false);

    const logoutHandler = () => {
      dispatch(adminLogout());
      alert.success("Logged Out");
      navigate('/admin/login');
    }

    const home = () => {
      navigate('/admin')
    }

    const AddStudent = () => {
      navigate('/admin/add/students')
    }

    const AddFaculty = () => {
      navigate('/admin/add/faculties')
    }

    const AddSubject = () => {
      navigate('/admin/add/subjects')
    }

    const GetStudent = () => {
      navigate('/admin/students')
    }

    const GetFaculty = () => {
      navigate('/admin/faculties')
    }

    const GetSubject = () => {
      navigate('/admin/subjects')
    }

    


    return(
         <Container>
             <Wrapper>
                 <Left>
                     <Link to="/admin">
                         <Logo>ERP</Logo>
                     </Link>
                 </Left>
                <Right open={open}>
                    <MenuItem onClick={AddStudent}>
                      <PersonAdd style={{color:"#0077b6"}}/>
                      <MenuLabel>Add Student</MenuLabel>
                    </MenuItem>
                    <MenuItem onClick={AddFaculty}>
                      <HowToReg style={{color:"#0077b6"}}/>
                      <MenuLabel>Add Faculty</MenuLabel>
                    </MenuItem>
                    <MenuItem onClick={AddSubject}>
                      <LibraryAdd style={{color:"#0077b6"}}/>
                      <MenuLabel>Add Subject</MenuLabel>
                    </MenuItem>
                    <MenuItem onClick={GetStudent}>
                      <Person style={{color:"#0077b6"}}/>
                      <MenuLabel>Search Students</MenuLabel>
                    </MenuItem>
                    <MenuItem onClick={GetFaculty}>
                      <Group style={{color:"#0077b6"}}/>
                      <MenuLabel>Search Faculty</MenuLabel>
                    </MenuItem>
                    <MenuItem onClick={GetSubject}>
                      <LibraryBooks style={{color:"#0077b6"}}/>
                      <MenuLabel>Search Subjects</MenuLabel>
                    </MenuItem>
                    <MenuItem onClick={logoutHandler}>
                      <ExitToApp style={{color:"#0077b6"}}/>
                      <MenuLabel>Logout</MenuLabel>
                    </MenuItem>
                </Right>
                <Hamburger onClick={() => setOpen(!open)}>
                    {open ? <Close /> : <Menu />}
                </Hamburger>
             </Wrapper>
         </Container>
    )
}

export default AdminNavbar;