import React, { useState } from 'react'
import icons from '../ultis/icons'
import * as actions from '../store/actions'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import path from '../ultis/path'

const { FiSearch, GrClose } = icons
const Search = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [keyword, setKeyword] = useState('')

    const handleSearch = async (e) => {
        if (e.keyCode === 13) {
            dispatch(actions.search(keyword))
            navigate({
                pathname: `/${path.SEARCH}/${path.ALL}`,
                search: createSearchParams({
                    q: keyword
                }).toString()
            })
        }
    }

    return (
        <div className='w-full relative flex items-center'>
            {keyword &&
                <span
                    onClick={() => setKeyword('')}
                    className='absolute right-[16px] cursor-pointer'
                >
                    <GrClose className='text-gray-400' />
                </span>}
            <span className='h-10 pl-4 bg-[#efefef] flex items-center justify-between rounded-l-[20px] text-gray-500'>
                <FiSearch size={24} />
            </span>
            <input
                type='text'
                className='outline-none bg-[#efefef] w-full h-10 px-4 py-2 rounded-r-[20px] text-gray-500 text-[15px]'
                placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                onKeyUp={handleSearch}
            />
        </div>
    )
}

export default Search
