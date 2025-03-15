import icons from "./icons"

const { MdOutlineLibraryMusic, RiChatFollowUpLine, FaRegChartBar, TbChartArcs } = icons
export const sidebarMenu = [
    {
        path: 'mymusic',
        text: 'Cá nhân',
        icons: <MdOutlineLibraryMusic size={24} />
    },
    {
        path: '',
        text: 'Khám phá',
        end: true,
        icons: <TbChartArcs size={24} />
    },
    {
        path: 'zing-chart',
        text: '#zingchart',
        icons: <FaRegChartBar size={24} />
    },
    // {
    //     path: 'myfollow',
    //     text: 'Theo dõi',
    //     icons: <RiChatFollowUpLine size={24} />
    // },
]

export const searchMenu = [
    {
        path: 'tat-ca',
        text: 'TẤT CẢ',
    },
    {
        path: 'bai-hat',
        text: 'BÀI HÁT',
    },
    {
        path: 'playlist',
        text: 'PLAYLIST/ALBUM',
    }
]