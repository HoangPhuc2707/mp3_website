import React, { useEffect } from "react";
import { NewRelease, Section, Slider } from "../../components";
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";

const Home = () => {
    const { chill, top100, weekChart, albumHot } = useSelector(state => state.app)
    return (
        <div className='overflow-y-auto w-full'>
            <Slider />
            <Section data={chill} />
            <NewRelease />
            <Section data={top100} />
            <div className="flex items-center px-[43px] w-full mt-12">
                {weekChart?.map(item => {
                    return (
                        <Link to={item.link?.split('.')[0]} key={item.link} className="flex-1 px-4">
                            <img src={item.cover} alt="cover" className="w-full object-cover rounded-md" />
                        </Link>
                    )
                })}
            </div>
            <Section data={albumHot} />
            <div className="w-full h-[500px]"></div>
        </div>
    )
}

export default Home