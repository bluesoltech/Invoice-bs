import React from 'react'
import Cell from './Cell'
import SubCategory from './SubCategory'

function Category() {
  return (
    <div className=' w-full flex flex-col items-center border-[1px] border-gray-200 rounded p-4'>
        <h1 className='text-xl mb-4'>Category</h1>
        <Cell id="No." title="Particulars" size="Size" sqft="Sqft" qty="Qty" days="Days" details="Details" rate="Rate" amount="Amount" action="Actions"/>
        <SubCategory/>
        <SubCategory/>
        <div className='flex justify-end w-full my-4'>
            <button className='bg-blue-500 border-none text-white p-2 rounded-xl focus:border-none hover:bg-blue-700'>Add Sub Category</button>
        </div>
    </div>
  )
}

export default Category