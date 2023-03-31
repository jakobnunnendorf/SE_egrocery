import React from 'react';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <div className="home__banner">
        <h1 className="home__title">Welcome to eGrocery</h1>
        <p className="home__subtitle">Shop online for fresh groceries and more</p>
      </div>
      <div className="home__categories">
        {/* Add your categories here as divs or other components */}
      </div>
    </div>
  );
}
