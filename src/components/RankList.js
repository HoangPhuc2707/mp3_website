import React, { memo, useEffect, useState } from 'react'
import { List } from './'
import { useNavigate } from 'react-router-dom'

const RankList = ({ data, isHideAlbum, number, link, isHideShowFull }) => {
    const [isShowFull, setIsShowFull] = useState(false)
    const [songs, setSongs] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        if (!isShowFull) {
            setSongs(data?.filter((i, index) => index < number))
        } else {
            setSongs(data)
        }
    }, [isShowFull, data])

    return (
        <div className='w-full'>
            {songs?.map((item, index) => (
                <List
                    songData={item}
                    key={item.encodeId}
                    isHideNode
                    isHideAlbum={isHideAlbum}
                    order={index + 1}
                />
            ))}
            {!isHideShowFull && <div className='w-full flex justify-center items-center'>
                <button
                    type='button'
                    className='px-6 my-4 py-2 border border-[#0E8080] rounded-l-full rounded-r-full text-main-500 text-sm 
                    hover:text-white hover:bg-main-500'
                    onClick={() => link ? navigate(link.split('.')[0]) : setIsShowFull(prev => !prev)}
                >
                    {isShowFull ? 'Ẩn bớt' : 'Xem tất cả'}
                </button>
            </div>}
        </div>
    )
}

export default memo(RankList)
