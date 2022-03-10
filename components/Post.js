import Image from 'next/image';
import React from 'react';
import { ChatAltIcon, ShareIcon, ThumbUpIcon } from '@heroicons/react/outline';

function Post({ name, email, message, image, postImage, timestamp }) {
  return (
    <div className='flex flex-col'>
      <div className=' p-5 bg-white mt-5 rounded-t-2xl shadow-sm'>
        {/* top section */}
        <div className='flex items-center space-x-2'>
          <img
            src={image}
            width={40}
            height={40}
            alt=''
            className=' rounded-full'
          />
          <div>
            <p className='font-medium'>{name}</p>
            <p className='text-xs text-gray-400'>{timestamp}</p>
          </div>
        </div>
        {/* message */}
        <p className='pt-4'>{message}</p>
        {/* image */}
        {postImage && (
          <div className='relative h-56 md:h-96 bg-white'>
            {/* very important! - parent has to be relative (for the layout fill)  */}
            <Image src={postImage} objectFit='contain' layout='fill' />
          </div>
        )}
        {/* bottom section of the post */}
        <div className='flex justify-between items-center rounded-b-2xl bg-white shadow-md text-gray-400 border-t'>
          <div className='inputIcon rounded-none rounded-bl-2xl'>
            <ThumbUpIcon className='h-4' />
            <p className='text-xs sm:text-base'>Like</p>
          </div>
          <div className='inputIcon rounded-none rounded-bl-2xl'>
            <ChatAltIcon className='h-4' />
            <p className='text-xs sm:text-base'>Comment</p>
          </div>
          <div className='inputIcon rounded-none rounded-bl-2xl'>
            <ShareIcon className='h-4' />
            <p className='text-xs sm:text-base'>Share</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
