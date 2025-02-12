import actionTypes from "../actions/actionTypes";

const initState = {
    banner: [],
    chill: {},
    top100: {},
    isLoading: false,
    newRelease: {},
    weekChart: [],
    albumHot: {},
}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find(item => item.sectionId === 'hSlider')?.items || null,
                chill: action.homeData?.find(item => item.sectionId === 'hEditorTheme') || {},
                top100: action.homeData?.find(item => item.sectionId === 'h100') || {},
                newRelease: action.homeData?.find(item => item.sectionType === 'new-release') || {},
                weekChart: action.homeData?.find(item => item.sectionType === 'weekChart')?.items || [],
                albumHot: action.homeData?.find(item => item.sectionId === 'hAlbum') || {},
            }
        case actionTypes.LOADING:
            return {
                ...state,
                isLoading: action.flag
            }

        default:
            return state
    }
}

export default appReducer