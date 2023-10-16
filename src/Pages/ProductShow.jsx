import styled from "styled-components";
import Announcement from "./Announcement";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Newsletter from "./NewsLetter";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Container = styled.div`
display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  flex-direction:row
  @media (max-width: 768px) {
    padding: 10px;
    flex-direction: column;
  }
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  @media (max-width: 768px) {
    height: 50vh;
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  font-weight: 200;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Desc = styled.p`
  margin: 20px 0px;
  @media (max-width: 768px) {
    margin: 5px 0px;
  }
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  };
  .button-container {
    display: flex;
    flex-direction: column;

    button {
      padding: 15px;
      border: 2px solid teal;
      background-color: white;
      cursor: pointer;
      font-weight: 500;
      margin-bottom: 10px;

      &:hover {
        background-color: #f8f4f4;
      }
    }
  };
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const ProductShow = () => {
  const navigate = useNavigate();
  const [bookDetails, setBookDetails] = useState();
  const [quantity, setQuantity] = useState(1);
  let { id } = useParams();

  let accessTokenObj = JSON.parse(localStorage.getItem("accessToken"));

  useEffect(() => {
    getBookDetails();
    // eslint-disable-next-line
  }, []);

  const getBookDetails = async () => {
    try {
      const resp = await axios.get(
        `https://questt.onrender.com/api/books/find/${id}`
      );
      setBookDetails(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (quantity, userId, bookId, accessToken) => {
    let cartObj = {
      book: bookId,
      user: userId,
      quantity,
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          token: `${accessToken}`,
        },
      };
      // eslint-disable-next-line
      const resp = await axios.post(
        "https://questt.onrender.com/api/carts",
        cartObj,
        config
      );

      alert("Books are Added");
    } catch (error) {
      console.log(error);
    }
  };

  const LoginFirst = () => {
    alert("Please Login First");
    navigate("/login");
  };

  return (
    <>
      {bookDetails ? (
        <Container>
          <Navbar />
          <Announcement />
          <Wrapper>
            <ImgContainer>
              <Image src="https://cdn.pixabay.com/photo/2023/01/05/04/43/ai-generated-7698052_1280.jpg" />
            </ImgContainer>
            <InfoContainer>
              <Title>{bookDetails.title}</Title>
              <Desc>
                <div>Authors-{bookDetails.authors}</div>
                <div>Language-{bookDetails.language_code}</div>
                <div>Ratings Count-{bookDetails.ratings_count}</div>
                <div>Reviews-{bookDetails.text_reviews_count}</div>
                <div>Rating Out Of 5-{bookDetails.average_rating}</div>
                <div>Publisher-{bookDetails.publisher}</div>
                <div>Publication Date-{bookDetails.publication_date}</div>
                <div>ISBN-{bookDetails.isbn}</div>
                <div>ISBN13-{bookDetails.isbn13}</div>
              </Desc>
              <AddContainer>
                <AmountContainer>
                  
                  <Button
                    onClick={() => setQuantity(quantity - 1)}
                    disabled={quantity === 1}
                  >
                    -
                  </Button>
                  <Amount>{quantity}</Amount>
                  <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
                </AmountContainer>

                <div className="button-container">
                {!accessTokenObj &&
                accessTokenObj === null &&
                accessTokenObj === undefined ? (
                  <Button onClick={() => LoginFirst()}>Add to Cart</Button>
                ) : (
                  <Button
                    onClick={() => {
                      addToCart(
                        quantity,
                        accessTokenObj.userid,
                        bookDetails._id,
                        accessTokenObj.accessToken
                      );
                    }}
                  >
                    ADD TO CART
                  </Button>
                )}
                 <Button onClick={() => navigate(`/cart`)}>Checkout</Button>
                 </div>
              </AddContainer>
            </InfoContainer>
          </Wrapper>
          <Newsletter />
          <Footer />
        </Container>
      ) : (
        ""
      )}
    </>
  );
};

export default ProductShow;
