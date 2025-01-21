import React from 'react'
import icons from '../ultis/icons'

const { FiSearch } = icons
const Search = () => {
    return (
        <div className='w-full flex items-center'>
            <span className='h-10 pl-4 bg-[#efefef] flex items-center justify-between rounded-l-[20px] text-gray-500'>
                <FiSearch size={24} />
            </span>
            <input
                type='text'
                className='outline-none bg-[#efefef] w-full h-10 px-4 py-2 rounded-r-[20px] text-gray-500 text-[15px]'
                placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
            />
        </div>
    )
}

export default Search
