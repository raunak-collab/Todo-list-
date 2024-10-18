import React from 'react'


const navbar = () => {
  return (
  <>
  <nav className='flex bg-indigo-400 text-white justify-between mx-auto p-2'>
    <div className="logo">
        <span className='text-xl font-bold mx-8 cursor-pointer'>iTask</span>
    </div>
    <ul className="flex gap-8 mx-8">
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Your Task</li>

    </ul>
  </nav>
  </>
    
  )
}

export default navbar