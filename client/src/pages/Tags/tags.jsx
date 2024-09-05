import React from 'react';
import './tags.css'; 

const Tags = () => {
  return (
    
    <div className="tags">
      
       

        <div className='currentTags Tgs'>
          current Tags
          <div className='circle2'>Super</div>
        </div>

        <div className='RecentTags Tgs'>
          Recently added
          <div className='circle2'>Super</div>
        </div>

        <div className='lostTags Tgs'>
          Lost Tags
          <div className='circle1'>Luxury</div>
          <div className='circle3'>Basic</div>
        </div>

        <div className='rightBar'>
          Possible Tags
          <div className='circle1'>Luxury</div>

          <div className='circle2'>Super</div>

          <div className='circle3'>Basic</div>
        </div>
      
    </div>


    
  );
};

export default Tags;
