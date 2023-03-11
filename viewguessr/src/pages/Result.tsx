import React from "react";
import { Button } from "antd";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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

    return (
        <div>
            {results}
            <Button type="primary" onClick={NewGameHandler}>Start New Game</Button>
        </div>
    );
}