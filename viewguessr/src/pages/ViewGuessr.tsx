import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { SessionState } from "../session-state/SessionState";
import { Button, Spin, Input } from "antd"
import { VideoData } from "../session-state/VideoData";

interface ViewGuessrProps {
    state: SessionState
    callback: (updatedState: SessionState) => void
}

const testResult = {title:"Reflux: Sodbrennen loswerden mit der richtigen Ernährung | Die Ernährungs-Docs | NDR",url:"https://www.youtube.com/watch?v=CVkF5bXYFes","description":"Sodbrennen hat jeder von uns mal hin und wieder. Doch was, wenn man ständig mit Reflux zu kämpfen hat wie Bernd P.? Ein brennendes Gefühl hinter dem Brustbein und Heiserkeit sind typische Symptome. Bei Betroffenen gelangt Magensaft in die Speiseröhre. Bernd P. nimmt täglich Medikamente, um die Säure zu neutralisieren, aber über die Jahre kommt es zu Nebenwirkungen. Er will möglichst ohne Tabletten leben - kann Ernährungs-Doc Silja Schäfer ihm mit Ernährungsmedizin dabei helfen?\n\n00:00 - Besuch auf dem Praxisboot\n00:25 - Was ist Reflux?\n00:50 - So kommt es zu Beschwerden\n01:35 - Arbeit als Logopäde\n02:20 - Medikamente und Nebenwirkungen\n03:00 - Reflux messen\n03:45 - Zurück auf dem Praxisboot\n04:25 - Schwere Folgeerkrankungen\n04:45 - Gewicht abnehmen\n06:10 - Ernährungsprotokoll: Frühstück\n07:15 - Clean Eating\n08:20 - Bewegung\n08:45 - Umstellung beginnt\n10:00 - Erste Effekte\n10:35 - Doc auf Hausbesuch\n12:10 - Abschlusscheck\n12:45 - Erfolgreich abgenommen?\n13:30 - Erneute Reflux-Messung\n14:00 - Ausblick\n\nMehr Infos: https://www.ndr.de/sodbrennen120.html\n\nErnährungs-Tipps bei Sodbrennen/Reflux:\nhttps://www.ndr.de/sodbrennen130.html\n\nRezepte bei Sodbrennen/Reflux:\nhttps://www.ndr.de/ratgeber/kochen/rezepte/rezeptdb226.html\n\nCredit: picture alliance / dpa Themendienst | Silvia Marks\n\n#Ernährungsdocs #Reflux #Sodbrennen\n___________________________________________________\nNDR GESUND mit Dr. Wimmer ist ein YouTube-Kanal der NDR Gesundheitsredaktion und Dr. Johannes Wimmer.\n\nMit freundlicher Unterstützung von:\n\nDie Ernährungs-Docs\nhttps://www.ndr.de/e-docs\n\nDie Bewegungs-Docs\nhttps://www.ndr.de/b-docs\n\nVisite\nhttps://www.ndr.de/visite\n___________________________________________________\nUnsere Richtlinien für Kommentare:\nhttps://www.ndr.de/service/technische_hilfe/Die-Kommentarrichtlinien,richtlinien101.html","length":904,views:57133,"creator":"NDR GESUND"}

export function ViewGuessr(props: React.PropsWithChildren<ViewGuessrProps>)
{
    const serverAddress = "https://localhost:6969"
    const defaultVideoData: VideoData = { title: "", url: "", views: 0 }
    const [videoData, setVideoData] = useState(defaultVideoData)
    const [guesses, setGuesses] = useState<number[]>([...props.state.guessedViews])
    const [actualViews, setActualViews] = useState<number[]>([...props.state.actualViews])

    useEffect(() => {
        console.log(`${serverAddress}?seed=${props.state.seed}&index=${props.state.videoNumber}`)
        fetch(`${serverAddress}?seed=${props.state.seed}&index=${props.state.videoNumber}`)
        .then((response) => {
            if(!response.ok) {
                throw new Error(response.status.toString())
            } else {
                return response.json()
            }
        })
        .then((data) => {
            setVideoData({title: data.title, url: data.url, views: data.views})
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])

    const videoDisplay = videoData.url == "" ? (<Spin/>) : (
        <div>
            <iframe src={videoData.url}/>
            <h1>{videoData.title}</h1>
        </div>
        )

    const onClick = () => {
        setActualViews([...props.state.actualViews, videoData.views])
        props.callback({seed: props.state.seed, actualViews: actualViews, guessedViews: guesses, videoNumber: props.state.videoNumber + 1})
    }

    return (
    <div>
        {videoDisplay}
        <Input style={{width: "50%"}} type="number" onChange={(e) => setGuesses([...props.state.guessedViews, parseInt(e.target.value)])}/>
        <Button type="primary" onClick={onClick}>Submit</Button>
    </div>
    );
}