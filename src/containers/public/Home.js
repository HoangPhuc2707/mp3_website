import React, { useEffect } from "react";
import { NewRelease, Section, Sliders, ChartSection, SectionItem } from "../../components";
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Loading } from '../../components'

const Home = () => {
    const { chill, top100, weekChart, albumHot } = useSelector(state => state.app)

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 2500,
    };
    return (
        <>
            {(chill && top100 && weekChart && albumHot) ? <div className='overflow-y-auto w-full'>
                <div className="w-full h-[70px]"></div>
                <Sliders />
                <Section data={chill} />
                <NewRelease />
                <Section data={top100} />
                <ChartSection />
                <div className="flex items-center px-[43px] w-full mt-12">
                    {weekChart?.map(item => {
                        return (
                            <Link to={item.link?.split('.')[0]} key={item.link} className="flex-1 px-4">
                                <img src={item.cover} alt="cover" className="w-full object-cover rounded-md" />
                            </Link>
                        )
                    })}
                </div>
                <div className='mt-12 px-[59px] flex flex-col gap-5'>
                    <div className='flex items-center'>
                        <h3 className='text-xl font-bold'>{albumHot?.title}</h3>
                    </div>
                    <div className='w-full'>
                        <Slider {...settings}>
                            {albumHot && albumHot?.items?.length > 0 && albumHot.items.map(item => {
                                return (
                                    <div key={item.encodeId} className="px-2">
                                        <SectionItem
                                            title={item.title}
                                            link={item.link}
                                            sortDescription={item.sortDescription}
                                            thumbnailM={item.thumbnailM}
                                            size='w-full'
                                        />
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                </div>
            </div>
                : <div className="w-full h-full flex justify-center items-center">
                    <Loading />
                </div>}
        </>
    )
}

export default Home