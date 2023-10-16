import styled from "styled-components";
import {mobile} from "../responsiveSizes";
import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";



const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://unsplash.com/photos/TuNYNsK0OC0?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;



const Login = () => {
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const navigate = useNavigate();



const loginFun=(e,email,password)=>{
  e.preventDefault()
  let obj={
    email,
    password
  }
  axios.post(`https://questt.onrender.com/api/auth/login`,obj).then((res)=>{
    alert(res.data.message)
    console.log(res.data)
    let localObj={
      accessToken:res.data.accessToken,
      isAdmin:res.data.isAdmin,
      userid:res.data._id
    }
    localStorage.setItem('accessToken', JSON.stringify(localObj));
    if(res.data.isAdmin){
      navigate('/admin')
      alert("welcome admin")
    }
    else{
      navigate('/')
    }

    })
    .catch((err)=>{
      alert(err.response.data.message)
    })
}

  return (
    <>
    <Navbar/>
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input onChange={(e)=>setEmail(e.target.value)} placeholder="username" />
          <Input onChange={(e)=>setPassword(e.target.value)} type ='password' placeholder="password" />
          <Button onClick={(e)=>loginFun(e,email,password)}>LOGIN</Button>
          <Link onClick={()=>navigate('/register')}>CREATE AN ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
    </>
  );
};

export default Login;