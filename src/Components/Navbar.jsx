import React from "react";
import styled from "styled-components";
import {ShoppingCartOutlined } from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
 
const Container = styled.div`
  height: 60px;
  @media (max-width: 768px) {
    height: 80px;
  }
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    padding: 10px 10px;
  }
`;

const Left = styled.div`
  flex: 1;
  display:flex;
  align-items:center;
  @media (max-width: 768px) {
    justify-content: flex-start;
  }
  
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
  @media (max-width: 768px) {
    flex: auto;
  }
`;
const Logo = styled.h1`
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  @media (max-width: 768px) {
    font-size: 12px;
    margin-left: 10px;
  }
`;

export default function Navbar() {
  const navigate=useNavigate();
  let accessTokenObj=JSON.parse(localStorage.getItem("accessToken"));

  const Logout=()=>{
    localStorage.removeItem("accessToken")
    alert("you're logged out,please login")
    navigate('/login')
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
        </Left>
        <Center>
          <Logo onClick={()=>navigate('/')}>QUESTT BOOK SHOP.</Logo>
        </Center>
        <Right>
          {
           ( !accessTokenObj ||
            accessTokenObj === null ||
            accessTokenObj === undefined) ?
            <>
            <MenuItem onClick={()=>navigate('/register')}>Register</MenuItem>
          <MenuItem onClick={()=>navigate('/login')}>Sign In</MenuItem>
            </>
            :
            <>
            <MenuItem onClick={()=>{Logout()}}>Log Out</MenuItem>
            </>
          }
          
          <MenuItem>
            <Badge color="primary">
              <ShoppingCartOutlined onClick={() => navigate(`/cart`)}/>
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
}
