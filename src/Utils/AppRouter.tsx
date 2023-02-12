import React from 'react'
import {ListVideo} from "../Video/ListVideo";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import {Video} from "../Video/Video";
import {VideoV2} from "../Video/VideoV2";
import {VideoPage} from "../Video/VideoPage";
import {UploadVideo} from "../Video/Upload/UploadVideo";
const homepage = process.env.PUBLIC_URL;
export function AppRouter() {
    return (
        <>
            <Routes>
                <Route path={`${homepage}/`} element={<ListVideo/>}/>
                <Route path={`${homepage}/test`} element={<VideoPage/>}/>
                <Route path={`${homepage}/upload`} element={<UploadVideo/>}/>
                <Route path={`${homepage}/:id`} element={<VideoV2/>}/>
            </Routes>
        </>
    )
}