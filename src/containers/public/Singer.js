import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetArtist } from '../../apis'
import icons from '../../ultis/icons'
import { SongItem, Section, Artist } from '../../components'

const { AiOutlineUserAdd, BsFillPlayFill } = icons

const Singer = () => {
    const { singer } = useParams()
    const [artistData, setArtistData] = useState(null)
    const ref = useRef()
    useEffect(() => {
        const fetchArtistData = async () => {
            const response = await apiGetArtist(singer)
            if (response?.data?.err === 0) {
                setArtistData(response.data.data)
            }
        }
        singer && fetchArtistData()
    }, [singer])

    useEffect(() => {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
    }, [singer])

    return (
        <div className='flex flex-col w-full'>
            <div ref={ref} className='relative'>
                <img src={artistData?.cover} alt='background' className='w-full h-[300px] object-cover opacity-5' />
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-[rgba(0,0,0,0.1)] to-transparent px-[60px]'>
                    <div className='absolute bottom-0 pb-6 flex gap-8'>
                        <div>
                            <img src={artistData?.thumbnail} alt='avatar' className='w-[140px] h-[140px] rounded-full' />
                        </div>
                        <div className=' flex flex-col gap-4'>
                            <div className='flex gap-6 items-center'>
                                <h1 className='text-[60px] font-bold'>{artistData?.name}</h1>
                                <span className='p-2 rounded-full bg-main-500 hover:bg-[#0c6b6b]'><BsFillPlayFill size={32} color='white' className='pl-[3px]' /></span>
                            </div>
                            <div className='flex items-center gap-8'>
                                <span className='text-sm font-semibold'>
                                    {`${Number(artistData?.totalFollow.toFixed(1)).toLocaleString()} người quan tâm`}
                                </span>
                                <button
                                    type='button'
                                    className='bg-main-500 px-4 py-1 text-white text-sm rounded-l-full rounded-r-full flex items-center justify-center gap-1'
                                >
                                    <span><AiOutlineUserAdd /></span>
                                    <span className='text-xs opacity-90'>QUAN TÂM</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full mt-[30px] px-[60px] flex gap-4'>
                {artistData?.topAlbum &&
                    <div className='w-[40%] flex-auto'>
                        <h3 className='mb-5 font-bold text-[20px]'>Bài Hát Nổi Bật</h3>
                        <div className='flex gap-4 p-4 bg-main-300 rounded-md'>
                            <img
                                src={artistData?.topAlbum?.thumbnail}
                                alt='thumbnail'
                                className='w-[151px] h-[151px] object-cover rounded-md'
                            />
                            <div className='flex flex-col text-xs font-semibold gap-3 text-gray-500'>
                                <span>{artistData?.topAlbum?.textType}</span>
                                <div className='flex flex-col gap-1'>
                                    <span className='text-sm font-bold text-black '>
                                        {artistData?.topAlbum?.title?.length > 40 ? `${artistData?.topAlbum?.title?.slice(0, 40)}...` : artistData?.topAlbum?.title}
                                    </span>
                                    <span>{artistData?.topAlbum?.artistsNames}</span>
                                </div>
                                <span>{artistData?.topAlbum?.releaseDate}</span>
                            </div>
                        </div>
                    </div>
                }
                <div className={`${artistData?.topAlbum ? 'w-[60%]' : 'w-full'} flex-auto`}>
                    <h3 className='mb-5 font-bold text-[20px]'>Bài Hát Nổi Bật</h3>
                    <div className='flex flex-wrap w-full'>
                        {artistData?.sections?.find(item => item.sectionType === 'song')?.items?.slice(0, 6)?.map(item => (
                            <div key={item.encodeId} className='w-[90%] min-[1024px]:w-[50%]'>
                                <div className='w-[95%] border-b border-gray-100'>
                                    <SongItem
                                        thumbnail={item.thumbnail}
                                        title={item.title}
                                        artists={item.artistsNames}
                                        sid={item.encodeId}
                                        size='w-[40px] h-[40px]'
                                        duration={item.duration}
                                    />
                                </div>
                            </div>
                        )
                        )}
                    </div>
                </div>
            </div>
            {artistData?.sections?.filter(item => item.sectionType === 'playlist')?.map((item, index) => (
                <Section key={index} data={item} />
            ))}
            <div className='flex flex-col w-full px-[60px] mt-12'>
                <h3 className='text-lg font-bold mb-5'>{artistData?.sections?.find(item => item.sectionType === 'artist')?.title}</h3>
                <div className='flex gap-7'>
                    {artistData?.sections?.find(item => item.sectionType === 'artist')?.items?.slice(0, 5)?.map(item => (
                        <Artist
                            key={item.id}
                            title={item.name}
                            image={item.thumbnailM}
                            follower={item.totalFollow}
                            link={item.link}
                        />
                    ))}
                </div>
            </div>
            <div className='px-[60px] mt-12 flex flex-col gap-1'>
                <h3 className='text-lg font-bold mb-5'>{`Về ${artistData?.name}`}</h3>
                <div className='flex gap-8'>
                    <img
                        src={artistData?.thumbnailM}
                        alt='thumbnail'
                        className='w-[45%] h-[297px] object-cover rounded-md'
                    />
                    <div className='flex flex-col gap-3 text-sm text-gray-500 font-semibold'>
                        <p dangerouslySetInnerHTML={{ __html: artistData?.biography }}></p>
                        <div className='flex flex-col gap-2'>
                            <span className='text-[20px] text-black font-bold'>
                                {Number(artistData?.follow?.toFixed(1)).toLocaleString()}
                            </span>
                            <span>Người quan tâm</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Singer
