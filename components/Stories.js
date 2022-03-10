import React from 'react';
import StoryCard from './StoryCard';

function Stories({ session }) {
  const stories = [
    {
      name: session?.user?.name,
      src: session?.user?.image,
      profile: session?.user?.image,
    },
    {
      name: 'Elon Musk',
      src: 'https://links.papareact.com/4zn',
      profile:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/220px-Elon_Musk_Royal_Society_%28crop2%29.jpg',
    },
    {
      name: 'Mark Zuckerberg',
      src: 'https://links.papareact.com/xql',
      profile: 'https://links.papareact.com/snf',
    },
    {
      name: 'Bill Gates',
      src: 'https://links.papareact.com/4u4',
      profile: 'https://links.papareact.com/zvy',
    },
    {
      name: 'Gordon Ramsey',
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Chef_Gordon_Ramsay.jpg/800px-Chef_Gordon_Ramsay.jpg',
      profile:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Gordon_Ramsay_colour_Allan_Warren.jpg/240px-Gordon_Ramsay_colour_Allan_Warren.jpg',
    },
  ];
  return (
    <div className='flex justify-center space-x-3 mx-auto'>
      {stories.map((story) => {
        return (
          <StoryCard
            key={story.src}
            name={story.name}
            src={story.src}
            profile={story.profile}
          />
        );
      })}
    </div>
  );
}

export default Stories;
