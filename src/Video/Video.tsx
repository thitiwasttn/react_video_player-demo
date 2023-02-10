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
export function Video() {
    const {id} = useParams();
    const [url, setUrl] = useState<Settings>({
        playAt: -1, url: `https://www.dev.dkups.com/hls/videos/thitiwas111/${id}/hls/master.m3u8?time=?rma`
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
            <div className="wrapper">

                <div className="main-wrapper">
                    <div className="left"></div>
                    <main>
                        <div className="main__video">
                            <div className="main__video-container">
                                {/*<iframe width="560" height="315" src="https://www.youtube.com/embed/_1lj6JaDKCA"*/}
                                {/*        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"*/}
                                {/*        allowFullScreen></iframe>*/}
                                <div className='player-wrapper'>
                                    <ReactPlayer url={url.url}
                                                 width={"740px"}
                                                 height={"460px"}
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
                            <div className="main__description">
                                <p>Steph Curry & DeMarcus Postgame Interview - Game 2 | Warriors vs Raptos | 2019 NBA
                                    Finals</p>
                                <p>290,399 views</p>
                                <a href="#">
                                    <img src={describe_icons} alt="describe-icons"/>
                                </a>
                            </div>
                            <div className="main__sub-description">
                                <a href="#">
                                    <img className="main__name" src={describe_name} alt="name"/>
                                </a>
                                <a href="#">
                                    <img className="main__subscriptions" src={subscribed}
                                         alt="subscriptions"/>
                                </a>
                                <p>Stephen A. Smith gives his best sales pitch for Kevin Durant to sign with the New
                                    York Knicks ahead of 2019 NBA free agency, saying KD would get whatever he desired
                                    courtesy of James Dolan..</p>
                            </div>
                            <div className="main__more">
                                <a href="#">
                                    <p>SHOW MORE</p>
                                </a>
                            </div>
                        </div>
                        <aside className="aside">
                            <div className="aside__top-container">
                                <p>Up next</p>
                                <a href="#">AUTOPLAY</a>
                            </div>
                            <a href="#" className="first-img-aside">
                                <img src={aside_pic} alt="Next video"/>
                            </a>
                            <a href="#">
                                <img className="aside__video" src={aside_pic} alt="Next video"/>
                            </a>
                            <a href="#">
                                <img className="aside__video" src={aside_pic} alt="Next video"/>
                            </a>
                            <a href="#">
                                <img className="aside__video" src={aside_pic} alt="Next video"/>
                            </a>
                            <a href="#">
                                <img className="aside__video" src={aside_pic} alt="Next video"/>
                            </a>
                            <a href="#">
                                <img className="aside__video" src={aside_pic} alt="Next video"/>
                            </a>
                            <a href="#">
                                <img className="aside__video" src={aside_pic} alt="Next video"/>
                            </a>
                            <a href="#">
                                <img className="aside__video" src={aside_pic} alt="Next video"/>
                            </a>
                            <a href="#">
                                <img className="aside__video" src={aside_pic} alt="Next video"/>
                            </a>
                            <a href="#">
                                <img className="aside__video" src={aside_pic} alt="Next video"/>
                            </a>
                            <a href="#">
                                <img className="aside__video" src={aside_pic} alt="Next video"/>
                            </a>
                            <a href="#">
                                <img className="aside__video" src={aside_pic} alt="Next video"/>
                            </a>
                            <a href="#">
                                <img className="aside__video" src={aside_pic} alt="Next video"/>
                            </a>
                            <div className="aside__more">
                                <a href="#">SHOW MORE</a>
                            </div>
                        </aside>

                        <section>
                            <div>
                                <div className="section__comments">
                                    <p>6,806 Comments</p>
                                </div>
                                <div className="section__sort-container">
                                    <a href="#">
                                        <img src={sort} alt="sort comments"/>
                                        <p>SORT BY</p>
                                    </a>
                                </div>
                                <div className="section__profile">
                                    <img src={profile_icon} alt="profile_icon"/>
                                </div>
                                <div className="input__container">
                                    <form>
                                        <input type="text" name="comment" id="comment" value="Add a public comment..."/>
                                    </form>
                                </div>
                            </div>
                            <div>
                                <div className="comments">
                                    <img src={profile_icon} alt="profile icon" width="50"/>
                                    <p className="comments__name">John Snow <a href="#">10 months ago</a></p>
                                    <p className="comments__comment">Stephen A will do anything he possibly can to
                                        get KD on the Knicks 😂.</p>
                                    <div className="likes">
                                        <a href="#">
                                            <img src={like} alt="like"/>
                                        </a>
                                        <p className="comments__text">1K</p>
                                        <a href="#">
                                            <img src={dislike} alt="dislike"/>
                                        </a>
                                        <a href="#" className="comments__text">REPLY</a>
                                    </div>
                                    <a href="#" className="comments_replies">View all 7 replies</a>
                                </div>
                                <div className="comments">
                                    <img src={profile_icon} alt="profile icon" width="50"/>
                                    <p className="comments__name">Arya Stark <a href="#">10 months ago</a></p>
                                    <p className="comments__comment">Stephen A will do anything he possibly can to
                                        get KD on the Knicks 😂.</p>
                                    <div className="likes">
                                        <a href="#">
                                            <img src={like} alt="like"/>
                                        </a>
                                        <p className="comments__text">1K</p>
                                        <a href="#">
                                            <img src={dislike} alt="dislike"/>
                                        </a>
                                        <a href="#" className="comments__text">REPLY</a>
                                    </div>
                                    <a href="#" className="comments_replies">View all 7 replies</a>
                                </div>
                                <div className="comments">
                                    <img src={profile_icon} alt="profile icon" width="50"/>
                                    <p className="comments__name">Tyrion Lannister <a href="#">10 months ago</a></p>
                                    <p className="comments__comment">Stephen A will do anything he possibly can to
                                        get KD on the Knicks 😂.</p>
                                    <div className="likes">
                                        <a href="#">
                                            <img src={like} alt="like"/>
                                        </a>
                                        <p className="comments__text">1K</p>
                                        <a href="#">
                                            <img src={dislike} alt="dislike"/>
                                        </a>
                                        <a href="#" className="comments__text">REPLY</a>
                                    </div>
                                    <a href="#" className="comments_replies">View all 7 replies</a>
                                </div>
                                <div className="comments">
                                    <img src={profile_icon} alt="profile icon" width="50"/>
                                    <p className="comments__name">Mark Snow <a href="#">10 months ago</a></p>
                                    <p className="comments__comment">Stephen A will do anything he possibly can to
                                        get KD on the Knicks 😂.</p>
                                    <div className="likes">
                                        <a href="#">
                                            <img src={like} alt="like"/>
                                        </a>
                                        <p className="comments__text">1K</p>
                                        <a href="#">
                                            <img src={dislike} alt="dislike"/>
                                        </a>
                                        <a href="#" className="comments__text">REPLY</a>
                                    </div>
                                    <a href="#" className="comments_replies">View all 7 replies</a>
                                </div>
                                <div className="comments">
                                    <img src={profile_icon} alt="profile icon" width="50"/>
                                    <p className="comments__name">Lord Varys <a href="#">10 months ago</a></p>
                                    <p className="comments__comment">Stephen A will do anything he possibly can to
                                        get KD on the Knicks 😂.</p>
                                    <div className="likes">
                                        <a href="#">
                                            <img src={like} alt="like"/>
                                        </a>
                                        <p className="comments__text">1K</p>
                                        <a href="#">
                                            <img src={dislike} alt="dislike"/>
                                        </a>
                                        <a href="#" className="comments__text">REPLY</a>
                                    </div>
                                    <a href="#" className="comments_replies">View all 7 replies</a>
                                </div>
                            </div>
                        </section>

                    </main>
                </div>
            </div>
        </>
)
}