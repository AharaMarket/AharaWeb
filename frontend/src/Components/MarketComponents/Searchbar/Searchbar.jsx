import React, { useState } from 'react';
import './Searchbar.css';

const Searchbar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for products"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default Searchbar;