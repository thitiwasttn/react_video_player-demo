import React, {useState} from 'react'
import ReactPlayer from "react-player";
import {OnProgressProps} from "react-player/base";

interface Settings {
    url: string
    playAt: number
}

export function VideoPage() {
    const [url, setUrl] = useState<Settings>({
        playAt: -1, url: ""
    });


    const [durationTotal, setDurationTotal] = useState<number>(0)
    const [playerSecond, setPlayerSecond] = useState<number>(0);

    return (
        <>
            <div className='player-wrapper'>
                <ReactPlayer url={url.url}
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

            <ul>
                <li>
                    <button onClick={function () {
                        setUrl({
                            playAt: 1200, url: "https://www.dev.dkups.com/hls/pentor_v3.json/master.m3u8?1=1"
                        })
                        console.log("https://www.dev-hls.com/hls/pentor_v3.json/master.m3u8?1=1");
                    }}>pentor start at 20 minute
                    </button>
                </li>

                <li>
                    <button onClick={function () {
                        setUrl({
                            playAt: 0, url: "https://www.dev.dkups.com/hls/pentor_v3.json/master.m3u8?1=1"
                        })
                        console.log("http://61.19.242.59:84/hls/pentor_v3.json/master.m3u8?1=1");
                    }}>pentor start at 20 minute1
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
        console.log('state', state);
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
    }

    function onPause() {
        console.log('onPause()');
    }
}