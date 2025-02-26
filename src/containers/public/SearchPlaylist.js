import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { apiGetArtist } from '../../apis'
import { SectionItem } from '../../components'

const SearchPlaylist = () => {
    const { searchData } = useSelector(state => state.music)
    const [playlists, setPlaylists] = useState([])
    useEffect(() => {
        const fetchPlaylistData = async () => {
            const response = await apiGetArtist(searchData?.top?.alias)
            if (response?.data?.err === 0) {
                setPlaylists(response.data.data.sections[1])
            }
        }
        fetchPlaylistData()
    }, [])
    return (
        <div className='w-full flex flex-col gap-8 px-[44px]'>
            <h3 className='font-bold text-lg'>Playlist/Album</h3>
            <div className='flex flex-wrap gap-4 items-start justify-start'>
                {playlists && playlists?.items?.length > 0 && playlists.items?.map(item => {
                    return (
                        <SectionItem
                            key={item.encodeId}
                            title={item.title}
                            link={item.link}
                            sortDescription={item.sortDescription}
                            thumbnailM={item.thumbnailM}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default SearchPlaylist
