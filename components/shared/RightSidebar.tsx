
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import RenderTag from './RenderTag';




const RightSidebar = () => {

    const hotQuestions = [
        {_id : 1, title : 'How do i use express as a custom server in nextJS?'},
        {_id : 2, title : 'Cascading deletes in SQLAlchemy'},
        {_id : 3, title : 'How do i center a div?'},
        {_id : 4, title : 'best practice for data fetchin gin NextJS'},
        {_id : 5, title : 'Redux toolkit not Updating state as'},
    ];

    const popularTags = [
        { _id : 1, name : 'javascript', totalQuestion : 5 },
        { _id : 2, name : 'typeScript', totalQuestion : 10 },
        { _id : 3, name : 'React', totalQuestion : 3 },
        { _id : 4, name : 'Angular', totalQuestion : 1 },
        { _id : 5, name : 'Nextjs', totalQuestion : 9 },
    ];




  return (
    <section className='background-light900_dark200 light-border sticky left-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden lg:w-[266px] custom-scrollbar'>

        <div>
            <h3 className='h3-bold text-dark200_light900'>
                Top Questions
            </h3>
            <div className='mt-7 flex w-full flex-col gap-[30px]'>
                { hotQuestions.map((question) => (
                    <Link
                      key={question._id}
                      href={`/questions/${question._id}`}
                      className='flex cursor-pointer items-center justify-between gap-7'
                    >
                      <p className='body-medium text-dark500_light700'>
                        { question.title }
                      </p>

                       <Image 
                         src='/assets/icons/chevron-right.svg'
                         alt='chevron-right'
                         width={20}
                         height={20}
                         className='invert-colors'
                        />

                    </Link>
                ))}
            </div>
        </div>
        <div className='mt-16'>
           <h3 className='h3-bold text-dark200_light900'>
             Popular Tags
           </h3>
           <div className='mt-7 flex flex-col gap-4'>
            { popularTags.map((tag) => (
                <RenderTag 
                  key={tag._id}
                  _id={tag._id}
                  name={tag.name}
                  totalQuestion={tag.totalQuestion}
                  showCount
                />
            ))}
           </div>

        </div>

    </section>
  )
}

export default RightSidebar;