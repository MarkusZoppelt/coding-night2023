import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { SessionState } from "../session-state/SessionState";
import { Button, Spin, Input, Modal } from "antd"
import { VideoData } from "../session-state/VideoData";

interface ViewGuessrProps {
    state: SessionState
    callback: (updatedState: SessionState) => void
}

export function ViewGuessr(props: React.PropsWithChildren<ViewGuessrProps>)
{
    const serverAddress = "http://localhost:6969"
    const defaultVideoData: VideoData = { title: "", url: "", views: 0 }
    const [videoData, setVideoData] = useState(defaultVideoData)
    const [guesses, setGuesses] = useState<number[]>([...props.state.guessedViews])
    const [actualViews, setActualViews] = useState<number[]>([...props.state.actualViews])
    const [isResultModalOpen, setIsResultModalOpen] = useState(false)
    const [inputValue, setInputValue] = useState("")

    useEffect(() => {
        const requestUrl = `${serverAddress}?seed=${props.state.seed}&index=${props.state.videoNumber}`
        console.log(requestUrl)
        fetch(requestUrl)
        .then((response) => {
            if(!response.ok) {
                throw new Error(response.status.toString())
            } else {
                console.log("response", response)
                return response.json()
            }
        })
        .then((data) => {
            setVideoData({title: data.title, url: data.url, views: data.views, description: data.description, creator: data.creator})
        })
        .catch((error) => {
            console.log(error)
        })
    }, [props.state])

    const videoDisplay = videoData.url == "" ? (<Spin/>) : (
        <div>
            <iframe src={videoData.url.replace("/watch?v=", "/embed/")} width="800px" height="450px"/>
            <h1>{videoData.title}</h1>
            <h2>by {videoData.creator}</h2>
            <div>description: <br/>{videoData.description}</div>
            <br/>
        </div>
        )

    const onModalClose = () => {
        setIsResultModalOpen(false)
        const updatedSeed = props.state.seed
        const updatedActualViews = actualViews
        const updatedGuesses = guesses
        const updatedVideonumber = props.state.videoNumber + 1
        props.callback({seed: updatedSeed, actualViews: updatedActualViews, guessedViews: updatedGuesses, videoNumber: updatedVideonumber})
        setInputValue("")
        setVideoData(defaultVideoData)
    }
    
    const onClick = () => {
        setActualViews([...props.state.actualViews, videoData.views])
        setIsResultModalOpen(guesses.length > props.state.guessedViews.length)
    }

    return (
    <div>
        {videoDisplay}
        <Modal title="Basic Modal" open={isResultModalOpen} onOk={onModalClose} onCancel={onModalClose}>
            <div>Your guess: {guesses[guesses.length - 1]}</div>
            <div>Actual views: {actualViews[actualViews.length - 1]}</div>
        </Modal>
        <Input value={inputValue} style={{width: "50%"}} type="number" placeholder="Enter Guess" onChange={(e) => {
            setGuesses([...props.state.guessedViews, parseInt(e.target.value)])
            setInputValue(e.target.value)
        }}/>
        <Button type="primary" onClick={onClick}>Submit</Button>
    </div>
    );
}