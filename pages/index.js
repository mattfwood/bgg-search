import React from 'react';
import Link from 'next/link';
import Head from '../components/head';
import Nav from '../components/nav';
import Search from '../components/Search';
import Page from '../components/Page';

const Home = () => (
  <div>
    <Head title="Home" />
    <Nav />

    <Page>
      <Search />
    </Page>
  </div>
);

export default Home;
