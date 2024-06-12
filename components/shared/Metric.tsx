
import React from 'react'
import Image from 'next/image';

interface MetricProps {
    imgUrl : string;
    alt : string;
    value : string | number;
    textStyles? : string;
    title : string;
    href? : string;
    isAuthor? : boolean
    answers? : string | number;
};





const Metric = ({ imgUrl, alt, value, title, textStyles, href, isAuthor } : MetricProps ) => {

    const MetricContent = () => (
        <>
          <Image 
          src={imgUrl}
          alt={alt}
          width={16}
          height={16}
          className={`object-contain ${href ? 'rounded-full' : ''}`}
        />

        <p className={`${textStyles} flex items-center gap-1`}>
           { value }
           <span className={`small-regular line-clamp-1 ${isAuthor ? 'max-sm:hidden' : ''}`}>
             { title }
            </span>
        </p>
        </>
    );




  return (
    <div className='flex-center flex-wrap gap-1'>
        <MetricContent />
    </div>  
  )
}

export default Metric;