import axios from "../axios";

export const apiGetSong = (sid) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            url: '/song',
            method: 'get',
            params: { id: sid }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetDetailSong = (sid) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            url: '/infosong',
            method: 'get',
            params: { id: sid }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetDetailPlaylist = (pid) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            url: '/detailplaylist',
            method: 'get',
            params: { id: pid }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiSearch = (keyword) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            url: '/search',
            method: 'get',
            params: { keyword: keyword }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})