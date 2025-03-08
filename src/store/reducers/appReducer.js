import actionTypes from "../actions/actionTypes";

const initState = {
    banner: null,
    chill: null,
    top100: null,
    isLoading: false,
    newRelease: null,
    weekChart: null,
    albumHot: null,
    chart: null,
    rank: null,
    scrollTop: false,
}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find(item => item.sectionId === 'hSlider')?.items || null,
                chill: action.homeData?.find(item => item.sectionId === 'hEditorTheme') || null,
                top100: action.homeData?.find(item => item.sectionId === 'h100') || null,
                newRelease: action.homeData?.find(item => item.sectionType === 'new-release') || null,
                weekChart: action.homeData?.find(item => item.sectionType === 'weekChart')?.items || null,
                albumHot: action.homeData?.find(item => item.sectionId === 'hAlbum') || null,
                chart: action.homeData?.find(item => item.sectionId === 'hZC')?.chart || null,
                rank: action.homeData?.find(item => item.sectionId === 'hZC')?.items || null,
            }
        case actionTypes.LOADING:
            return {
                ...state,
                isLoading: action.flag
            }
        case actionTypes.ZERO_SCROLLTOP:
            return {
                ...state,
                scrollTop: action.flag
            }

        default:
            return state
    }
}

export default appReducer