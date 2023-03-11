import React, { Dispatch, SetStateAction, useState } from "react";
import { Button, Input } from "antd";
import { SessionState } from "../session-state/SessionState";

interface LandingPageProps
{
    state: SessionState;
    callback: (updatedState: SessionState) => void;
}

function GetRandomSeed(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export function LandingPage(props: React.PropsWithChildren<LandingPageProps>)
{
    const seedLength = 8;
    const [input, setInput] = useState('');

    function NewGameHandler() {
        let seed = input != '' ? input : GetRandomSeed(seedLength);
        props.callback({seed : seed, actualViews : [], guessedViews : [], videoNumber : 0, videoData: []});
    }

    return (
        <div>
            <Input size="large" placeholder="(optional) Custom Seed" value={input} onChange={e => { setInput(e.target.value);}}></Input>
            <Button type="primary" onClick={NewGameHandler}>Start New Game</Button>
        </div>
    );
}