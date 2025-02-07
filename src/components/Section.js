import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Section = () => {
    const { chill } = useSelector(state => state.app)
    const navigate = useNavigate()
    return (
        <div className='mt-12 px-[59px] flex flex-col gap-5'>
            <div className='flex justify-between items-center'>
                <h3 className='text-xl font-bold'>{chill?.title}</h3>
                <span className='text-xs font-semibold text-gray-500 cursor-pointer'>TẤT CẢ</span>
            </div>
            <div className='flex items-center justify-between gap-7'>
                {chill && chill?.items?.length > 0 && chill.items.slice(0, 4).map(item => {
                    return (
                        <div
                            key={item.encodeId}
                            onClick={() => {
                                navigate(item?.link?.split('.')[0])
                            }}
                            className='flex flex-col gap-3 flex-auto w-1/5 text-sm cursor-pointer'
                        >
                            <img src={item.thumbnailM} alt='thumbnailM' className='w-full h-auto rounded-lg' />
                            <span className='flex flex-col'>
                                <span className='font-semibold'>{item.title.length > 20 ? `${item.title?.slice(0, 20)}...` : item.title}</span>
                                <span>{item.sortDescription.length > 30 ? `${item.sortDescription?.slice(0, 30)}...` : item.sortDescription}</span>
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default memo(Section)
