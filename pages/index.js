// pages/index.js
import Head from 'next/head';
import BusinessList from '../components/BusinessList';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Business List</title>
        <meta name="description" content="List of businesses" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-8">
        <h1 className="text-3xl font-bold mb-8">Business List</h1>
        <BusinessList page={1} limit={10} category="" name="" />
      </main>
    </div>
  );
};

export default Home;
