import React from 'react';
import "./App.css";
import Navbar from './Navbar';

function Homepage() {
  return (
    <div>
      <Navbar />
      <h1>Welcome to PlanPal - Your Go-To Party Planning Assistant!</h1>
      <h3>
        PlanPal makes organizing events with friends a breeze. Whether it's a small gathering or a big celebration, PlanPal helps you keep everything on track. 
        Effortlessly create and manage events, set budgets, and coordinate who brings what, so everyone can contribute and enjoy the fun!
        
        Take control of your next event with features like real-time task assignment, easy budget tracking, and responsibility sharing. PlanPal ensures everyone’s on the same page, from drinks and snacks to decorations and beyond.

        Ready to plan the perfect event? Let’s make it happen with PlanPal - bringing people together, one party at a time!
      </h3>
    </div>
  );
}

export default Homepage;
