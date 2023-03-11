import React from "react";
import { Button } from "antd";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SessionState } from "../session-state/SessionState";

interface SingleResultProps
{
    name: string;
    guess: number;
    actual: number;
}

export function SingleResult(props: React.PropsWithChildren<SingleResultProps>)
{
    const data = [{
        name: props.name, 
        guess: props.guess, 
        actual: props.actual,
        amt: props.guess > props.actual ? props.guess : props.actual
    }];

    return (
        <div>
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="4" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="guess" fill="#8884d8" />
                <Bar dataKey="actual" fill="#82ca9d" />
            </BarChart>
        </div>
    );
}