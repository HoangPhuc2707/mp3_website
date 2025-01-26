import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import * as apis from '../apis'
import icons from '../ultis/icons'

const { AiFillHeart, AiOutlineHeart, BsThreeDots, MdSkipNext, MdSkipPrevious,
    CiRepeat, CiShuffle, BsFillPlayFill, BsPauseFill } = icons
const Player = () => {
    const audioEl = new Audio('https://a128-z3.zmdcdn.me/f053817b88bac84042114b1c7cafc5c9?authen=exp=1738056014~acl=/f053817b88bac84042114b1c7cafc5c9*~hmac=0138956652baa7ad0b281a38b7d7a024')
    const { curSongId, isPlaying } = useSelector(state => state.music)
    const [songInfo, setSongInfo] = useState(null)
    const [source, setSource] = useState(null)
    // const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        const fetchDetailSong = async () => {
            const [res1, res2] = await Promise.all([
                apis.getDetailSong(curSongId),
                apis.getSong(curSongId)
            ])
            if (res1.data.err === 0) {
                setSongInfo(res1.data.data)
            }
            if (res2.data.err === 0) {
                setSource(res2.data.data['128'])
            }
        }
        fetchDetailSong()
    }, [curSongId])

    useEffect(() => {
        // audioEl.play()
    }, [curSongId])

    const handleTogglePlayMusic = () => {
    }

    return (
        <div className='bg-main-100 px-5 h-full flex border-t border-solid border-[#e8e8e8]'>
            <div className='w-[30%] flex-auto flex gap-3 items-center'>
                <img src={songInfo?.thumbnail} alt='thumbnail' className='w-16 h-16 object-cover rounded-md' />
                <div className='flex flex-col'>
                    <span className='font-semibold text-gray-700 text-sm'>{songInfo?.title}</span>
                    <span className='text-xs text-gray-500'>{songInfo?.artistsNames}</span>
                </div>
                <div className='flex gap-4 pl-2'>
                    <span><AiOutlineHeart size={16} /></span>
                    <span><BsThreeDots size={16} /></span>
                </div>
            </div>
            <div className='w-[40%] flex-auto border border-red-500 flex flex-col gap-2 items-center justify-center py-2'>
                <div className='flex gap-8 justify-center items-center'>
                    <span className='cursor-pointer' title='Bật phát ngẫu nhiên'><CiShuffle size={24} /></span>
                    <span className='cursor-pointer'><MdSkipPrevious size={24} /></span>
                    <span
                        className='p-1 cursor-pointer border border-gray-700 hover:text-main-500 rounded-full'
                        onClick={handleTogglePlayMusic}
                    >
                        {isPlaying ? <BsPauseFill size={30} /> : <BsFillPlayFill size={30} />}
                    </span>
                    <span className='cursor-pointer'><MdSkipNext size={24} /></span>
                    <span className='cursor-pointer' title='Bật phát lại tất cả'><CiRepeat size={24} /></span>
                </div>
                <div>
                    progress bar
                </div>
            </div>
            <div className='w-[30%] flex-auto border border-red-500'>
                volume
            </div>
        </div>
    )
}

export default Player