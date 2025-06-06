import actionTypes from "./actionTypes";
import * as apis from "../../apis";

export const setCurSongId = (sid) => ({
    type: actionTypes.SET_CUR_SONG_ID,
    sid: sid
})

export const play = (flag) => ({
    type: actionTypes.PLAY,
    flag: flag
})

export const playAlbum = (flag) => ({
    type: actionTypes.SET_ALBUM,
    flag: flag
})

export const setPlaylist = (songs) => ({
    type: actionTypes.PLAYLIST,
    songs: songs
})

export const setLoading = (flag) => ({
    type: actionTypes.LOADING,
    flag: flag
})

export const setCurSongData = (data) => ({
    type: actionTypes.SET_CUR_SONG_DATA,
    data: data
})

export const setCurAlbumId = (pid) => ({
    type: actionTypes.SET_CUR_ALBUM_ID,
    pid: pid
})

export const setRecent = (data) => ({
    type: actionTypes.SET_RECENT,
    data: data
})

export const search = (keyword) => async (dispatch) => {
    try {
        const response = await apis.apiSearch(keyword)
        if (response.data.err === 0) {
            dispatch({
                type: actionTypes.SEARCH,
                data: response.data.data,
                keyword: keyword
            })
        } else {
            dispatch({
                type: actionTypes.SEARCH,
                data: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.SEARCH,
            data: null
        })
    }
}

export const getSearchSongs = (singerId) => async (dispatch) => {
    try {
        const response = await apis.apiGetArtistSongs(singerId)
        if (response.data.err === 0) {
            dispatch({
                type: actionTypes.PLAYLIST,
                songs: response.data.data.items,
            })
        } else {
            dispatch({
                type: actionTypes.PLAYLIST,
                songs: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.PLAYLIST,
            songs: null
        })
    }
}

export const clearRecent = () => ({
    type: actionTypes.CLEAR_RECENT,
})



