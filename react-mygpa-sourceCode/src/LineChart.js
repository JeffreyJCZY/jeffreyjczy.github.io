import React from "react";
import { MDBContainer } from "mdbreact";
import { Chart } from 'chart.js/auto';
import { Line } from "react-chartjs-2";
import './App.css';

const LineChart = (list) => {
    console.log(list);

    const gpaPerSem = list.gpaPerSem.map((v) => {
        return (parseFloat(v));
    })
    console.log(gpaPerSem);

    return (
        <MDBContainer>
            <Line style={{ width: '70vw', height: '50vh' }}
                data={{
                    labels: list.perSem,
                    datasets: [
                        {
                            label: "GPA each semester",
                            data: gpaPerSem,
                            fill: true,
                            backgroundColor: "rgba(219, 11, 4, .3)",
                            borderColor: "rgba(219, 11, 4)",
                        }
                    ]
                }}
                options={{
                    responsive: true,
                    scales: {
                        y: {
                            min: 2,
                            max: 4
                        }

                    }
                }}
            />


        </MDBContainer>
    );
}

export default LineChart;