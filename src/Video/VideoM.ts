import {ResolutionM} from "./ResolutionM";

export interface VideoM {
    "id": number,
    "videoName": string,
    "folderName": string,
    "isUploadComplete": string,
    "isCompressComplete": string | null
    "resolutions": ResolutionM[]
}