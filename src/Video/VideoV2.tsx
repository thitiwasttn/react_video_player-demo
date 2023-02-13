import React, {useState} from 'react'
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

interface Settings {
    url: string
    playAt: number
}

export function VideoV2() {
    const {id} = useParams();
    const [url, setUrl] = useState<Settings>({
        playAt: -1, url: `https://www.dev.dkups.com/hls/videos/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVhdGVfdGltZSI6IjE2NzY1NDA2MTQ5ODciLCJpc3MiOiJiYWNrZW5kU2VydmljZSIsImlkIjoiNCJ9.W-Z_LEjmtmlI3PDSiubDgvH0BPjNTLw2pQtEo_-zA8c/${id}/hls/master.m3u8?time=?rma`
    });
    const ref = React.useRef<ReactPlayer>(null);

    const [durationTotal, setDurationTotal] = useState<number>(0)
    const [playerSecond, setPlayerSecond] = useState<number>(0);
    const [levels, setLevels] = useState<number[]>([]);

    function changeRes(value: number) {
        const internalPlayer = ref.current?.getInternalPlayer('hls');
        if (value === -1) {
            // @ts-ignore
            internalPlayer.currentLevel = -1;
        } else {
            const number = levels.indexOf(value);

            // @ts-ignore
            internalPlayer.currentLevel = number;
        }
    }

    function showButtonRes() {
        const a = levels.map((value, index) => {
            return <button onClick={function () {
                changeRes(value);
            }}>{value}</button>
        })

        return <>
            <button onClick={function () {
                changeRes(-1);
            }}>auto
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

    function onReady(player: ReactPlayer) {
        console.log('player', player);

        console.log('getInternalPlayer', ref.current?.getInternalPlayer('hls'))
        const levels = ref.current?.getInternalPlayer('hls').levels;
        // console.log('levels', levels)
        let heights: number[] = [];
        for (let level of levels) {
            // console.log('height ', level.height);
            heights.push(level.height)
        }
        setLevels(heights)
    }

    function onPause() {
        console.log('onPause()');
    }

    return (
        <>
            <div className={"container"}>
                <div className={"row "}>
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
            </div>
        </>
    )
}