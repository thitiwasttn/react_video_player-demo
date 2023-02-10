import axios from "axios";
import {VideoM} from "./VideoM";
import {ResolutionM} from "./ResolutionM";

export function getListVideo(token: string) {
    return axios.get<VideoM[]>(`https://www/vod/api/v1/videos?token=${token}`);
}

export function getListVideoRes(token: string,videoId: number) {
    return axios.get<ResolutionM[]>(`https://www/vod/api/v1/resolution/${videoId}/?token=${token}`);
}