import React from 'react'
import { useSelector } from 'react-redux'
import { handleNumber } from '../../ultis/fn'
import { SongItem, List, SectionItem, Artist } from '../../components'

const SearchAll = () => {
    const { searchData } = useSelector(state => state.music)
    console.log(searchData)
    return (
        <div className='w-full flex flex-col px-[60px] gap-8'>
            <div className='flex flex-col'>
                <h3 className='text-lg font-bold mb-5'>Nổi bật</h3>
                <div className='flex gap-8'>
                    {searchData?.top &&
                        <div className='p-[10px] flex-1 bg-main-200 rounded-md flex gap-8 items-center cursor-pointer'>
                            <img
                                src={searchData.top.thumbnail}
                                alt='avatar'
                                className={`w-[74px] h-[74px] object-cover ${searchData.top.objectType === 'artist' && 'rounded-full'}`} />
                            <div className='flex flex-col text-sm'>
                                <span className='mb-[4px]'>{searchData.top.objectType === 'artist' ? 'Nghệ sĩ' : searchData.top.objectType === 'song' ? 'Bài hát' : ''}</span>
                                <span className='text-[16px] font-semibold'>{searchData.top.title || searchData.top.name}</span>
                                {searchData.top.objectType === 'artist' &&
                                    <span>
                                        {`${handleNumber(searchData?.artists[0]?.totalFollow)} quan tâm`}
                                    </span>
                                }
                                {searchData.top.objectType === 'song' &&
                                    <span>
                                        {searchData.top.artistsNames}
                                    </span>}
                            </div>
                        </div>}
                    {searchData?.songs?.filter((item, index) => [...Array(2).keys()].some(i => i === index))?.map(item => (
                        <div key={item.encodeId} className='flex-1'>
                            <SongItem
                                thumbnail={item.thumbnail}
                                title={item.title}
                                artists={item.artistsNames}
                                sid={item.encodeId}
                                size='w-[74px] h-[74px]'
                                style='bg-main-200'
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex flex-col w-full'>
                <h3 className='text-lg font-bold mb-5'>Bài hát</h3>
                <div className='flex flex-wrap w-full'>
                    {searchData?.songs?.slice(0, 8)?.map((item, index) => (
                        <div key={item.encodeId} className={`flex-auto w-[45%] ${index % 2 !== 0 ? 'pl-4' : 'pr-4'}`} >
                            <List songData={item} isHideAlbum />
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex flex-col w-full'>
                <h3 className='text-lg font-bold mb-5'>Playlist/Album</h3>
                <div className='flex items-start justify-between gap-7'>
                    {searchData?.playlists?.slice(0, 4)?.map(item => (
                        <SectionItem
                            key={item.encodeId}
                            title={item.title}
                            link={item.link}
                            sortDescription={item.sortDescription}
                            thumbnailM={item.thumbnailM}
                        />
                    ))}
                </div>
            </div>
            <div className='flex flex-col w-full'>
                <h3 className='text-lg font-bold mb-5'>Nghệ sĩ</h3>
                <div className='flex gap-7'>
                    {searchData?.artists?.slice(0, 5)?.map(item => (
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
        </div>
    )
}

export default SearchAll
