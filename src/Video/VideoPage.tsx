import React, {useEffect, useState} from 'react'
import ReactPlayer from "react-player";
import {OnProgressProps} from "react-player/base";

interface Settings {
    url: string
    playAt: number
}

const myUrl = "https:///hls/pentor_v3.json/master.m3u8?1=1";

export function VideoPage() {
    const [url, setUrl] = useState<Settings>({
        playAt: -1, url: ""
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

        return <><button onClick={function () {
            changeRes(-1);
        }}>auto</button>{a}</>
    }

    return (
        <>
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
                             config={{
                                 file: {
                                     hlsOptions: {
                                         startPosition: url.playAt,
                                     },
                                 }
                             }}
                />
            </div>

            <div>
                {showButtonRes()}
            </div>

            <ul>

                <li>
                    <button onClick={function () {
                        setUrl({
                            playAt: 0, url: myUrl
                        })
                    }}>pentor
                    </button>
                </li>
                <li>
                    <button onClick={function () {
                        setUrl({
                            playAt: 1200, url: myUrl
                        })
                    }}>pentor start at 20 minute
                    </button>
                </li>


                <li>
                    <button onClick={function () {
                        setUrl({
                            playAt: -1, url: 'https://www.youtube.com/watch?v=ysz5S6PUM-U'
                        })
                    }}>youtube
                    </button>
                </li>

                <li>
                    <button onClick={function () {
                        setUrl({
                            playAt: -1,
                            url: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
                        })
                    }}>some demo
                    </button>
                </li>
            </ul>

        </>
    )

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
}