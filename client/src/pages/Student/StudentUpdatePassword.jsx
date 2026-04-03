import React,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {useAlert} from 'react-alert'

import StudentNavbar from '../../components/StudentNavbar'
import styled from 'styled-components'
import {VpnKey,Lock,LockOpen} from '@material-ui/icons'
import { studentUpdatePassword,studentLogout } from '../../redux/actions/studentAction'


const Container = styled.div`
width:100%;
height:100vh;
max-width:100%;
display:flex;
justify-content:center;
align-items: center;
background-color:rgb(231,231,231);
overflow-x: hidden;
`

const ProfileBox = styled.div` 
background-color:white;
width:25vw;
height:70vh;
box-sizing:border-box;

@media screen and (max-width: 1024px) {
    width: 50vw;
}

@media screen and (max-width: 426px) {
    width: 90vw;
    height: 60vh;
}
`

const ProfileHeader = styled.h1` 
text-align:center;
color:#0077b6;
font:400 1.3rem;
padding:1.3rem;
border-bottom:1px solid #0077b6;
width:max-content;
margin: 1rem auto;

@media screen and (max-width: 426px) {
    font-size: 1.1rem;
    padding: 1rem;
}
`

const ProfileForm = styled.form` 
display:flex;
flex-direction: column;
align-items:center;
justify-content:space-evenly;
margin: auto;
padding: 2rem;
height: 70%;
box-sizing: border-box;

>div{
    display:flex;
    align-items:center;
    width:100%;
    margin: 1rem 0;
}
`
const ProfilePass = styled.div` 
position: relative;
>svg{
    position:absolute;
    transform:translateX(10px);
    font-size:1.5rem;
    color: rgba(0,0,0,0.6);
}
`
const ProfileInput = styled.input` 
padding: 12px 12px 12px 40px;
width:100%;
box-sizing:border-box;
border:1px solid #0077b6;
border-radius:4px;
font: 300 1rem;
outline:none;

@media screen and (max-width: 426px) {
    font-size: 0.9rem;
}
`
const ProfileButton = styled.button` 
border:none;
background-color: #0077b6;
color:white;
font: 400 1rem;
width: 100%;
  padding: 12px;
  cursor: pointer;
  border-radius: 4px;
  outline: none;
  box-shadow:0 2px 5px rgba(0,0,0,0.219);
  transition: all 0.3s;

  &:hover {
      background-color: #005f92;
  }
`

const StudentUpdatePassword = () => {
    const student = useSelector((store) => store.student)
    const store = useSelector((store) => store);
    const navigate = useNavigate('/');
    const dispatch = useDispatch();
    const alert = useAlert();

    const [oldPassword,setOldPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [confirmNewPassword,setConfirmNewPassword] = useState("");
    const [error, setError] = useState({})

    const formHandler = async(e) => {
        e.preventDefault();
        dispatch(studentUpdatePassword({oldPassword,newPassword,confirmNewPassword,registrationNumber:student.student.student.registrationNumber}))
        alert.success("Password Updated Successfully..Please Login Again");
        dispatch(studentLogout());
    }

   
    return(
        <>
        {
            student.isAuthenticated?(
                <>
                <StudentNavbar/>
                <Container>
                    <ProfileBox>
                        <ProfileHeader>
                            Update Password
                        </ProfileHeader>
                        <ProfileForm encType='multiform/form-data' onSubmit={formHandler}>
                            <ProfilePass>
                                <VpnKey/>
                                <ProfileInput type="password" placeholder="Old Password" onChange={(e) => setOldPassword(e.target.value)} required name="oldPassword" value={oldPassword}/>
                            </ProfilePass>
                            <ProfilePass>
                                <Lock/>
                                <ProfileInput type="password" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} required name="newPassword" value={newPassword}/>
                            </ProfilePass>
                            <ProfilePass>
                                <LockOpen/>
                                <ProfileInput type="password" placeholder="Confirm Password" onChange={(e) => setConfirmNewPassword(e.target.value)} required name="confirmNewPassword" value={confirmNewPassword}/>
                            </ProfilePass>
                            <ProfileButton type="submit">
                                Update Password
                            </ProfileButton>
                        </ProfileForm>
                    </ProfileBox>
                </Container>
                </>
            ):(
                navigate("/")
            )
        }
     </>  
    )
}

export default StudentUpdatePassword;
