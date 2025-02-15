import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as apis from '../apis'
import icons from '../ultis/icons'
import * as actions from '../store/actions'
import moment from 'moment'
import { toast } from 'react-toastify'
import { LoadingSong } from './'

const { AiFillHeart, AiOutlineHeart, BsThreeDots, MdSkipNext, MdSkipPrevious,
    CiRepeat, CiShuffle, BsFillPlayFill, BsPauseFill, TbRepeatOnce, BsMusicNoteList,
    SlVolume1, SlVolume2, SlVolumeOff } = icons
var intervalId
const Player = ({ setIsShowRightSidebar }) => {
    const { curSongId, isPlaying, songs } = useSelector(state => state.music)
    const [songInfo, setSongInfo] = useState(null)
    const [audio, setAudio] = useState(new Audio())
    const [curSeconds, setCurSeconds] = useState(0)
    const [isShuffe, setIsShuffe] = useState(false)
    const [repeatMode, setRepeatMode] = useState(0)
    const [isLoadingSource, setIsLoadingSource] = useState(false)
    const [volume, setVolume] = useState(100)
    const dispatch = useDispatch()
    const thumbRef = useRef()
    const trackRef = useRef()

    useEffect(() => {
        const fetchDetailSong = async () => {
            setIsLoadingSource(false)
            const [res1, res2] = await Promise.all([
                apis.apiGetDetailSong(curSongId),
                apis.apiGetSong(curSongId)
            ])
            setIsLoadingSource(true)
            if (res1.data.err === 0) {
                setSongInfo(res1.data.data)
                dispatch(actions.setCurSongData(res1.data.data))
            }
            if (res2.data.err === 0) {
                audio.pause()
                setAudio(new Audio(res2.data.data['128']))
            } else {
                audio.pause()
                setAudio(new Audio())
                dispatch(actions.play(false))
                toast.warn(res2.data.msg)
                setCurSeconds(0)
                thumbRef.current.style.cssText = `right: 100%`
            }
        }
        fetchDetailSong()
    }, [curSongId])

    useEffect(() => {
        intervalId && clearInterval(intervalId)
        audio.pause()
        audio.load()
        if (isPlaying && thumbRef.current) {
            audio.play()
            intervalId = setInterval(() => {
                let percent = Math.round(audio.currentTime * 10000 / songInfo.duration) / 100
                thumbRef.current.style.cssText = `right: ${100 - percent}%`
                setCurSeconds(Math.round(audio.currentTime))
            }, 200)
        }
    }, [audio])

    useEffect(() => {
        const handleEnded = () => {
            if (isShuffe) {
                handleShuffle()
            } else if (repeatMode) {
                repeatMode === 1 ? handleRepeat() : handleNextSong()
            } else {
                audio.pause()
                dispatch(actions.play(false))
            }
        }
        audio.addEventListener('ended', handleEnded)

        return () => {
            audio.removeEventListener('ended', handleEnded)
        }
    }, [audio, isShuffe, repeatMode])

    useEffect(() => {
        audio.volume = volume / 100
    }, [volume])

    const handleTogglePlayMusic = () => {
        if (isPlaying) {
            audio.pause()
            dispatch(actions.play(false))
        } else {
            audio.play()
            dispatch(actions.play(true))
        }
    }

    const handleClickProgressbar = (e) => {
        const trackRect = trackRef.current.getBoundingClientRect()
        const percent = Math.round((e.clientX - trackRect.left) * 10000 / trackRect.width) / 100
        thumbRef.current.style.cssText = `right: ${100 - percent}%`
        audio.currentTime = percent * songInfo.duration / 100
        setCurSeconds(Math.round(percent * songInfo.duration / 100))
    }

    const handleNextSong = () => {
        if (songs) {
            let currentSongIndex
            songs?.forEach((item, index) => {
                if (item.encodeId === curSongId) currentSongIndex = index
            })
            dispatch(actions.setCurSongId(songs[currentSongIndex + 1].encodeId))
            dispatch(actions.play(true))
        }
    }

    const handlePrevSong = () => {
        if (songs) {
            let currentSongIndex
            songs?.forEach((item, index) => {
                if (item.encodeId === curSongId) currentSongIndex = index
            })
            dispatch(actions.setCurSongId(songs[currentSongIndex - 1].encodeId))
            dispatch(actions.play(true))
        }
    }

    const handleRepeat = () => {
        audio.play()
    }

    const handleShuffle = () => {
        const randomIndex = Math.round(Math.random() * songs.length) - 1
        dispatch(actions.setCurSongId(songs[randomIndex].encodeId))
        dispatch(actions.play(true))
    }

    return (
        <div className='bg-main-100 px-5 h-full flex border-t border-solid border-[#e8e8e8]'>
            <div className='w-[30%] flex-auto flex gap-3 items-center'>
                <img src={songInfo?.thumbnail} alt='thumbnail' className='w-14 h-14 object-cover rounded-md' />
                <div className='flex flex-col'>
                    <span className='font-semibold text-gray-700 text-sm'>{songInfo?.title}</span>
                    <span className='text-xs text-gray-500'>{songInfo?.artistsNames}</span>
                </div>
                <div className='flex gap-4 pl-2'>
                    <span><AiOutlineHeart size={16} /></span>
                    <span><BsThreeDots size={16} /></span>
                </div>
            </div>
            <div className='w-[40%] flex-auto flex flex-col gap-2 items-center justify-center py-2'>
                <div className='flex gap-6 justify-center items-center'>
                    <span
                        className={`cursor-pointer ${isShuffe && 'text-purple-600'}`}
                        title='Bật phát ngẫu nhiên'
                        onClick={() => setIsShuffe(prev => !prev)}
                    >
                        <CiShuffle size={20} />
                    </span>
                    <span onClick={handlePrevSong} className={`${!songs ? 'text-gray-500' : 'cursor-pointer'}`}><MdSkipPrevious size={23} /></span>
                    <span
                        className='p-1 cursor-pointer border border-gray-700 hover:text-purple-600 rounded-full'
                        onClick={handleTogglePlayMusic}
                    >
                        {!isLoadingSource ? <LoadingSong /> : isPlaying ? <BsPauseFill size={24} /> : <BsFillPlayFill size={24} />}
                    </span>
                    <span onClick={handleNextSong} className={`${!songs ? 'text-gray-500' : 'cursor-pointer'}`}><MdSkipNext size={23} /></span>
                    <span
                        className={`cursor-pointer ${repeatMode && 'text-purple-600'}`}

                        onClick={() => setRepeatMode(prev => prev === 2 ? 0 : prev + 1)}
                    >
                        {repeatMode === 1 ? <TbRepeatOnce size={20} title='Bật phát lại một bài' /> : <CiRepeat size={20} title='Bật phát lại tất cả' />}
                    </span>
                </div>
                <div className='w-full flex items-center justify-center gap-3 text-xs'>
                    <span>{moment.utc(curSeconds * 1000).format('mm:ss')}</span>
                    <div
                        className='w-3/5 h-[3px] hover:h-[8px] rounded-l-full rounded-r-full cursor-pointer relative bg-[rgba(0,0,0,0.1)]'
                        onClick={handleClickProgressbar}
                        ref={trackRef}
                    >
                        <div ref={thumbRef} className='absolute top-0 left-0 bottom-0 rounded-l-full rounded-r-full bg-[#0e8080]'></div>
                    </div>
                    <span>{moment.utc(songInfo?.duration * 1000).format('mm:ss')}</span>
                </div>
            </div>
            <div className='w-[30%] flex-auto flex items-center justify-end gap-8'>
                <div className='flex items-center gap-2'>
                    <span className='cursor-pointer' onClick={() => setVolume(prev => +prev === 0 ? 70 : 0)}>
                        {+volume >= 50 ? <SlVolume2 /> : +volume === 0 ? <SlVolumeOff /> : <SlVolume1 />}
                    </span>
                    <input
                        type='range'
                        className='w-[100px] h-[3px] cursor-pointer'
                        step={1}
                        min={0}
                        max={100}
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                    />
                </div>
                <span
                    className='p-1 rounded-sm cursor-pointer text-white bg-purple-700 opacity-90 hover:opacity-100 '
                    onClick={() => setIsShowRightSidebar(prev => !prev)}
                >
                    <BsMusicNoteList size={15} />
                </span>
            </div>
        </div>
    )
}

export default Player