import React from 'react'
import icons from '../ultis/icons'
import Search from './Search'

const { HiArrowNarrowLeft, HiArrowNarrowRight } = icons
const Header = () => {
    return (
        <div className='w-full flex justify-between items-center'>
            <div className='flex gap-6 w-full items-center'>
                <div className='flex gap-5 text-gray-400'>
                    <span><HiArrowNarrowLeft size={24} /></span>
                    <span><HiArrowNarrowRight size={24} /></span>
                </div>
                <div className='w-[60%]'>
                    <Search />
                </div>
            </div>
            <div>login</div>
        </div>
    )
}

export default Header
