import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import * as apis from '../apis'


const Player = () => {
    const { curSongId } = useSelector(state => state.music)

    useEffect(() => {
        const fetchDetailSong = async () => {
            const response = await apis.getDetailSong(curSongId)
            console.log('abc', response)
        }
        fetchDetailSong()
    }, [curSongId])

    return (
        <div className='bg-main-100 px-5 h-full flex border-t border-solid border-[#e8e8e8]'>
            <div className='w-[30%] flex-auto border border-red-500'>
                detail
            </div>
            <div className='w-[40%] flex-auto border border-red-500'>
                maine
            </div>
            <div className='w-[30%] flex-auto border border-red-500'>
                volume
            </div>
        </div>
    )
}

export default Player