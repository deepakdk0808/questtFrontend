import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styled from "styled-components";
import Announcement from "./Announcement";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import React, { useEffect,useState } from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';



const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
 
`;


const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  @media (max-width: 768px) {
    display:grid;
  }
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductLang = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
 
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    margin-top:450px;
    margin-right:100px;
  }
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;

`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};

`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  let accessTokenObj=JSON.parse(localStorage.getItem("accessToken"));
  const [allBooks,setAllBooks]=useState();
  const navigate = useNavigate();

  const increaseQuantity =async (index,id) => {
    const updatedAllBooks = [...allBooks];
    updatedAllBooks[index].quantity++; 
        const config = {
      headers: {
        'Content-Type': 'application/json',
        'token': `${accessTokenObj.accessToken}`
      },
    };

    const response = await axios.patch(`https://questt.onrender.com/api/carts/${id}`, { quantity: updatedAllBooks[index].quantity }, config);
    if (response.data) {
      setAllBooks(updatedAllBooks);
    }
  };
  
  const decreaseQuantity = async(index,id) => {
    if (allBooks[index].quantity > 1) {
      const updatedAllBooks = [...allBooks];
      updatedAllBooks[index].quantity--; 

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'token': `${accessTokenObj.accessToken}`
        },
      };
  
      const response = await axios.patch(`https://questt.onrender.com/api/carts/${id}`, { quantity: updatedAllBooks[index].quantity }, config);
      if (response.data) {
        setAllBooks(updatedAllBooks);
      }
    }
  };
  

  const calculateTotalQuantity = () => {
    return allBooks?.reduce((total, item) => total + item.quantity, 0);
  };


  useEffect(()=>{
    cartItems()
    removeProductFromCart();
    // eslint-disable-next-line
  },[])

  const cartItems=async()=>{
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'token': `${accessTokenObj.accessToken}`
        },
      };
      const resp = await axios.get('https://questt.onrender.com/api/carts', config);
      setAllBooks(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  const removeProductFromCart = async (cartItemId) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'token': `${accessTokenObj.accessToken}`
        },
      };
      await axios.delete(`https://questt.onrender.com/api/carts/${cartItemId}`, config);
      const updatedCart = allBooks.filter((item) => item.id !== cartItemId);
      setAllBooks(updatedCart);
     

    } catch (error) {
      console.log(error);
    }
    cartItems();
  };


  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton
          onClick={() => navigate(`/`)}
          >CONTINUE SHOPPING</TopButton>
        </Top>
        <div className='productShow'>
          <div >
            {allBooks && allBooks?.map((e,index)=>{
              return(
          <div key={index} className='info' >
                <ProductDetail>
                  <Image src="https://media.istockphoto.com/id/1250703281/vector/shopping-trolley-with-stack-of-books-knowledge-purchase.jpg?s=612x612&w=0&k=20&c=DLR2SJ86wsiVtGKQ1TCMEso_WYR6Zv4k7M2CRpMcjHs=" />
                  <Details>
                    <ProductName>
                      <b>Book:</b> {e.book.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {e.book.bookID}
                    </ProductId>
                    <ProductLang>
                      <b>Language:</b> {e.book.language_code}
                    </ProductLang>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <AddIcon
                    onClick={() => increaseQuantity(index,e._id)} 
                     />
                     <ProductAmount>{e.quantity}</ProductAmount>
                    <RemoveIcon
                     onClick={() => decreaseQuantity(index,e._id)}
                     />
                <Button onClick={() => removeProductFromCart(e._id)}>Remove</Button>
                  </ProductAmountContainer>
                </PriceDetail>
          </div>
              )
            })}  
          </div>
          <div className='summary'>
          <Summary>
<SummaryTitle>ORDER SUMMARY</SummaryTitle>
<SummaryItem>
<SummaryItemText>Total Quantity</SummaryItemText>
<SummaryItemPrice>{calculateTotalQuantity()}</SummaryItemPrice>
</SummaryItem>
<SummaryItem type="total">
  <SummaryItemText>Total</SummaryItemText>
  <SummaryItemPrice>$ 80</SummaryItemPrice>
</SummaryItem>
<Button>CHECKOUT NOW</Button>
</Summary> 
          </div>
        </div>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;














