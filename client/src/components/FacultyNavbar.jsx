import React, {useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import {useAlert} from 'react-alert'

import {Person,Dashboard,Ballot,VpnKey,ExitToApp,Group,Menu,Close} from '@material-ui/icons'
import styled from 'styled-components'
import {facultyLogout} from '../redux/actions/facultyAction'

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
  @media screen and (max-width: 425px) {
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

@media screen and (max-width: 425px) {
    margin: 10px 0;
    margin-left: 0;
    width: 100%;
}
`

const MenuLabel = styled.span`
  display: none;
  @media screen and (max-width: 425px) {
    display: block;
    margin-left: 10px;
    color: #0077b6;
    font-weight: 500;
  }
`


const FacultyNavbar = () => {
    const faculty = useSelector((store) => store.faculty) 
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const [open, setOpen] = useState(false);

    const logoutHandler = () => {
      dispatch(facultyLogout());
      alert.success("Logged Out");
      navigate('/');
    }

    const home = () => {
      navigate('/faculty')
    }

    const updateProfile = () => {
      navigate('/faculty/update')
    }

    const updatePassword = () => {
      navigate('/faculty/updatePassword')
    }

    const marksList = () => {
      navigate('/faculty/marks')
    }

    const attendance = () => {
      navigate('/faculty/attendance')
    }



    return(
         <Container>
             <Wrapper>
                 <Left>
                     <Link to="/">
                         <Logo>ERP</Logo>
                     </Link>
                 </Left>
                 <Right open={open}>
                  <MenuItem onClick={home}>
                      {faculty && <img src={faculty.faculty.faculty.avatar.url} style={{height:"28px",width:"28px",borderRadius:"50%"}}/> }
                      <MenuLabel>Profile</MenuLabel>
                      </MenuItem>
                      <MenuItem onClick={updateProfile}>
                        <Person style={{color:"#0077b6"}}/>
                        <MenuLabel>Update Profile</MenuLabel>
                      </MenuItem>
                      <MenuItem onClick={home}>
                        <Dashboard style={{color:"#0077b6"}}/>
                        <MenuLabel>Dashboard</MenuLabel>
                      </MenuItem>
                      <MenuItem onClick={updatePassword}>
                        <VpnKey style={{color:"#0077b6"}}/>
                        <MenuLabel>Update Password</MenuLabel>
                      </MenuItem>
                      <MenuItem onClick={attendance}>
                        <Group style={{color:"#0077b6"}}/>
                        <MenuLabel>Attendance</MenuLabel>
                      </MenuItem>
                      <MenuItem onClick={marksList}>
                        <Ballot style={{color:"#0077b6"}}/>
                        <MenuLabel>Marks List</MenuLabel>
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

export default FacultyNavbar;