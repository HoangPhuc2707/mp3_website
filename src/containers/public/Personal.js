import React from 'react'
import avatar from '../../assets/images/avata.jpg'

const Personal = () => {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <img src={avatar} alt='avatar' className='w-[300px] h-[300px] object-cover rounded-full' />
        </div>
    )
}

export default Personal
