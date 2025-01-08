import React from 'react';
import Button from './Button';

const list = ["All", "Music", "Podcasts", "Mixes", "Satire", "Skills", "Satsang", "Live", "Sales", "Thoughts", "Information", "Watched", "Newest"];

const ButtonList = () => {
  return (
    <div className='flex'>
      {list.map((item) => (
        <Button key={item} name={item} />
      ))}
    </div>
  );
};

export default ButtonList;