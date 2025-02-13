import moment from 'moment'
import React, { memo } from 'react'
import 'moment/locale/vi'
import { useDispatch } from 'react-redux'
import * as actions from '../store/actions'

const SongItem = ({ thumbnail, title, artists, releaseDate, sid, order, percent, style }) => {
    const dispatch = useDispatch()
    return (
        <div
            onClick={() => {
                dispatch(actions.setCurSongId(sid))
                dispatch(actions.play(true))
            }}
            className={`w-full flex justify-between items-center p-[10px] gap-[10px] hover:bg-main-200 rounded-md cursor-pointer ${style || 'text-black hover:bg-main-200'}`}
        >
            <div className='flex gap-4'>
                {order &&
                    <span className={`${order === 1 ? 'text-shadow-no1' : order === 2 ? 'text-shadow-no2' : 'text-shadow-no3'} text-[rgba(77,34,104,0.9)] text-[32px] m-auto`}
                    >
                        {order}
                    </span>
                }
                <img src={thumbnail} alt='thumbnail' className='w-[60px] h-[60px] object-cover rounded-md' />
                <div className='flex flex-col gap-1'>
                    <span className='text-sm font-semibold'>
                        {title?.length > 20 ? `${title?.slice(0, 20)}...` : title}
                    </span>
                    <span className='text-xs opacity-70'>{artists?.length > 30 ? `${artists?.slice(0, 30)}...` : artists}</span>
                    {releaseDate && <span className='text-xs text-gray-700'>{moment(releaseDate * 1000).fromNow()}</span>}
                </div>
            </div>
            {percent && <span className='font-bold'>{`${percent}%`}</span>}
        </div>
    )
}

export default memo(SongItem) 
