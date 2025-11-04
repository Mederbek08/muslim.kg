import React, { useState } from 'react';
import Header from '../Layout/Header';
import Footer from '../Footer';
import Slider from '../Slider';
import Cards from '../Cards';

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
  <div className="relative"> 
    <Header 
      onSearch={handleSearch} 
      onCategorySelect={handleCategorySelect} 
    />

    <Slider />

    <main>
      <Cards 
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