import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyledFilter } from './Styled';

const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(searchValue);
    setSearchValue('');
  };

  const handleSearchTermChange = e => {
    setSearchValue(e.target.value);
  };

  return (
    <StyledFilter>
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          onChange={handleSearchTermChange}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          name="searchValue"
          value={searchValue}
          placeholder="Search images and photos"
        />
      </form>
    </StyledFilter>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
