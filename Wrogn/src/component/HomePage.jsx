import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Navbar from './Navbar';
import Sliderone from './Sliderone';
import Card from './Card';
import ViratFashionPage from './ViratFashionPage';
import TrendingCategories from './TrendingCategories';
import BestSellers from './BestSellers';
import WeAreWrogn from './WeAreWrogn';
import WrognWallpapers from './Wallpapers';
import ServiceHighlights from './ServiceHighlights';
import Footer from './Footer';




function HomePage() {
  return (
    <>
      <Navbar />
      <Sliderone />
      <Card />
      <ViratFashionPage />
      <TrendingCategories />
      <BestSellers />
      <WeAreWrogn />
      <WrognWallpapers />
      <ServiceHighlights />
      <Footer />
    </>
  );
}

export default HomePage;