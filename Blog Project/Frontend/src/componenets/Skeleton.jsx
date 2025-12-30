import React from 'react'

const Skeleton = () => {
  return (
    <div className='animate-pulse flex flex-col gap-3'>
      {/* img */}
      <div className='h-64 w-full bg-gray-200 rounded-full'></div>
      {/* Title */}
      <div className='h-6 bg-gray-200 rounded w-3/4'></div>
      {/* Author detail */}
      <div className='flex gap-2 items-center mt-2'>
        <div className='w-8 h-8 rounded-full bg-gray-200'></div>
        <div className='h-4 bg-gray-200 rounded w-1/2'></div>
      </div>
    </div>
  )
}

export default Skeleton
