import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../store/actions'
import { useNavigate } from 'react-router-dom'

const Slider = () => {
    const { banner } = useSelector(state => state.app)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const sliderEls = document.getElementsByClassName('slider-item')
        let currentId = 0;

        const intervalId = setInterval(() => {
            for (let i = 0; i < sliderEls.length; i++) {
                sliderEls[i].style.display = 'none';
            }

            if (currentId < sliderEls.length) {
                sliderEls[currentId].style.display = 'block';
            }
            // sliderEls[currentId].classList.add('animate-slide-left')
            currentId++;
            if (currentId >= sliderEls.length) {
                currentId = 0;
            }
        }, 2500);
        return () => {
            intervalId && clearInterval(intervalId)
        }
    }, [])

    const handleClickBanner = (item) => {
        if (item?.type === 1) {
            dispatch(actions.setCurSongId(item.encodeId))
            dispatch(actions.play(true))
        } else if (item?.type === 4) {
            const albumPath = item?.link?.split('.')[0]
            navigate(albumPath)
        }
    }

    return (
        <div className='flex gap-4 w-full overflow-hidden px-[59px] pt-8'>
            {banner?.map((item, index) => {
                return (
                    <img
                        key={item.encodeId}
                        src={item.banner}
                        onClick={() => handleClickBanner(item)}
                        className={`slider-item flex-1 object-contain w-full rounded-md ${index == 0 ? 'block' : 'hidden'}`}
                        alt='img-banner' />
                )
            })}
        </div>
    )
}

export default Slider
