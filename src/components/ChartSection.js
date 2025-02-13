import React, { memo, useEffect, useRef, useState } from 'react'
import bgChart from '../assets/images/bg-chart.jpg'
import { Chart } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { SongItem } from './'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import path from '../ultis/path'
import icons from '../ultis/icons'

const { BsFillPlayFill } = icons

const ChartSection = () => {
    const [data, setData] = useState(null)
    const { chart, rank } = useSelector(state => state.app)
    const [tooltipState, setTooltipState] = useState({
        opacity: 0,
        top: 0,
        left: 0
    })
    const [selected, setSelected] = useState(null)
    const chartRef = useRef()

    const options = {
        responsive: true,
        pointRadius: 0,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: { display: false },
                grid: { color: 'rgba(255,255,255,0.1', drawTicks: false },
                min: chart?.minScore,
                max: chart?.maxScore,
                border: { dash: [3, 4] }
            },
            x: {
                ticks: { color: 'gray' },
                grid: { color: 'transparent' }
            }
        },
        plugins: {
            legend: false,
            tooltip: {
                enabled: false,
                external: ({ tooltip }) => {
                    if (!chartRef || !chartRef.current) return
                    if (tooltip.opacity === 0) {
                        if (tooltipState.opacity !== 0) setTooltipState(prev => ({ ...prev, opacity: 0 }))
                        return
                    }
                    const counters = []
                    for (let i = 0; i < 3; i++) {
                        counters.push({
                            data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item =>
                                item.counter),
                            encodeId: Object.keys(chart?.items)[i]
                        })
                    }
                    const res = counters.find(item => item.data.some(num => num === +tooltip.body[0]?.lines[0]?.replace('.', '')))
                    setSelected(res.encodeId)
                    const newTooltipData = {
                        opacity: 1,
                        top: tooltip.caretY,
                        left: tooltip.caretX
                    }
                    if (!_.isEqual(tooltipState, newTooltipData)) setTooltipState(newTooltipData)
                }
            }
        },
        hover: {
            mode: 'dataset',
            intersect: false
        }
    }
    useEffect(() => {
        const labels = chart?.times?.filter(item => +item.hour % 2 === 0)?.map(item => `${item.hour}:00`)
        const datasets = []
        if (chart?.items) {
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter),
                    borderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
                    tension: 0.2,
                    borderWidth: 2,
                    pointBackgroundColor: 'white',
                    pointHoverRadius: 4,
                    pointBorderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
                    pointHoverBorderWidth: 4,
                })
            }
        }
        setData({ labels, datasets })
    }, [chart])

    return (
        <div className='px-[59px] mt-12 relative max-h-[400px]'>
            <img src={bgChart} alt='bg-chart' className='w-full object-cover rounded-md max-h-[400px]' />
            <div className='absolute z-10 top-0 left-[59px] right-[59px] bottom-0 bg-[rgba(77,34,104,0.9)] rounded-md'></div>
            <div className='absolute z-20 top-0 left-[59px] right-[59px] bottom-0 p-5 flex flex-col gap-4'>
                <Link to={path.ZING_CHART} className='flex gap-2 items-center'>
                    <h3 className='text-2xl gradient-text font-bold'>#zingchart</h3>
                    <span className='p-1 rounded-full bg-white hover:bg-main-300'><BsFillPlayFill size={16} /></span>
                </Link>
                <div className='flex gap-4 h-full'>
                    <div className='flex-4 flex flex-col gap-4'>
                        {rank?.slice(0, 3)?.map((item, index) => {
                            return (
                                <SongItem
                                    thumbnail={item.thumbnail}
                                    title={item.title}
                                    artists={item.artistsNames}
                                    sid={item.encodeId}
                                    order={index + 1}
                                    percent={Math.round(item.score * 100 / chart?.totalScore)}
                                    style='text-white bg-[hsla(0,0%,100%,.07)] hover:!bg-[#945EA7]'
                                />
                            )
                        })}
                        <Link to={path.ZING_CHART} className='text-white px-4 py-[2px] m-auto rounded-l-full rounded-r-full
                        border border-white w-fit'
                        >Xem thêm</Link>
                    </div>
                    <div className='flex-6 h-[90%] relative'>
                        {data && <Line data={data} ref={chartRef} options={options} />}
                        <div
                            className='tool-tip'
                            style={{ position: 'absolute', top: tooltipState.top, left: tooltipState.left, opacity: tooltipState.opacity }}
                        >
                            <SongItem
                                thumbnail={rank?.find(item => item.encodeId === selected)?.thumbnail}
                                title={rank?.find(item => item.encodeId === selected)?.title}
                                artists={rank?.find(item => item.encodeId === selected)?.artistsNames}
                                sid={rank?.find(item => item.encodeId === selected)?.encodeId}
                                style='bg-white'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ChartSection)
