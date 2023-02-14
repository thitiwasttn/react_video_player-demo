import React, {useEffect, useState} from 'react'
import {useParams} from "react-router";
import './clone_youtube.css'
import hamburger from './image/header/hamburger.png'
import yt from './image/header/yt-logo.png'
import search from './image/header/search.png'
import grid from './image/header/grid.png'
import upload from './image/header/upload.png'
import bell from './image/header/bell.png'
import profile_placeholder from './image/header/profile-placeholder.png'
import describe_icons from './image/describe-icons.jpg'
import describe_name from './image/describe-name.jpg'
import subscribed from './image/subscribed.jpg'
import aside_pic from './image/aside-pic.jpg'
import sort from './image/sort.jpg'
import profile_icon from './image/profile_icon.png'
import like from './image/like.jpg'
import dislike from './image/dislike.jpg'
import ReactPlayer from "react-player";
import {OnProgressProps} from "react-player/base";
import {useSearchParams} from "react-router-dom";
import {getListVideoRes} from "./VideoService";
import {ResolutionM} from "./ResolutionM";

interface Settings {
    url: string
    playAt: number
}

interface Size {
    "res": string
    "size": string
}

export function VideoV2() {
    const {id} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [url, setUrl] = useState<Settings>({
        playAt: -1,
        url: ``
    });
    const ref = React.useRef<ReactPlayer>(null);

    const [durationTotal, setDurationTotal] = useState<number>(0)
    const [playerSecond, setPlayerSecond] = useState<number>(0);
    const [levels, setLevels] = useState<any[]>([]);
    const [currentPlayRes, setCurrentPlayRes] = useState<string>("")
    const [size, setSize] = useState<Size[]>([])

    useEffect(() => {
        const at = searchParams.get("at");
        let num = -1;
        if (at) {
            num = Number(at);
        }
        setUrl({
            playAt: num,
            url: `https://1NiJ9.eyJjcmVhdGVfdGltZSI6IjE2NzY1NDA2MTQ5ODciLCJpc3MiOiJiYWNrZW5kU2VydmljZSIsImlkIjoiNCJ9.W-Z_LEjmtmlI3PDSiubDgvH0BPjNTLw2pQtEo_-zA8c/${id}/hls/master.m3u8?time=?rma`
        })

        getListVideoRes("thitiwas111", Number(id)).then(value => {
            const data = value.data as ResolutionM[];
            let sizeTemp: Size[] = [];
            for (let datum of data) {
                const sizetemp = Math.round((Number(datum.fileSize) / 1024) / 1024) + " MB";
                sizeTemp.push({
                    res: datum.resolution, size: sizetemp
                })
            }
            setSize(sizeTemp);
        })
    }, [])

    function changeRes(value: number) {
        console.log('changeRes', value);
        const internalPlayer = ref.current?.getInternalPlayer('hls');
        if (value === -1) {
            // @ts-ignore
            internalPlayer.currentLevel = -1;
        } else {
            const number = levels.findIndex(value1 => {
                return value1.height === value
            });

            // @ts-ignore
            internalPlayer.currentLevel = number;
        }
    }

    function showButtonRes() {
        const a = levels.map((value, index) => {
            return <button className={"btn btn-info me-1"} onClick={function () {
                changeRes(value.height);
            }}>{value.height}/{((value.bitrate / 1024) / 1024) + "Mbps"}</button>
        })

        return <>
            <button hidden={levels.length === 0} className={"btn btn-info me-1"} onClick={function () {
                changeRes(-1);
            }}>Auto
            </button>
            {a}</>
    }


    function OnProgress(state: OnProgressProps) {
        // console.log('state', state);
        const playedSeconds = Math.floor(state.playedSeconds);
        setPlayerSecond(prevState => {
            if (prevState !== playedSeconds) {
                setDurationTotal(prevState1 => {
                    prevState1 = prevState1 + 1;
                    return prevState1;
                })
                return playedSeconds
            } else {
                return prevState
            }
        })
        setCurrentLevel()
    }

    function onDuration(number: number) {
        console.log('number', number);

    }

    function onPlay() {
        console.log('onPlay');

    }

    function onStart() {
        console.log('onStart');

    }

    function setCurrentLevel() {
        try {
            const internalPlayer = ref.current?.getInternalPlayer('hls');
            const currentLevel = internalPlayer?.currentLevel;
            const number: any = levels[currentLevel];
            if (currentLevel === -1) {
                setCurrentPlayRes('auto');
            } else {
                setCurrentPlayRes(number.height + "/" + ((number.bitrate / 1024) / 1024) + " Mbps");
            }

        } catch (e) {
            //alert(e)
        }
    }

    function onReady(player: ReactPlayer) {
        console.log('player', player);
        console.log('ref ', ref.current);
        const internalPlayer = ref.current?.getInternalPlayer('hls');
        console.log('getInternalPlayer >>', internalPlayer)
        // setInternal(internalPlayer)
        const levels = internalPlayer?.levels;
        console.log('levels', levels);
        setCurrentLevel()
        // console.log('levels', levels)
        let heights: number[] = [];
        for (let level of levels) {
            // console.log('height ', level.height);
            heights.push(level)
        }
        setLevels(heights)
    }

    function onPause() {
        console.log('onPause()');
    }

    function showCurrentPlay() {
        return <>
            <span className="badge text-bg-primary">Current resolution playing : {currentPlayRes}</span>
        </>
    }

    return (
        <>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col mt-5"}>
                        build at 13/02/2023 16:31
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col mt-5"}>
                        <div className='player-wrapper'>
                            <ReactPlayer url={url.url}
                                         ref={ref}
                                         controls={true}
                                         onReady={onReady}
                                         onStart={onStart}
                                         onPlay={onPlay}
                                         onPause={onPause}
                                         onDuration={onDuration}
                                         onProgress={OnProgress}
                                         className='react-player'
                                         playing={true}
                                         width='100%'
                                         height='100%'
                                         config={{
                                             file: {
                                                 hlsOptions: {
                                                     startPosition: url.playAt,
                                                     autoStartLoad: true
                                                 },
                                             }
                                         }}
                            />
                        </div>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"mt-3 col-12"}>
                        {showCurrentPlay()}
                    </div>
                    <div className={"mt-3 col"}>
                        {showButtonRes()}
                    </div>

                    <div className={"mt-3 col-12"} hidden={true}>
                        <button onClick={function () {
                            try {
                                let internalPlayer = ref.current?.getInternalPlayer('hls');
                                // @ts-ignore
                                internalPlayer.currentLevel = 0;
                            } catch (e) {
                                alert(e)
                            }
                        }}>
                            test
                        </button>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-12 mt-3"}>
                        {
                            size.map(value => {
                                return <span className="badge text-bg-secondary me-1">Resolution: {value.res} <br/>Size: {value.size}</span>
                            })
                        }

                    </div>
                </div>
            </div>
        </>
    )
}