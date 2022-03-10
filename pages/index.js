import Head from 'next/head';
import Header from '../components/Header';
import { getSession } from 'next-auth/react';
import Login from '../components/Login';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Widgets from '../components/Widgets';
import { query, collection, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

export default function Home({ session, posts }) {
  if (!session) {
    return <Login />;
  }
  return (
    <div className='h-screen bg-gray-100 overflow-hidden'>
      <Head>
        <title>Facebook</title>
      </Head>
      {/* header */}
      <Header />
      <main className='flex'>
        {/* sidebar */}
        <Sidebar />
        {/* feed */}
        <Feed posts={posts} session={session} />
        {/* widgets */}
        <Widgets />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context); //context has the request from the client
  const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
  const querySnapshot = await getDocs(q);
  const posts = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    timestamp: null,
  }));
  return {
    props: { session, posts },
  };
}
