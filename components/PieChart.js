import React, { useEffect, useRef } from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

export default function PieChart({ unavailable, sponsorship, available }) {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        const pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Unavailable Units', 'Available Units', 'Sponsored Units',],
            datasets: [{
            label: 'Dataset 1',
            data: [unavailable, available, sponsorship],
            backgroundColor: [
                '#679D83',
                '#84EAD3',
                '#9DF66C'
            ],
            borderColor: [
                '#679D83',
                '#84EAD3',
                '#9DF66C'
            ],
            borderWidth: 1,
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                    align: 'center', // Aligns the legend to the left when positioned at the bottom
                    labels: {
                      usePointStyle: true, // Changes the legend symbols to circles
                      pointStyle: 'circle', // Explicitly setting the point style to circle
                      padding: 20 // Optional: Adds padding between the legend items
                    }
                },
            title: {
                display: false,
                text: 'Resource Distribution'
            }
            }
        },
        });

        return () => {
        pieChart.destroy();
        };
    }, [unavailable, sponsorship, available]);

    return (
        <div>
        <canvas ref={chartRef} className='w-fit'/>
        </div>
    );
}