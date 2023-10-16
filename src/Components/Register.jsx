import styled from "styled-components";
import { mobile } from "../responsiveSizes";
import React, { useState } from 'react';
import axios from "axios";
import {useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";



const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://unsplash.com/photos/TuNYNsK0OC0")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [username,setUserName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const navigate = useNavigate();

  const registerUser=(e,username,email,password)=>{
    e.preventDefault()
    let obj={
      username,
      email,
      password
    }
    console.log("user",obj)
    axios.post(`https://questt.onrender.com/api/auth/register`,obj).then((res)=>{
    alert(res.data.message)
    navigate('/login')
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
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input onChange={(e)=>setUserName(e.target.value)} name='username' placeholder="name" />
          <Input onChange={(e)=>setEmail(e.target.value)} name='email' placeholder="email" />
          <Input onChange={(e)=>setPassword(e.target.value)} type='password' name='password' placeholder="password" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={(e)=>registerUser(e,username,email,password)}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
    </>
  );
};

export default Register;