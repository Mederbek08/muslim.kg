// src/components/AboutUsPage.jsx

import React from 'react';
import AboutUsHero from '../components/AboutUsHero';
import MissionVision from '../components/MissionVision';
import OurValues from '../components/OurValues'; 
import CompanyHistory from '../components/CompanyHistory';
import Footer from '../components/Footer';
import Header from '../components/layout/Header';

const AboutUsPage = () => {
  return (
    <div> <Header />
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 py-16 px-4 sm:px-6 lg:px-8">
     
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* 1. Блок Героя/Введения */}
        <AboutUsHero />

        {/* 2. Миссия и Видение */}
        <div className="pt-8">
          <MissionVision />
        </div>

        {/* 3. Наши Ценности */}
        <OurValues />

        {/* 4. История Компании */}
        <CompanyHistory />
    

        {/* Секция CTA или Заключение */}
        <section className="text-center text-white pt-12">
            <p className="text-xl text-white/90">
                Мы растем вместе с вами. Благодарим за доверие!
            </p>
        </section>

      </div>
    
    </div>
      <Footer /></div>
  );
};

export default AboutUsPage;