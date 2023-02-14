import React, {useState} from 'react'
import {uploadVideo} from "../VideoService";
import {useNavigate} from "react-router-dom";

const homepage = process.env.PUBLIC_URL;

export function UploadVideo() {
    const [file, setFile] = useState<File>()
    const [name, setName] = useState<string>("")
    const [isLoad, setIsLoad] = useState<boolean>(false)
    const [l480, setL480] = useState<number>(0)
    const [l720, setL720] = useState<number>(0)
    const [l1080, setL1080] = useState<number>(0)
    const navigateFunction = useNavigate();
    return (
        <>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-6 mt-5"}>
                        <div className="input-group mb-3">
                            <label className="input-group-text" htmlFor="inputGroupFile01">Upload</label>
                            <input type="file" className="form-control" id="inputGroupFile01" accept={"video/mp4"}
                                   onChange={function (event) {
                                       const files = event.target.files;
                                       if (files && files.length !== 0) {
                                           const file1 = files[0];
                                           setFile(file1)
                                       }
                                   }}
                            />
                        </div>
                    </div>
                    <div className={"col-6 mt-5"}>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">ชื่อ</span>
                            <input type="text" className="form-control" placeholder="name" aria-label="Username"
                                   value={name}
                                   onChange={function (e) {
                                       const value = e.currentTarget.value;
                                       setName(value);
                                   }}
                                   aria-describedby="basic-addon1"/>
                        </div>

                    </div>
                    <div className={"col-4 mt-5"}>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">480 bit (Mbps)</span>
                            <input type="number" className="form-control" placeholder="l480" aria-label="Username"
                                   value={l480}
                                   onChange={function (e) {
                                       const value = Number(e.currentTarget.value);
                                       if (value !== 0) {
                                           setL480(value)
                                       }
                                   }}
                                   aria-describedby="basic-addon1"/>
                        </div>

                    </div>
                    <div className={"col-4 mt-5"}>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">720 bit (Mbps)</span>
                            <input type="text" className="form-control" placeholder="l720" aria-label="Username"
                                   value={l720}
                                   onChange={function (e) {
                                       const value = Number(e.currentTarget.value);
                                       if (value !== 0) {
                                           setL720(value)
                                       }
                                   }}
                                   aria-describedby="basic-addon1"/>
                        </div>

                    </div>

                    <div className={"col-4 mt-5"}>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">1080 bit (Mbps)</span>
                            <input type="text" className="form-control" placeholder="l1080" aria-label="Username"
                                   value={l1080}
                                   onChange={function (e) {
                                       const value = Number(e.currentTarget.value);
                                       if (value !== 0) {
                                           setL1080(value)
                                       }
                                   }}
                                   aria-describedby="basic-addon1"/>
                        </div>

                    </div>
                    <div className={"col mt-1"}>
                        <button className={"btn btn-success"}
                            // disabled={!file && !name}
                                onClick={function () {
                                    setIsLoad(true);
                                    /*setTimeout(function () {
                                        alert('upload success')
                                        navigateFunction(`${homepage}/`)
                                    }, 5000)*/

                                    uploadVideo(file,
                                        name,
                                        (l480 === 0 ? undefined : l480 * 1000000) + "",
                                        (l720 === 0 ? undefined : l720 * 1000000) + "",
                                        (l1080 === 0 ? undefined : l1080 * 1000000) + "").then(value => {
                                        const data = value.data;
                                        alert('upload success')
                                        navigateFunction(`${homepage}/`)
                                    }).catch(reason => {
                                        alert('upload error')
                                        setIsLoad(false);
                                    })
                                }}
                        >
                            submit
                        </button>
                    </div>

                    <div className={"row"} hidden={!isLoad}>
                        <div className={"col-12 mt-1 text-center"}>
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <div className="spinner-border text-secondary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <div className="spinner-border text-success" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <div className="spinner-border text-danger" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <div className="spinner-border text-warning" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <div className="spinner-border text-info" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <div className="spinner-border text-light" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <div className="spinner-border text-dark" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}