import React, { memo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import icons from '../ultis/icons'
import { playAlbum } from '../store/actions'

const { AiOutlineHeart, BsFillPlayFill, BsThreeDots } = icons

const SectionItem = ({ data, link, title, thumbnailM, artistsNames, sortDescription }) => {
    const navigate = useNavigate()
    const [isHover, setIsHover] = useState(false)
    const imageRef = useRef()
    const handleHover = () => {
        setIsHover(true)
        imageRef.current.classList?.remove('animate-scale-down-image')
        imageRef.current.classList?.add('animate-scale-up-image')
    }
    const handleLeave = () => {
        setIsHover(false)
        imageRef.current.classList?.remove('animate-scale-up-image')
        imageRef.current.classList?.add('animate-scale-down-image')
    }

    return (
        <div
            onClick={() => {
                navigate(link?.split('.')[0], { state: { playAlbum: false } })
            }}
            className='flex flex-col gap-3 flex-auto w-1/5 text-sm cursor-pointer'
        >
            <div
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
                className='w-full relative overflow-hidden rounded-lg'>
                {isHover &&
                    <div className='absolute top-0 bottom-0 left-0 right-0 z-40 bg-overlay-30 rounded-lg text-white flex items-center justify-center gap-2'>
                        <span><AiOutlineHeart size={25} /></span>
                        <span
                            onClick={(e) => {
                                e.stopPropagation()
                                navigate(link?.split('.')[0], { state: { playAlbum: true } })
                            }}
                            className='p-1 border border-white rounded-full'><BsFillPlayFill size={35} /></span>
                        <span><BsThreeDots size={25} /></span>
                    </div>}
                <img ref={imageRef} src={thumbnailM} alt='thumbnailM' className='w-full h-auto rounded-lg' />
            </div>

            <span className='flex flex-col'>
                <span className='font-semibold'>{title.length > 30 ? `${title?.slice(0, 30)}...` : title}</span>
                {data?.sectionId === 'h100' || data?.sectionId === 'hAlbum' ?
                    <span>{artistsNames}</span>
                    :
                    <span>{sortDescription.length > 40 ? `${sortDescription?.slice(0, 40)}...` : sortDescription}</span>
                }
            </span>
        </div>
    )
}

export default memo(SectionItem) 
