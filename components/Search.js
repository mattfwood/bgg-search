import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import api from '../api';

const SearchStyles = styled.div`
  display: flex;
  justify-content: center;

  input {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`;

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const onChange = e => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange,
  };
};

const Search = () => {
  const query = useFormInput('');

  const [results, setResults] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await api.search(query.value);
    setResults(res);
  };

  return (
    <SearchStyles>
      <form onSubmit={handleSubmit}>
        <input {...query} placeholder="Search Games" />
        <button type="submit">Search</button>
      </form>
      {results.map(result => (
        <div>
          <Link key={result.$.id} href={`/game?id=${result.$.id}`}>
            <a>{result.name[0].$.value}</a>
          </Link>
        </div>
      ))}
    </SearchStyles>
  );
};

export default Search;
