import React, { useEffect, useState } from 'react';
import {
  query,
  collection,
  getDocs,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../firebase';
import Post from './Post';

function Posts({ serversidePosts }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let postsData = [];
      querySnapshot.forEach((doc) => {
        //const postData = snap.docs.map(doc => doc.data()) //toDate errors
        let docData = doc.data();
        docData.timestamp =
          doc.data().timestamp &&
          doc.data().timestamp.toDate().toLocaleString();
        docData.id = doc.id;
        postsData.push(docData);
      });
      setPosts(postsData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {posts
        ? posts.map((post) => {
            return (
              <Post
                key={post.id}
                id={post.id}
                name={post.name}
                email={post.email}
                message={post.message}
                postImage={post.postImage}
                timestamp={post.timestamp}
                image={post.image}
              />
            );
          })
        : serversidePosts.map((post) => {
            return (
              <Post
                key={post.id}
                id={post.id}
                name={post.name}
                email={post.email}
                message={post.message}
                postImage={post.postImage}
                timestamp={post.timestamp}
                image={post.image}
              />
            );
          })}
    </div>
  );
}

export default Posts;
