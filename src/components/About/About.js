import React from "react";

import './About.css';

const About = props  => {
  return (
   <div className="about_paragraph">
       <p>
           This website was created by Anthony Rice and Griffin Hines
           as their Computer Science capstone project at Christopher
           Newport University.<br/>
           The inspiration for this project is to help CNU students gage activity levels
           at the gymnasium in order for them to save time and better plan their workout schedule.<br/>
       </p>
   </div>
  );
};

export default About;
