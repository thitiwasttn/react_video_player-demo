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
            let data: VideoM[] = (value.data as VideoM[]).reverse();
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
                {/*<div className={"row"}>*/}
                {/*    <div className={"col text-center"}>*/}
                {/*        <span className={"fs-1"}>List Video</span>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className={"row"}>
                    <div className={"col mt-2"}>
                        <button className={"btn btn-info"} onClick={function () {
                            navigateFunction(`${homepage}/upload`)
                        }}>Upload Video</button>
                    </div>
                </div>
                <div className={"row"}>
                    {
                        listVideo.map((value, index) => {
                            // return <>
                            //     <div className="list-group-item list-group-item-action"
                            //          onClick={function () {
                            //              gotoVideo(value.id)
                            //          }}>
                            //         <div>
                            //             id: {value.id}
                            //         </div>
                            //         <div>
                            //             name: {value.videoName}
                            //         </div>
                            //         <div>
                            //             isCompressComplete: {statusCompress(value.isCompressComplete)}
                            //         </div>
                            //
                            //         <div>
                            //             resolution available: {getResolutionAvailable(value.resolutions)}
                            //         </div>
                            //     </div>
                            // </>
                            return <div className={"col-auto mt-2"}>
                                <div className="card" style={{width: "18rem"}}>
                                    <div className="card-body">
                                        <h5 className="card-title">{value.videoName}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">id: {value.id}</h6>
                                        <p className="card-text">isCompressComplete: {statusCompress(value.isCompressComplete)}</p>
                                        <p className="card-text">resolution available: {getResolutionAvailable(value.resolutions)}</p>
                                        <button className={"btn btn-primary"} disabled={value.resolutions.length === 0} onClick={function () {
                                            gotoVideo(value.id)
                                        }}>
                                            watch
                                        </button>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </>
    )
}