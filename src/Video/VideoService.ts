import axios from "axios";
import {VideoM} from "./VideoM";
import {ResolutionM} from "./ResolutionM";
import {VideoTranscribeM} from "./VideoTranscribeM";

export function getListVideo(token: string) {
    return axios.get<VideoM[]>(`https://www.dev.dkups.com/vod/api/v1/videos?token=${token}`);
}

export function getListVideoRes(token: string, videoId: number) {
    return axios.get<ResolutionM[]>(`https://www.dev.dkups.com/vod/api/v1/resolution/${videoId}/?token=${token}`);
}

export function uploadVideo(file?: File, name?: string, l480?: string, l720?: string, l1080?: string) {
    let data = new FormData();
    if (file) {
        data.append("video", file)
    }
    if (name) {
        data.append("name", name)
    }
    if (l480 && l480 !== "undefined") {
        data.append("l480", l480)
    }
    if (l720 && l720 !== "undefined") {
        data.append("l720", l720)
    }
    if (l1080 && l1080 !== "undefined") {
        data.append("l1080", l1080)
    }
    // return axios.post<string>(`https://www.dev.dkups.com/vod/api/v1/upload`, data, {
    //     headers: {
    //         "Content-Type": "multipart/form-data",
    //         // 'Content-Length': data.getLengthSync(),
    //     }
    // });\

    return axios.post(`https://www.dev.dkups.com/vod/api/v1/upload`, data);
}

export function getTranscript(token: string, videoId: number) {
    return axios.get<VideoTranscribeM[]>(`https://www.dev.dkups.com/vod/api/v1/transcript/${videoId}/?token=${token}`);
}

export function searchVideo(token: string, keyword: string) {
    return axios.get<VideoM[]>(`https://www.dev.dkups.com/vod/api/v1/search/${keyword}/?token=${token}`);
}