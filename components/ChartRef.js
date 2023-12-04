import Chart from 'chart.js/auto';
import { useRef, useEffect } from 'react';


export default function ChartRef() {
    const canvasEl = useRef(null);

    const colors = {
        purple: {
        default: "rgba(67, 197, 70, 1)",
        half: "rgba(67, 197, 70, 0.8)",
        quarter: "rgba(67, 197, 70, 0.4)",
        zero: "rgba(67, 197, 70, 0)"
        },
        indigo: {
        default: "rgba(80, 102, 120, 1)",
        quarter: "rgba(80, 102, 120, 0.4)"
        }
    };

    useEffect(() => {
        const ctx = canvasEl.current.getContext("2d");
        // const ctx = document.getElementById("myChart");

        const gradient = ctx.createLinearGradient(0, 16, 0, 600);
        gradient.addColorStop(0, colors.purple.half);
        gradient.addColorStop(0.65, colors.purple.quarter);
        gradient.addColorStop(1, colors.purple.zero);

        const weight = [260.0, 260.2, 260, 235, 220,180,180, 180, 170, 160, 160, 140, 140, 140, 140, 50];

        const labels = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "", 
        "",
        "",
        "",
        "", 
        "",
        "",
        ];
        const data = {
        labels: labels,
        datasets: [
            {
            backgroundColor: gradient,
            label: "",
            data: weight,
            fill: true,
            borderWidth: 2,
            borderColor: colors.purple.default,
            lineTension: 0.2,
            pointBackgroundColor: colors.purple.default,
            pointRadius: 3
            }
        ]
        };
        const config = {
        type: "bar",
        data: data,
        options: {
            scaleShowVerticalLines: false,
            responsive: true, 
            maintainAspectRatio: false, 
            plugins: {
                legend: {
                    display: false,
                }, 
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                    },
                    y: {
                        display: false, // Hide y-axis
                    },
                },
        },
        
        };
        const myLineChart = new Chart(ctx, config);

        return function cleanup() {
        myLineChart.destroy();
        };
    });
    return (
        <div className='relative h-[20vh] w-[15vw]'>
        <canvas id="myChart" ref={canvasEl} height="600" />
        </div>
    )
}