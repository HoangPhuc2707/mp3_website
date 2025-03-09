import React, { useEffect, useState } from 'react'
import icons from '../ultis/icons'
import { useSelector } from 'react-redux'
import { SongItem } from './'
import { apiGetDetailPlaylist } from '../apis'
import Scrollbars from 'react-custom-scrollbars-2'

const { RiDeleteBinFill } = icons
const SidebarRight = () => {
    const [isRecent, setIsRecent] = useState(false)
    const [playlist, setPlaylist] = useState()
    const { curSongData, curAlbumId, isPlaying, recentSongs, curSongId } = useSelector(state => state.music)

    const fetchDetailPlaylist = async () => {
        const response = await apiGetDetailPlaylist(curAlbumId)
        if (response.data?.err === 0) {
            setPlaylist(response.data.data?.song?.items)
        }
    }

    useEffect(() => {
        curAlbumId && fetchDetailPlaylist()
    }, [])

    useEffect(() => {
        if (curAlbumId && isPlaying) {
            fetchDetailPlaylist()
        }
    }, [curAlbumId, isPlaying])

    useEffect(() => {
        isPlaying && setIsRecent(false)
    }, [isPlaying, curSongId])

    return (
        <div className='flex flex-col text-xs w-full h-full'>
            <div className='h-[70px] w-full flex-none py-[14px] px-2 flex justify-between items-center gap-2 '>
                <div className='flex-auto flex justify-center bg-main-300 rounded-l-full rounded-r-full py-[4px] px-[4px] cursor-pointer'>
                    <span
                        onClick={() => setIsRecent(prev => !prev)}
                        className={`py-[5px] px-[2px] ${!isRecent && 'bg-main-100 text-main-500'} text-gray-500 font-semibold flex-1 flex justify-center items-center rounded-l-full rounded-r-full`}>
                        Danh sách phát
                    </span>
                    <span
                        onClick={() => setIsRecent(prev => !prev)}
                        className={`py-[5px] px-[2px] ${isRecent && 'bg-main-100 text-main-500'} text-gray-500 font-semibold flex-1 flex justify-center items-center rounded-l-full rounded-r-full`}>
                        Nghe gần đây
                    </span>
                </div>
                <span className='p-2 rounded-full cursor-pointer bg-main-100 hover:bg-main-500 hover:text-white'><RiDeleteBinFill size={16} /></span>
            </div>
            {isRecent ?
                <div className='w-full flex-auto flex flex-col px-2'>
                    <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
                        {recentSongs && <div className='flex flex-col'>
                            {recentSongs?.map(item => {
                                return (
                                    <SongItem
                                        key={item?.sid}
                                        thumbnail={item?.thumbnail}
                                        title={item?.title}
                                        artists={item?.artists}
                                        sid={item?.sid}
                                        size='w-[40px] h-[40px]'
                                        style={'hover:!bg-main-300'}
                                    />
                                )
                            })}
                        </div>}
                    </Scrollbars>
                </div>
                : <div className='w-full flex-auto flex flex-col px-2'>
                    <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
                        {curSongData && <SongItem
                            key={curSongData?.encodeId}
                            thumbnail={curSongData?.thumbnail}
                            title={curSongData?.title}
                            artists={curSongData?.artistsNames}
                            sid={curSongData?.encodeId}
                            size='w-[40px] h-[40px]'
                            style='bg-main-500 hover:!bg-[#0c6b6b] text-white'
                        />}
                        <div className='flex flex-col text-black pt-[10px] px-2 pb-[5px]'>
                            <span className='text-sm font-bold'>Tiếp theo</span>
                            <span className='opacity-70 text-xs flex gap-1'>
                                <span>Từ playlist</span>
                                <span className='font-semibold text-main-500'>
                                    {curSongData?.album?.title.length > 20 ? `${curSongData?.album?.title?.slice(0, 20)}...` : curSongData?.album?.title}
                                </span>
                            </span>
                        </div>
                        {playlist && <div className='flex flex-col'>
                            {playlist?.map(item => {
                                return (
                                    <SongItem
                                        key={item?.encodeId}
                                        thumbnail={item?.thumbnail}
                                        title={item?.title}
                                        artists={item?.artistsNames}
                                        sid={item?.encodeId}
                                        size='w-[40px] h-[40px]'
                                        style={'hover:!bg-main-300'}
                                    />
                                )
                            })}
                        </div>}
                    </Scrollbars>
                </div>
            }
            <div className='w-full h-[80px]'></div>
        </div>
    )
}

export default SidebarRight
