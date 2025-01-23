import React from 'react'
import logo from '../assets/images/logo.svg'
import { NavLink } from 'react-router-dom'
import { sidebarMenu } from '../ultis/menu'

const notActiveStyle = 'py-2 px-[25px] font-bold text-[#32323D] text-[13px] flex gap-[12px] items-center'
const activeStyle = 'py-2 px-[25px] font-bold text-[#0F7070] text-[13px] flex gap-[12px] items-center'
const SidebarLeft = () => {
    return (
        <div className='flex h-full flex-col bg-main-200'>
            <div className='w-full h-[70px] py-[25px] pl-[20px] flex justify-start items-center'>
                <img src={logo} alt='logo' className='w-[120px] h-10' />
            </div>
            <div className='flex flex-col'>
                {sidebarMenu.map(item => {
                    return (
                        <NavLink
                            to={item.path}
                            key={item.path}
                            end={item.end}
                            className={({ isActive }) => isActive ? activeStyle : notActiveStyle}
                        >
                            {item.icons}
                            <span>{item.text}</span>
                        </NavLink>
                    )
                })}
            </div>
        </div>
    )
}

export default SidebarLeft
