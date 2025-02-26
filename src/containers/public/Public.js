import React, { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { SidebarLeft, SidebarRight, Player, Header, Loading } from "../../components";
import Scrollbars from 'react-custom-scrollbars-2'
import { useSelector } from "react-redux";

const Public = () => {
    const [isShowRightSidebar, setIsShowRightSidebar] = useState(true)
    const { isLoading } = useSelector(state => state.app)
    const { singer } = useParams()
    return (
        <div className="w-full relative h-screen flex flex-col bg-main-100">
            <div className="w-full h-full flex flex-auto">
                <div className="w-[240px] h-full flex-none bg-main-200">
                    <SidebarLeft />
                </div>
                <div className="flex-auto relative flex flex-col">
                    {isLoading && <div className="absolute top-0 left-0 bottom-0 right-0 z-20 bg-white flex items-center justify-center">
                        <Loading />
                    </div>}
                    <div className={`absolute w-full h-[70px] ${singer ? 'bg-transparent' : 'bg-main-100'} px-[59px] z-50 flex items-center`}>
                        <Header />
                    </div>
                    <div className="flex-auto w-full">
                        <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
                            <Outlet />
                        </Scrollbars>
                    </div>
                </div>
                {isShowRightSidebar && <div className="w-[260px] absolute right-0 top-0 z-50 h-screen hidden 1200:flex flex-none bg-main-200 animate-slide-left">
                    <SidebarRight />
                </div>}
            </div>
            <div className="fixed z-50 bottom-0 left-0 right-0 h-[80px]">
                <Player setIsShowRightSidebar={setIsShowRightSidebar} />
            </div>
        </div>
    )
}

export default Public