import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import * as apis from '../../apis'
import moment from 'moment'
import { Lists, AudioLoading } from '../../components'
import Scrollbars from 'react-custom-scrollbars-2'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import icons from '../../ultis/icons'

const { BsFillPlayFill } = icons
const Album = () => {
    const location = useLocation()
    const { pid } = useParams()
    const { isPlaying } = useSelector(state => state.music)
    const [playlistData, setPlaylistData] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.setCurAlbumId(pid))
        const fetchDetailPlaylist = async () => {
            dispatch(actions.setLoading(true))
            const response = await apis.apiGetDetailPlaylist(pid)
            dispatch(actions.setLoading(false))
            if (response?.data?.err === 0) {
                setPlaylistData(response?.data?.data)
                dispatch(actions.setPlaylist(response?.data?.data?.song?.items))
            }
        }
        fetchDetailPlaylist()
    }, [pid])

    useEffect(() => {
        if (location.state?.playAlbum) {
            const randomSong = Math.round(Math.random() * playlistData?.song?.items?.length) - 1
            dispatch(actions.setCurSongId(playlistData?.song?.items[randomSong]?.encodeId))
            // dispatch(actions.play(true))
        }
    }, [pid, playlistData])

    return (
        <>
            <div className='w-full h-[70px]'></div>
            <div className='flex gap-8 w-full h-[560px] px-[39px]'>
                <div className='flex-none w-1/3 flex flex-col gap-2 items-center'>
                    <div className='w-full relative overflow-hidden'>
                        <img
                            src={playlistData?.thumbnailM}
                            alt='thumbnailM'
                            className={`w-full object-contain ${isPlaying ? 'rounded-full animate-rotate-center' : 'rounded-md animate-rotate-center-pause'} shadow-md`}
                        />
                        <div className={`absolute top-0 left-0 bottom-0 right-0 hover:bg-overlay-30 text-white flex items-center justify-center ${isPlaying && 'rounded-full'}`}>
                            <span className='p-3 border border-white rounded-full'>
                                {isPlaying ? <AudioLoading /> : <BsFillPlayFill size={20} />}
                            </span>
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-1'>
                        <h3 className='text-[20px] font-bold text-gray-800'>{playlistData?.title.length > 30 ? `${playlistData?.title?.slice(0, 25)}...` : playlistData?.title}</h3>
                        <span className='flex gap-2 items-center text-gray-600 text-xs'>
                            <span>Cập nhật:</span>
                            <span>{moment.unix(playlistData?.contentLastUpdate).format("DD/MM/YYYY")}</span>
                        </span>
                        <span className='text-gray-600 text-xs'>{playlistData?.artistsNames}</span>
                        <span className='text-gray-600 text-xs'>{`${Math.round(playlistData?.like / 1000)}K người yêu thích`}</span>

                    </div>
                </div>
                <Scrollbars autoHide style={{ width: '100%', height: '80%' }}>
                    <div className='flex-auto mr-4 '>
                        <span>
                            <span className='text-gray-600 text-sm'>Lời tựa </span>
                            <span className='text-sm'>{playlistData?.sortDescription}</span>
                        </span>
                        <Lists totalDuration={playlistData?.song?.totalDuration} />
                    </div>
                </Scrollbars>
            </div>
        </>
    )
}

export default Album
