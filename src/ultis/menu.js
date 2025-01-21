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
    {
        path: 'follow',
        text: 'Theo dõi',
        icons: <RiChatFollowUpLine size={24} />
    },
]