import React, { useEffect, useRef } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import bgWeekChart from '../../assets/images/bg-week-chart.jpg'
import icons from '../../ultis/icons'
import { RankList } from '../../components'

const { BsFillPlayFill } = icons
const notActiveStyle = 'py-[12px] text-[20px] text-black font-semibold'
const activedStyle = 'py-[12px] text-[20px] text-main-500 font-semibold border-b-2 border-[#0E8080]'

const WeekRank = ({ weekChart }) => {
    const { pid } = useParams()
    const ref = useRef()
    useEffect(() => {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
    }, [pid])
    return (
        <div>
            <div
                ref={ref}
                className='relative'>
                <img src={bgWeekChart} alt='bgChart' className='w-full h-[500px] object-cover grayscale' />
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-[rgba(255,255,255,0.8)]'></div>
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-[#ffffff] to-transparent'></div>
                <div className='absolute top-0 left-0 right-0 bottom-1/2 flex flex-col gap-4 px-[60px]'>
                    <div className='flex items-center gap-4 mt-20'>
                        <h3 className='text-[40px] text-main-500 font-bold'>Bảng Xếp Hạng Tuần</h3>
                        <span className='p-2 rounded-full text-white bg-main-500 hover:bg-main-300'><BsFillPlayFill size={32} /></span>
                    </div>
                    <div className='flex gap-8'>
                        {weekChart?.map(item => (
                            <NavLink
                                key={item.chartId}
                                to={item.link.split('.')[0]}
                                className={({ isActive }) => isActive ? activedStyle : notActiveStyle}
                            >
                                {item.country === 'vn' ? 'VIỆT NAM'
                                    : item.country === 'us' ? 'US-UK'
                                        : item.country === 'korea' ? 'K-POP'
                                            : ''}
                            </NavLink>
                        ))}
                    </div>
                    <div className='w-full pb-[80px]'>
                        <RankList
                            data={weekChart?.find(item => item?.link?.includes(pid))?.items}
                            number={100}
                            isHideShowFull={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeekRank
