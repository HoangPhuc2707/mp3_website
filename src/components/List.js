import React, { memo } from 'react'
import icons from '../ultis/icons'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import * as actions from '../store/actions'

const { BsMusicNoteBeamed } = icons
const List = ({ songData, isHideAlbum, isHideNode, order }) => {
    const dispatch = useDispatch()

    return (
        <div
            className='flex justify-between items-center p-[10px] border-t border-[rgba(0,0,0,0.05)] hover:bg-[#efefef] cursor-pointer'
            onClick={() => {
                dispatch(actions.setCurSongId(songData?.encodeId))
                dispatch(actions.play(true))
                dispatch(actions.playAlbum(true))
                dispatch(actions.setRecent({ thumbnail: songData?.thumbnail, title: songData?.title, sid: songData?.encodeId, artists: songData?.artistsNames }))
            }}
        >
            <div className='flex items-center gap-3 flex-auto'>
                {order &&
                    <span
                        className={`${order === 1 ? 'text-shadow-no1'
                            : order === 2 ? 'text-shadow-no2'
                                : order === 3 ? 'text-shadow-no3'
                                    : 'text-shadow-rest'} 
                        text-main-200 text-[32px] flex items-center justify-center flex-none w-[10%]`}
                    >
                        {order}
                    </span>
                }
                {!isHideNode && <span><BsMusicNoteBeamed /></span>}
                <img src={songData?.thumbnail} alt='thumbnail' className='w-10 h-10 object-cover rounded-md' />
                <span className='flex flex-col w-full'>
                    <span className='text-sm font-semibold'>
                        {songData?.title?.length > 25 ? `${songData?.title?.slice(0, 25)}...` : songData?.title}
                    </span>
                    <span className='text-xs opacity-70'>{songData?.artistsNames}</span>
                </span>
            </div>
            {!isHideAlbum && <div className='w-[40%] flex justify-center items-center text-gray-500 text-xs'>
                {songData?.album?.title?.length > 20 ? `${songData?.album?.title?.slice(0, 20)}...` : songData?.album?.title}
            </div>}
            <div className='w-[10%] flex justify-center items-center text-gray-500 text-xs '>
                {moment.utc(songData?.duration * 1000).format('mm:ss')}
            </div>
        </div>
    )
}

export default memo(List)
