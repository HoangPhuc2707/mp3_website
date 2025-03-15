import React from 'react'
import icons from '../ultis/icons'
import Search from './Search'
import { useNavigate, useParams } from 'react-router-dom'
import avatar from '../assets/images/avata.jpg'

const { HiArrowNarrowLeft, HiArrowNarrowRight } = icons
const Header = () => {
    const navigate = useNavigate()
    const { singer } = useParams()
    return (
        <div className='w-full flex justify-between items-center'>
            <div className='flex gap-6 w-full items-center'>
                <div className='flex gap-5 text-gray-400 cursor-pointer'>
                    <span onClick={() => navigate(-1)}><HiArrowNarrowLeft size={24} color={singer ? 'gray' : 'black'} /></span>
                    <span onClick={() => navigate(+1)}><HiArrowNarrowRight size={24} color={singer ? 'gray' : 'black'} /></span>
                </div>
                <div className='w-[60%]'>
                    <Search />
                </div>
            </div>
            <div className='w-[45px]'>
                <img src={avatar} alt='avatar' className='w-[40px] h-[40px] object-cover rounded-full' />
            </div>
        </div>
    )
}

export default Header
