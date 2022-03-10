import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { EmojiHappyIcon } from '@heroicons/react/outline';
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid';
import { db, storage } from '../firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
} from 'firebase/firestore';

function InputBox() {
  const { data: session } = useSession();

  const inputRef = useRef(null);
  const filepickerRef = useRef();
  const [imageToPost, setImageToPost] = useState(null);

  const sendPost = async (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;
    try {
      const docRef = await addDoc(collection(db, 'posts'), {
        message: inputRef.current.value,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        timestamp: serverTimestamp(),
      });
      // console.log('Document written with ID: ', docRef.id);
      if (imageToPost) {
        const storageRef = ref(storage, `posts/${docRef.id}`);
        var uploadTask = uploadString(storageRef, imageToPost, 'data_url').then(
          (snapshot) => {
            // console.log("upload completed", snapshot)
            getDownloadURL(snapshot.ref).then(async (downloadURL) => {
              await setDoc(
                doc(db, 'posts', docRef.id),
                { postImage: downloadURL },
                { merge: true }
              );
            });
            removeImage();
          }
        );
      }
    } catch (err) {
      console.error('Error adding document: ', err);
    }
    //clearing input
    inputRef.current.value = '';
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (readerEvent) => {
        setImageToPost(readerEvent.target.result);
      };
    }
  };

  const removeImage = () => {
    setImageToPost(null);
  };

  return (
    <div className='bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6'>
      {/* top half */}
      <div className='flex space-x-4 p-4 items-center'>
        <Image
          className=' rounded-full'
          src={session?.user?.image}
          width={40}
          height={40}
          layout='fixed'
          objectFit='cover'
        />
        <form onSubmit={sendPost} className='flex flex-1'>
          <input
            ref={inputRef}
            className=' rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none'
            type='text'
            placeholder={`What's on your mind, ${session?.user?.name}?`}
          />
          <button hidden type='submit'>
            Submit
          </button>
          {imageToPost && (
            <div
              onClick={removeImage}
              className='flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer'
            >
              <img src={imageToPost} alt='' className='h-10 object-contain' />
              <p className='text-xs text-red-500 text-center'>Remove</p>
            </div>
          )}
        </form>
      </div>
      <div className='flex justify-evenly p-3 border-t'>
        <div className='inputIcon'>
          <VideoCameraIcon className='h-7 text-red-500' />
          <p className='text-xs sm:text-sm xl:text-base'>Live Video</p>
        </div>
        <div
          onClick={() => {
            filepickerRef.current.click();
          }}
          className='inputIcon'
        >
          <CameraIcon className='h-7 text-green-400' />
          <p className='text-xs sm:text-sm xl:text-base'>Photo/Video</p>
          <input
            ref={filepickerRef}
            type='file'
            hidden
            onChange={addImageToPost}
          />
        </div>
        <div className='inputIcon'>
          <EmojiHappyIcon className='h-7 text-yellow-300' />
          <p className='text-xs sm:text-sm xl:text-base'>Feeling Activity</p>
        </div>
      </div>
    </div>
  );
}

export default InputBox;
