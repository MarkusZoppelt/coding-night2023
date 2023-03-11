import React from "react";
import { Button } from "antd";
import { SessionState } from "../session-state/SessionState";
import { SingleResult } from "./SingleResultView";

interface ResultPageProps
{
    state: SessionState;
    callback: (updatedState: SessionState) => void;
}

export function Result(props: React.PropsWithChildren<ResultPageProps>)
{
    function NewGameHandler()
    {
        props.callback({seed : "", actualViews : [], guessedViews : [], videoNumber : 0});
    }

    const results = props.state.guessedViews.map((num) => 
    {
        let index = props.state.guessedViews.indexOf(num)
        let actualViewCount = props.state.actualViews.at(index);
        actualViewCount = actualViewCount ? actualViewCount : 0;
        return (<SingleResult name={index.toString()} guess={num} actual={actualViewCount}/>)
    });

    let total = 0;
    for (let index = 0; index < props.state.guessedViews.length; index++) 
    {
        let guess = props.state.guessedViews.at(index);
        guess = guess ? guess : 0;
        let actual = props.state.actualViews.at(index);
        actual = actual ? actual : 0;
        total += Math.max(guess, actual) - Math.min(guess, actual);    
    }

    return (
        <div>
            {results}
            <p>Total Difference: {total}</p>
            <Button type="primary" onClick={NewGameHandler}>Start New Game</Button>
        </div>
    );
}