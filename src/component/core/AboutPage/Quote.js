import React from 'react';
import HighlightText from '../HomePage/HighlightText';
import HighlightText2 from '../HomePage/HighlightText2';
import HighlightText3 from '../HomePage/HighlightText3';

function Quote() {
  return (
    <div className='text-2xl md:text-4xl w-[95%] pt-[60px] text-center font-semibold'>
      We are passionate about revolutionizing the way we learn. Our innovative platform {" "}
      <HighlightText text="combines technology" />, {" "}
      <HighlightText2 text="expertise" /> and community to create an {" "}
      <HighlightText3 text="unparalleled educational experience." />
    </div>
  );
}
export default Quote;

