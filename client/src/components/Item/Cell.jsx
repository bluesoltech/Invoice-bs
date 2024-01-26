import React from 'react'

function Cell({id, title, size, sqft, qty, days, details, rate, amount, action}) {
  return (
    <div className='w-full grid grid-cols-10'>
        <div className='border-[1px] border-gray-400 w-full h-full p-2'>{id}</div>
        <div className='border-[1px] border-gray-400 w-full h-full p-2'>{title}</div>
        <div className='border-[1px] border-gray-400 w-full h-full p-2'>{size}</div>
        <div className='border-[1px] border-gray-400 w-full h-full p-2'>{sqft}</div>
        <div className='border-[1px] border-gray-400 w-full h-full p-2'>{qty}</div>
        <div className='border-[1px] border-gray-400 w-full h-full p-2'>{days}</div>
        <div className='border-[1px] border-gray-400 w-full h-full p-2'>{details}</div>
        <div className='border-[1px] border-gray-400 w-full h-full p-2'>{rate}</div>
        <div className='border-[1px] border-gray-400 w-full h-full p-2'>{amount}</div>
        <div className='border-[1px] border-gray-400 w-full h-full p-2 flex items-center justify-center'>{action}</div>
    </div>
  )
}

export default Cell