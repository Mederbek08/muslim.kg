import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/Footer';
import Slider from '../components/Slider';
import Cards from '../components/Cards';

function Home() {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(''); 

  const handleSearch = (text) => {
    // Устанавливает поисковый запрос и сбрасывает категорию
    setSearchTerm(text);
    setCategoryFilter(''); 
  };

  const handleCategorySelect = (category) => {
    // Устанавливает категорию и сбрасывает поисковый запрос
    setCategoryFilter(category);
    setSearchTerm(''); 
  };

  return (
    <div className="relative pt-20"> 
      
      <Header 
        onSearch={handleSearch} 
        onCategorySelect={handleCategorySelect} 
      />
      
      <Slider />
      
      <main>
        <Cards 
          // Передаем текущие фильтры в Cards
          searchTerm={searchTerm} 
          categoryFilter={categoryFilter} 
          onCategorySelect={handleCategorySelect}
        />
      </main>

      <Footer />
    </div>
  )
}

export default Home;