'use client'
import React from 'react'
import { HomePageFilters } from '@/constants/filters';
import { Button } from '../ui/button';

const HomeFilters = () => {
    const active = 'frequent';
  return (
    <div className='mt-10 hidden flex-wrap gap-3 md:flex'>
        {HomePageFilters.map((item) => (
            <Button
              key={item.value}
              onClick={() => {}}
              className={`body-medium rounded-lg px-6 py-2 capitalize shadow-none ${ active === item.value 
              ?'bg-primary-100 text-primary-500'
              :'dark:text-light-500 bg-light-800 text-light-500  dark:bg-dark-300'
              }`}
            >
               { item.name }
            </Button>
        ))}
    </div>
  )
}

export default HomeFilters;