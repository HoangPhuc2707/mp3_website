import React, { useEffect, useRef, useState } from 'react'
import { apiGetChartHome } from '../../apis'
import bgChart from '../../assets/images/bg-chart.jpg'
import { Chart } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import { SongItem, RankList } from '../../components'
import _ from 'lodash'
import icons from '../../ultis/icons'

const { BsFillPlayFill } = icons

const ZingChart = () => {
    const [chartData, setChartData] = useState(null)
    const [data, setData] = useState(null)
    const [tooltipState, setTooltipState] = useState({
        opacity: 0,
        top: 0,
        left: 0
    })
    const [selected, setSelected] = useState(null)
    const chartRef = useRef()
    const ref = useRef()

    const options = {
        responsive: true,
        pointRadius: 0,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: { display: false },
                grid: { color: 'rgba(0,0,0,0.3)', drawTicks: false },
                min: chartData?.RTChart?.chart?.minScore,
                max: chartData?.RTChart?.chart?.maxScore,
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
                            data: chartData?.RTChart?.chart?.items[Object.keys(chartData?.RTChart?.chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item =>
                                item.counter),
                            encodeId: Object.keys(chartData?.RTChart?.chart?.items)[i]
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
        const fetchChartData = async () => {
            const response = await apiGetChartHome()
            if (response.data.err === 0) {
                setChartData(response.data.data)
            }
        }
        fetchChartData()
    }, [])

    useEffect(() => {
        const labels = chartData?.RTChart?.chart?.times?.filter(item => +item.hour % 2 === 0)?.map(item => `${item.hour}:00`)
        const datasets = []
        if (chartData?.RTChart?.chart?.items) {
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    data: chartData?.RTChart?.chart?.items[Object.keys(chartData?.RTChart?.chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter),
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
    }, [chartData])

    useEffect(() => {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
    }, [chartData])

    return (
        <div >
            <div>
                <div ref={ref} className='relative'>
                    <img src={bgChart} alt='bgChart' className='w-full h-[500px] object-cover grayscale' />
                    <div className='absolute top-0 left-0 right-0 bottom-0 bg-[rgba(255,255,255,0.9)]'></div>
                    <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-[#ffffff] to-transparent'></div>
                    <div className='absolute top-0 left-0 right-0 bottom-1/2 flex items-center gap-4 px-[60px]'>
                        <h3 className='text-[40px] gradient-text font-bold'>#zingchart</h3>
                        <span className='p-1 rounded-full bg-white hover:bg-main-300'><BsFillPlayFill size={24} /></span>
                    </div>
                    <div className='absolute top-1/3 left-0 right-0 bottom-0 px-[60px]'>
                        {data && <Line data={data} ref={chartRef} options={options} />}
                        <div
                            className='tool-tip'
                            style={{ position: 'absolute', top: tooltipState.top, left: tooltipState.left, opacity: tooltipState.opacity }}
                        >
                            <SongItem
                                thumbnail={chartData?.RTChart?.items?.find(item => item.encodeId === selected)?.thumbnail}
                                title={chartData?.RTChart?.items?.find(item => item.encodeId === selected)?.title}
                                artists={chartData?.RTChart?.items?.find(item => item.encodeId === selected)?.artistsNames}
                                sid={chartData?.RTChart?.items?.find(item => item.encodeId === selected)?.encodeId}
                                style='bg-white'
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='px-[60px] mt-8'>
                <RankList data={chartData?.RTChart?.items} number={10} />
            </div>
            <div className='relative'>
                <img src={bgChart} alt='bgChart' className='w-full h-[1700px] object-cover grayscale' />
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-[rgba(255,255,255,0.9)]'></div>
                <div className='absolute top-0 left-0 right-0 bottom-1/2 flex flex-col gap-4 mt-8 px-[60px]'>
                    <h3 className='text-[40px] text-main-500 font-bold'>Bảng Xếp Hạng Tuần</h3>
                    <div className='flex flex-col gap-8'>
                        {chartData?.weekChart && Object.entries(chartData?.weekChart)?.map((item, index) => (
                            <div
                                className='flex-1 bg-white rounded-md px-[10px] py-5'
                                key={index}
                            >
                                <div className='flex gap-2'>
                                    <h3 className='pl-8 text-[20px] text-main-500 font-bold'>
                                        {item[0] === 'vn' ? 'Việt Nam'
                                            : item[0] === 'us' ? 'US-UK'
                                                : item[0] === 'korea' ? 'K-Pop'
                                                    : ''}
                                    </h3>
                                    <span className='p-1 rounded-full text-white bg-main-500 hover:bg-main-300'><BsFillPlayFill size={24} /></span>
                                </div>
                                <div className='mt-4 h-fit'>
                                    <RankList
                                        data={item[1]?.items}
                                        isHideAlbum={true}
                                        number={5}
                                        link={item[1]?.link}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ZingChart
