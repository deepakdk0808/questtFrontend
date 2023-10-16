import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import styled from "styled-components";
import { mobile } from "../responsiveSizes";
import axios from "axios";
import AdminTable from "./AdminTable";

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
  margin-top: 150px;
  margin-bottom:200px;
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


const AdminBookForm = () => {
  const navigate = useNavigate();
  const [bookId, setBookId] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [averageRating, setAverageRating] = useState("");
  const [isbn, setIsbn] = useState("");
  const [isbn13, setIsbn13] = useState("");
  const [lang, setLang] = useState("");
  const [numPage, setNumPage] = useState("");
  const [ratingCount, setRatingCount] = useState("");
  const [textReview, setTextReview] = useState("");
  const [date, setDate] = useState("");
  const [publisher, setPublisher] = useState("");

  const addBookDetails = (
    e,
    bookId,
    title,
    author,
    averageRating,
    isbn,
    isbn13,
    lang,
    numPage,
    ratingCount,
    textReview,
    date,
    publisher
  ) => {
    e.preventDefault();
    let objBook = {
      bookID: bookId,
      title: title,
      authors: author,
      average_rating: averageRating,
      isbn: isbn,
      isbn13: isbn13,
      language_code: lang,
      num_pages: numPage,
      ratings_count: ratingCount,
      text_reviews_count: textReview,
      publication_date: date,
      publisher: publisher,
    };

    // console.log("obj",objBook)


    axios .post(`https://questt.onrender.com/api/books`, objBook)
      .then((res) => {
        alert(res.data.message);
        console.log(res.data);
      })
      .catch((err) => {
        alert('Please Fill The Details Correctly');
        // console.log(err.response.data.message)
      });
  };

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>ADD BOOKS</Title>
          <Form>
            <Input
              onChange={(e) => setBookId(e.target.value)}
              placeholder="BookID"
              required
            />
            <Input
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
            />
            <Input
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author"
              required
            />
            <Input
              onChange={(e) => setAverageRating(e.target.value)}
              placeholder="Average Rating 0-5"
              required
              type="number"
              step="1.01"
              max="4.99"
            />
            <Input
              onChange={(e) => setIsbn(e.target.value)}
              placeholder="ISBN-10 Digit"
              required
              pattern="\d{10}"
              title="ISBN must be 10 digits."
            />
            <Input
              onChange={(e) => setIsbn13(e.target.value)}
              placeholder="ISBN13-13 Digit"
              required
              pattern="\d{13}"
              title="ISBN must be 13 digits."
            />
            <Input
              onChange={(e) => setLang(e.target.value)}
              placeholder="Language"
              required
            />
            <Input
              onChange={(e) => setNumPage(e.target.value)}
              placeholder="Num of Pages"
              required
              type="number"
            />
            <Input
              onChange={(e) => setRatingCount(e.target.value)}
              placeholder="Ratings Count"
              required
              type="number"
            />
            <Input
              onChange={(e) => setTextReview(e.target.value)}
              placeholder="Text Reviews Count"
              required
              type="number"
            />
            <Input
              onChange={(e) => setDate(e.target.value)}
              placeholder="Publication Date MM/DD/YYYY"
              required
              pattern="^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$"
              title="Please enter a date in MM/DD/YYYY format."
            />
            <Input
              onChange={(e) => setPublisher(e.target.value)}
              placeholder="Publisher"
              required
            />

            <Button
              onClick={(e) =>
                addBookDetails(
                  e,
                  bookId,
                  title,
                  author,
                  averageRating,
                  isbn,
                  isbn13,
                  lang,
                  numPage,
                  ratingCount,
                  textReview,
                  date,
                  publisher
                )
              }
            >
              Add Book
            </Button>
            <Link onClick={() => navigate("/")}>Go To Home Page</Link>
          </Form>
        </Wrapper>
      </Container>
      <AdminTable/>
    </>
  );
};



export default AdminBookForm;


 
