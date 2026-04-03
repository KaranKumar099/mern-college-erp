import React from 'react'
import {useSelector} from 'react-redux'
import {Link,useNavigate} from 'react-router-dom'
import StudentNavbar from '../components/StudentNavbar'

import styled from 'styled-components'


const Container = styled.div`
display:flex;
width:100%;
max-width: 100vw;
box-sizing: border-box;
background-color:white;
overflow-x: hidden;

@media screen and (max-width: 768px) {
    flex-direction: column;
    height: auto;
}
`

const Header = styled.div` 
display:flex;
flex: 1;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 2rem;

>h1{
    font-size: 2rem;
    font-weight: 500;
    color:#0077b6;
    margin-bottom: 2rem;
}
>img{
    width: 200px;
    height: 200px;
    object-fit:cover;
    border-radius:100%;
    margin-bottom: 1rem;
    border: 4px solid #0077b6;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}
>h3 {
    margin: 0.5rem 0;
    color: #333;
}
>a{
    border-radius: 10px;
    background-color: #0077b6;
    font-size: 1rem;
    color: white;
    text-decoration: none;
    padding: 0.8rem 2rem;
    margin-top: 1.5rem;
    text-align: center;
    transition: all 0.3s;

    &:hover {
        background-color: #005f92;
        transform: translateY(-2px);
    }
}

@media screen and (max-width: 768px) {
    height: auto;
    padding: 3rem 1rem;
    
    >h1 {
        font-size: 1.8rem;
    }
    >img {
        width: 180px;
        height: 180px;
    }
}
`

const ProfileInfo = styled.div` 
display:flex;
flex: 1;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 2rem;

@media screen and (max-width: 768px) {
    height: auto;
    padding: 2rem 1rem;
}
`

const ProfileInfoItem = styled.div`
display: flex;
flex-direction: column;
justify-content:center;
align-items:center;
padding: 1rem;
width: 80%;
box-sizing:border-box;
border-bottom: 0.5px solid rgba(0, 119, 182, 0.2);

>h4{
    color:#0077b6;
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 0.2rem;
};
>p{
    color: #555;
    font-size: 1.1rem;
    font-weight: 500;
    margin: 0;
    text-align:center;
}

@media screen and (max-width: 426px) {
    width: 100%;
}
`


const StudentDashboard = () => {
    const student = useSelector((store) => store.student)
    const navigate = useNavigate();
  return (
    <>
    {
        student.isAuthenticated ? (
<>
<StudentNavbar/>
    <Container>
      <Header>
          <h1>Student Profile</h1>
          <img src={student.student.student.avatar.url} />
          <h3>{student.student.student.name}</h3>
          <h3>{student.student.student.registrationNumber}</h3>
          <Link to="/student/update">Update Profile</Link>
      </Header>
      <ProfileInfo>
          <ProfileInfoItem>
              <h4>Email</h4>
              <p>{student.student.student.email}</p>
          </ProfileInfoItem>
          <ProfileInfoItem>
              <h4>Department</h4>
              <p>{student.student.student.department}</p>
          </ProfileInfoItem>
          <ProfileInfoItem>
              <h4>Year</h4>
              <p>{student.student.student.year}</p>
          </ProfileInfoItem>
          <ProfileInfoItem>
              <h4>Mobile Number</h4>
              <p>{student.student.student.studentMobileNumber}</p>
          </ProfileInfoItem>
          <ProfileInfoItem>
              <h4>Father Name</h4>
              <p>{student.student.student.fatherName}</p>
          </ProfileInfoItem>
          <ProfileInfoItem>
              <h4>Parent Number</h4>
              <p>{student.student.student.fatherMobileNumber}</p>
          </ProfileInfoItem>
      </ProfileInfo>
    </Container>
</>
        ):(
            navigate('/')
        )
    }  
    </>
  )
}

export default StudentDashboard
