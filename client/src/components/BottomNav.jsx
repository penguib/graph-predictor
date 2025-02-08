import React from 'react'
import { NavLink } from 'react-router-dom'

function BottomNav() {
    return (
        <div className='fixed z-10 h-16 bottom-0 bg-white w-full grid grid-cols-3 items-center' style={{boxShadow: " 0 -4px 6px rgba(0, 0, 0, 0.1)"}}>
            <NavLink
                to="/feed"
                className='flex flex-col items-center text-center hover:bg-gray-200 transition duration-300 flex-1'
            >
                <img src="/graph_icon.svg" alt="" />
                <span className='text-sm'></span>
            </NavLink>

            <NavLink
                to="/"
                className='flex flex-col items-center text-center hover:bg-gray-200 transition duration-300'
            >
                <img src="/photo_icon.svg" alt="" />
                <span className='text-sm'></span>
            </NavLink>

            <NavLink
                to="/about"
                className='flex flex-col items-center text-center hover:bg-gray-200 transition duration-300 flex-1'
            >
                <img src="/info_icon.svg" alt="" />
                <span className='text-sm'></span>
            </NavLink>
        </div>
    )
}

export default BottomNav
