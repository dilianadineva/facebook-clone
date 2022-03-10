import React, { useState } from 'react';
import InputBox from './InputBox';
import Posts from './Posts';
import Stories from './Stories';

function Feed({ posts, session }) {
  return (
    <div className='flex-grow h-screen pb-44 pt-6 mr-4 xl:mr-40 overflow-y-auto '>
      {/* scrollbar-hide */}
      <div className='mx-auto max-w-md md:max-w-lg'>
        {/* Stories */}
        <Stories session={session} />
        {/* Input Box */}
        <InputBox />
        {/* Posts */}
        <Posts serversidePosts={posts} />
      </div>
    </div>
  );
}

export default Feed;
