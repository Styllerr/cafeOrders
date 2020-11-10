import React from 'react';
import { Bar } from 'react-chartjs-2';

function Chart({dataReport}) {
    const data = {
        labels: dataReport.labels,
        datasets: [
            {
                label: 'Total orders cost',
                data: dataReport.sum,
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
            }
        ]
    };
    return (
        <div>
            <h2>Summary report</h2>
            <Bar data={data} />
        </div>
    )
}

export default Chart
