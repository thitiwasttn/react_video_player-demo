import React, {useEffect, useState} from 'react';
import {VideoM} from "./VideoM";
import {getListVideo, getListVideoRes} from "./VideoService";
import {useNavigate} from "react-router-dom";
import {ResolutionM} from "./ResolutionM";

interface Video {
    "name": string
    "id": number
}

const init: VideoM[] = []
const homepage = process.env.PUBLIC_URL;

export function ListVideo() {
    const [listVideo, setListVideo] = useState<VideoM[]>([])
    const navigateFunction = useNavigate();

    async function loadData() {
        await getListVideo("thitiwas111").then(async value => {
            let data: VideoM[] = value.data as VideoM[];
            for (let datum of data) {
                await getListVideoRes("thitiwas111", datum.id).then(value1 => {
                    datum.resolutions = value1.data
                })
            }
            setListVideo(data)
        })
    }

    useEffect(() => {
        loadData()
    }, [])

    function gotoVideo(id: number) {
        console.log('goto video :{}', id);
        navigateFunction(homepage + '/' + id)
    }

    function statusCompress(isCompressComplete: string | null) {
        if (isCompressComplete === 'Y') {
            return <span className="badge text-bg-success">Success</span>
        } else if (isCompressComplete === 'F') {
            return <span className="badge text-bg-danger">Fail</span>
        } else if (isCompressComplete === null) {
            return <span className="badge text-bg-info">Processing</span>
        }

        return <span className="badge text-bg-dark">{isCompressComplete}</span>
    }

    function getResolutionAvailable(resolutions: ResolutionM[]) {
        return resolutions.map(value => {
            return <span className="me-1">{value.resolution}</span>
        })
    }

    return (
        <>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col text-center"}>
                        <span className={"fs-1"}>List Video</span>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col"}>
                        <div className="list-group">
                            {
                                listVideo.map((value, index) => {
                                    return <>
                                        <div className="list-group-item list-group-item-action"
                                             onClick={function () {
                                                 gotoVideo(value.id)
                                             }}>
                                            <div>
                                                id: {value.id}
                                            </div>
                                            <div>
                                                name: {value.videoName}
                                            </div>
                                            <div>
                                                isCompressComplete: {statusCompress(value.isCompressComplete)}
                                            </div>

                                            <div>
                                                resolution available: {getResolutionAvailable(value.resolutions)}
                                            </div>
                                        </div>
                                    </>
                                })
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}