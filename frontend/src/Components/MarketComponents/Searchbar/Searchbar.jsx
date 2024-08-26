import React from 'react';
import './Searchbar.css';

const Searchbar = ({ handleSearch, searchTerm, suggestions, onSuggestionClick, cartItems }) => {
  const handleChange = (e) => {
    handleSearch(e.target.value);
  };

  const highlightNonMatchingPart = (suggestion, searchTerm) => {
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = suggestion.split(regex);
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === searchTerm.toLowerCase() ? (
            <span key={index} className="matching-part">{part}</span>
          ) : (
            <span key={index} className="non-matching-part">{part}</span>
          )
        )}
      </span>
    );
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for products"
        value={searchTerm}
        onChange={handleChange}
      />
      {suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => onSuggestionClick(suggestion)}
            >
              {highlightNonMatchingPart(suggestion, searchTerm)}
            </div>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="suggestions-dropdown">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => onSuggestionClick(item.Name)}
            >
              {highlightNonMatchingPart(item.Name, searchTerm)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
