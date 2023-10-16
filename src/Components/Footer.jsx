  import FacebookIcon from '@mui/icons-material/Facebook';
  import InstagramIcon from '@mui/icons-material/Instagram';
  import MailOutlineIcon from '@mui/icons-material/MailOutline';
  import PhoneIcon from '@mui/icons-material/Phone';
  import PinterestIcon from '@mui/icons-material/Pinterest';
  import TwitterIcon from '@mui/icons-material/Twitter';
  import RoomIcon from '@mui/icons-material/Room';
  import styled from "styled-components";
  import React from 'react';
  
  const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    
    @media (max-width: 768px) {
      flex-direction: column;
    }
  `;
  
  const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
    @media (max-width: 768px) {
      padding: 20px 0;
    align-items: center;
    text-align: center;
    }
  `;

  const Logo = styled.h1`
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
  `;
  
  const Desc = styled.p`
    margin: 20px 0px;
    @media (max-width: 768px) {
      margin: 10px 0;
    }
  `;
  
  const SocialContainer = styled.div`
    display: flex;
    @media (max-width: 768px) {
      justify-content: center;
    }
  `;
  
  const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;

    @media (max-width: 768px) {
      margin: 0 10px;
    }
  `;
  
  const Center = styled.div`
    flex: 1;
    padding: 20px;
    @media (max-width: 768px) {
      padding: 20px 0;
      text-align: center;
    }
  `;
  
  const Title = styled.h3`
    margin-bottom: 30px;
    @media (max-width: 768px) {
      margin-bottom: 20px;
    }
  `;
  
  const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  `;
  
  const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;

    @media (max-width: 768px) {
      width: 100%;
      margin-bottom: 5px;
    }
  `;
  
  const Right = styled.div`
    flex: 1;
    padding: 20px;
    @media (max-width: 768px) {
      padding: 20px 0;
      text-align: center;
    }
  
  `;
  
  const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  `;
  
  const Payment = styled.img`
      width: 50%;
    
  `;
  
  const Footer = () => {
    return (
      <Container>
        <Left>
          <Logo>QUESTT BOOK SHOP.</Logo>
          <Desc>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don’t look even slightly believable.
          </Desc>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <FacebookIcon />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <InstagramIcon />
            </SocialIcon>
            <SocialIcon color="55ACEE">
              <TwitterIcon />
            </SocialIcon>
            <SocialIcon color="E60023">
              <PinterestIcon />
            </SocialIcon>
          </SocialContainer>
        </Left>
        <Center>
          <Title>Useful Links</Title>
          <List>
            <ListItem>Home</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Order Tracking</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Terms</ListItem>
          </List>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <RoomIcon style={{marginRight:"10px"}}/> 622 Dixie Path , South Tobinchester 98336
          </ContactItem>
          <ContactItem>
            <PhoneIcon style={{marginRight:"10px"}}/> +1 234 56 78
          </ContactItem>
          <ContactItem>
            <MailOutlineIcon style={{marginRight:"10px"}} /> contact@questtbookshop.dev
          </ContactItem>
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </Right>
      </Container>
    );
  };
  
  export default Footer;