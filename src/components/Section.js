import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { SectionItem } from './'

const Section = ({ data }) => {
    const navigate = useNavigate()
    return (
        <div className='mt-12 px-[59px] flex flex-col gap-5'>
            <div className='flex justify-between items-center'>
                <h3 className='text-xl font-bold'>{data?.title}</h3>
                <span className='text-xs font-semibold text-gray-500 cursor-pointer'>TẤT CẢ</span>
            </div>
            <div className='flex'>
                {data && data?.items?.length > 0 && data.items.slice(0, 4).map(item => {
                    return (
                        <SectionItem
                            key={item.encodeId}
                            data={data}
                            title={item.title}
                            link={item.link}
                            sortDescription={item.sortDescription}
                            thumbnailM={item.thumbnailM}
                            size='w-[24%]'
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default memo(Section)
