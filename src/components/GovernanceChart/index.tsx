import React from "react";
import { LineChart, Line, XAxis, YAxis } from "recharts";

import { InfoContainer } from "../InfoContainer";

import "./styles.scss";

export const GovernanceChart = () => {
    const data = [
        { name: 0, value: 10 },
        { name: 1000, value: 10 + 1 },
        { name: 2000, value: 10 + 2 },
        { name: 3000, value: 10 + 4 },
        { name: 4000, value: 10 + 9 },
    ];

    return (
        <InfoContainer
            title="Governance structure"
            className="governance-chart"
            classNameContent="governance-chart__content"
        >
            <LineChart
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
                <XAxis dataKey="name" />
                <YAxis />
                <Line type="monotone" dot={null} dataKey="value" stroke="red" />
            </LineChart>
        </InfoContainer>
    );
};
