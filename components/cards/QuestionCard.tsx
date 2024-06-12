

import React from 'react'
import Link from 'next/link';
import RenderTag from '../shared/RenderTag';
import Metric from '../shared/Metric';
import { formatNumber, timeAgo } from '@/lib/utils';


interface QuestionCardProps {
_id : number | string
title : string;
author : {
  _id : string,
  name : string,
  picture : string
};
answers : Array<object> | string | number;
upVotes : number | string;
views : number;
createdAt : Date | string
tags : {
  _id : string,
  name : string
}[]
};

const QuestionCard = ({ _id, title, author, answers, upVotes, views, createdAt, tags} : QuestionCardProps)=> {
  return (
    <div className='card-wrapper rounded-[10px] p-9 sm:px-11'>
      <div className='flex flex-col-reverse items-start justify-between gap-5 sm:flex-grow'>
        <div>
          <span className='subtitle-regular text-dark400_light700 line-clamp-1 flex sm:hidden'>
            { timeAgo(createdAt) }
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className='sm:h3-semibold base_semibold text-dark200_light900 line-clamp-1 flex-1'>
              { title }
            </h3>
          </Link>
        </div>

        {/* if signed in show edit/delete action*/}
      </div>

      <div className='mt-3.5 flex flex-wrap gap-2'>
        {tags?.map((tag) => (
          <RenderTag 
            key={tag?._id}
            _id={tag?._id}
            name={tag?.name}
          />
        ))}
      </div>

      <div className='flex-between mt-6 w-full flex-wrap gap-3'>
        <Metric 
          imgUrl='/assets/icons/avatar.svg'
          alt='user'
          value={author?.name}
          title={`- asked ${timeAgo(createdAt)}`}
          textStyles='body-medium text-dark400_light700'
          isAuthor
          href={`/profile/${author?._id}`}
        />

        <Metric 
          imgUrl='/assets/icons/like.svg'
          alt='Upvotes'
          value={upVotes}
          title='Votes'
          textStyles='small-medium text-dark400_light800'
        />

        <Metric 
          imgUrl='/assets/icons/message.svg'
          alt='message'
          value={4}
          title='Answers'
          textStyles='small-medium text-dark400_light800'
        />

        <Metric 
          imgUrl='/assets/icons/eye.svg'
          alt='eye'
          value={formatNumber(views)}
          title='Views'
          textStyles='small-medium text-dark400_light800'
        />
      </div>
    </div>
  )
}

export default QuestionCard;