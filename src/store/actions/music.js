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
// export const fetchDetailPlaylist = (pid) => async (dispatch) => {
//     try {
//         const response = await apis.apiGetDetailPlaylist(pid)
//         if (response?.data.err === 0) {
//             dispatch({
//                 type: actionTypes.PLAYLIST,
//                 songs: response.data?.data?.song?.items
//             })
//         }
//     } catch (error) {
//         dispatch({
//             type: actionTypes.PLAYLIST,
//             songs: null
//         })
//     }
// }