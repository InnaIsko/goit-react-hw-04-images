import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles.css';

export function Searchbar({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = e => {
    setInputValue(e.currentTarget.value.toLowerCase());
  };

  const handleSabmit = e => {
    e.preventDefault();

    onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <header className="searchbar">
      <form className="form" onSubmit={handleSabmit}>
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>
        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
