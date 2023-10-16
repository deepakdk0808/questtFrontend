import React,{ useEffect, useState } from 'react';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import {useNavigate } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    padding: 10px;
    flex-direction: column;
  }

`;

const CardWrapper = styled.div`
width: calc(33.33% - 10px); 
margin: 5px;
@media (max-width: 768px) {
  width: 100%;
} 
`;

const SearchContainer = styled.div`
  width:40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left:35%;
  padding: 5px;
  margin-bottom: 10px;
  border: 0.5px solid lightgray;
  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
  }
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
`;

const PageLimit = styled.div`
  margin-right: 10px; 
`;

const PageButton = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  border: 0.5px solid lightgray;
  padding: 5px;
  margin-top: 10px; 
  @media (max-width: 768px) {
    width: 100%;
  }
`;


export default function Slider() {
  const [allBooks,setAllBooks]=useState();
  const [searchQuery,setSearchQuery]=useState('');
  const navigate = useNavigate();
  const [page,setPage]=useState(1);
  const [limit,setLimit]=useState(6);


  useEffect(()=>{
   getAllBooks()
   // eslint-disable-next-line
  },[searchQuery,page,limit])

  const getAllBooks=async()=>{
    const res=await axios.get(`https://questt.onrender.com/api/books?search=${searchQuery}&page=${page}&limit=${limit}`)
    setAllBooks(res.data)
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1) {
      setPage(newPage);
    }
  };


  return(
    <>
   <SearchContainer>
   <Pagination>
              <PageLimit>
              <select placeholder='Set Limit' onChange={(e)=>setLimit(e.target.value)}>
                <option value='6'>6</option>
                <option value='10'>10</option>
              </select>
              </PageLimit>
              <PageButton>
            <Button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>Prev Page</Button>
            <p as='b'>Page No:- {page}</p>
            {allBooks?.length >=limit && (
              <Button onClick={() => handlePageChange(page + 1)}>Next Page</Button>
            )}
              </PageButton>
              </Pagination>
    <Input
     type="text"
     placeholder="Search books"
     value={searchQuery}
     onChange={(e) => {setSearchQuery(e.target.value)

    } }
    />
   </SearchContainer>
  <Container>
{allBooks && allBooks?.map((e, index) => {
    return (
      <CardWrapper key={index}>
      <Card sx={{ width: 200 }} style={{margin:"5px" }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom >
            {e.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
           By- {e.authors}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" 
          onClick={() => navigate(`/booksInfo/${e._id}`)}
          >Learn More</Button>
        </CardActions>
      </Card>
      </CardWrapper>
    );
  })}
  </Container>

  </>
  )

}


