import React from 'react'
import Cell from './Cell'

function SubCategory() {
  return (
    <div className='w-full border-[1px] border-x-[1px] border-b-[2px] border-gray-400'>
        <div className='w-full border-gray-400 p-2'>SubCategory</div>
        <Cell id="No." title="Particulars" size="Size" sqft="Sqft" qty="Qty" days="Days" details="Details" rate="Rate" amount="Amount" action={<button className='bg-red-500 rounded-xl hover:bg-red-700 text-white focus:border-none px-3 py-1'>Delete</button>} />
        <Cell id="No." title="Particulars" size="Size" sqft="Sqft" qty="Qty" days="Days" details="Details" rate="Rate" amount="Amount" action={<button className='bg-red-500 rounded-xl hover:bg-red-700 text-white focus:border-none px-3 py-1'>Delete</button>} />
        <Cell id="No." title="Particulars" size="Size" sqft="Sqft" qty="Qty" days="Days" details="Details" rate="Rate" amount="Amount" action={<button className='bg-red-500 rounded-xl hover:bg-red-700 text-white focus:border-none px-3 py-1'>Delete</button>} />
        <Cell id="No." title="Particulars" size="Size" sqft="Sqft" qty="Qty" days="Days" details="Details" rate="Rate" amount="Amount" action={<button className='bg-red-500 rounded-xl hover:bg-red-700 text-white focus:border-none px-3 py-1'>Delete</button>} />
        <div className='flex justify-end w-full my-4 px-4'><button className='bg-blue-500 border-none text-white p-2 rounded-xl focus:border-none hover:bg-blue-700'>Add Item</button></div>
    </div>
  )
}

export default SubCategory;