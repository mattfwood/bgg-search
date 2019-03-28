import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import AsyncSelect from 'react-select/lib/Async';
// import debounce from 'lodash.debounce';
import debounce from 'debounce-promise';
import api from '../api';

const SearchStyles = styled.div`
  /* display: flex;
  justify-content: center; */
  width: 100%;
  padding-left: 10vw;

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

const loadOptions = debounce(
  async inputValue => {
    const res = await api.search(inputValue);
    const options = res.map(result => ({
      label: result.name[0].$.value,
      value: result.$.id,
    }));
    console.log(options);

    return options;
  },
  400
  // { leading: true }
);

// const getAsyncOptions = inputValue => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const res = await api.search(inputValue);
//       const options = res.map(result => ({
//         label: result.name[0].$.value,
//         value: result.$.id,
//       }));
//       resolve(options);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// const selectStyles = {
//   container: {
//     width: '100%',
//   },
// };

const Search = () => {
  const query = useFormInput('');

  const [results, setResults] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await api.search(query.value);
    setResults(res);
  };

  const handleChange = item => {
    Router.push({
      pathname: '/game',
      query: {
        id: item.value,
      },
    });
  };

  return (
    <SearchStyles>
      {/* <form onSubmit={handleSubmit}>
        <input {...query} placeholder="Search Games" />
        <button type="submit">Search</button>
      </form> */}
      <AsyncSelect
        cacheOptions
        defaultOptions
        isClearable
        className="game-search"
        loadOptions={loadOptions}
        onChange={handleChange}
        // styles={selectStyles}
      />
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
