import React, {useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import {useAlert} from 'react-alert'

import {Person,Dashboard,Ballot,VpnKey,ExitToApp,Group,Chat,Search,Menu,Close} from '@material-ui/icons'
import styled from 'styled-components'

import {studentLogout,newerChats,previousChats} from '../redux/actions/studentAction'

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
position:relative;
display: flex;
align-items: center;
a{
    text-decoration:none;
    color:white;
};

@media screen and (max-width: 425px) {
    margin: 10px 0;
    margin-left: 36px;
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
const IconBadge = styled.span` 
width:15px;
height:15px; 
background-color:tomato;
border-radius: 50%;
  color: white;
  position: absolute;
  top: -5px;
  right: -5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`



const StudentNavbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name,setName] = useState("");
    const [open, setOpen] = useState(false);
    const alert = useAlert();
  
    const student = useSelector((store) => store.student)
    
    useEffect(() => {
      if(student.student.student.name)
      {
        nameHandler();
      }
    },[student.student.student.name])

    useEffect(() => {
      dispatch(newerChats(student.student.student.name));
      dispatch(previousChats(student.student.student.name));
    },[student.newerChats.length])

    const logoutHandler = () => {
      dispatch(studentLogout());
      navigate('/');
      alert.success("Student Logout Successful");
    }

    const nameHandler = () => {
      setName(student.student.student.name)
    }

    const home = () => {
      navigate('/home')
    }

    const updateProfile = () => {
      navigate('/student/update')
    }

    const updatePassword = () => {
      navigate('/student/updatePassword')
    }

    const subjectList = () => {
      navigate('/student/subjects')
    }

    const marksList = () => {
      navigate('/student/performance')
    }

    const attendance = () => {
      navigate('/student/attendance')
    }
  
    const searchStudent = () => {
      navigate('/student/search')
    }

    const chatList = () => {
      navigate('/student/chatList')
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
                       {student && <img src={student.student.student.avatar.url} style={{height:"28px",width:"28px",borderRadius:"50%"}}/> }
                       <MenuLabel>Profile</MenuLabel>
                     </MenuItem>
                     <MenuItem onClick={updateProfile}>
                       <Person style={{color:"#0077b6"}}/>
                       <MenuLabel>Update Profile</MenuLabel>
                     </MenuItem>
                     <MenuItem onClick={marksList}>
                       <Dashboard style={{color:"#0077b6"}}/>
                       <MenuLabel>Performance</MenuLabel>
                     </MenuItem>
                     <MenuItem onClick={updatePassword}>
                       <VpnKey style={{color:"#0077b6"}}/>
                       <MenuLabel>Update Password</MenuLabel>
                     </MenuItem>
                     <MenuItem onClick={searchStudent}>
                       <Search style={{color:"#0077b6"}}/>
                       <MenuLabel>Search Student</MenuLabel>
                     </MenuItem>
                     <MenuItem onClick={attendance}>
                       <Group style={{color:"#0077b6"}}/>
                       <MenuLabel>Attendance</MenuLabel>
                     </MenuItem>
                     <MenuItem onClick={subjectList}>
                       <Ballot style={{color:"#0077b6"}}/>
                       <MenuLabel>Subjects</MenuLabel>
                     </MenuItem>
                     <MenuItem onClick={chatList}>
                        <Chat style={{color:"#0077b6"}}/>
                        <IconBadge>{student.newerChats.length}</IconBadge>
                        <MenuLabel>Chat</MenuLabel>
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

export default StudentNavbar;