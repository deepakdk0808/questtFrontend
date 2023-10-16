import React from "react";
import Navbar from "../Components/Navbar";
import Announcement from "./Announcement";
import Slider from "./Slider";
import Newsletter from "./NewsLetter";
import Footer from "../Components/Footer";


export default function Home(){
    return(
        <>
        <Announcement/>
        <Navbar/>
        <Slider/>
        <Newsletter/>
        <Footer/>
      </>
        
    )
}