import {Box, Card, CardContent, CardHeader} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {Chart} from "@/Components/chart";
import {useContext, useState} from "react";
import {MinerContext} from "@/contexts/minerContext";


const useChartOptions = () => {
    const theme = useTheme();

    return {
        points: [{
            x: new Date('01 Dec 2017').getTime(),
            y: 8607.55,
            marker: {
                size: 8,
                fillColor: '#fff',
                strokeColor: 'red',
                radius: 2,
                cssClass: 'apexcharts-custom-class'
            },
            label: {
                borderColor: '#FF4560',
                offsetY: 0,
                style: {
                    color: '#fff',
                    background: '#FF4560',
                },

                text: 'Point Annotation',
            }
        }],
        chart: {
            background: 'transparent',
            toolbar: {
                show: false
            }
        },
        colors: [
            theme.palette.primary.main,
            theme.palette.warning.main
        ],
        dataLabels: {
            enabled: false
        },
        fill: {
            gradient: {
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 100]
            },
            type: 'gradient'
        },
        grid: {
            borderColor: theme.palette.divider,
            strokeDashArray: [2, 3]
        },
        stroke: {
            width: 2
        },
        theme: {
            mode: theme.palette.mode
        },
        forecastDataPoints: {
            count: 9,
            strokeWidth: 3,
        },
        xaxis: {
            type: 'datetime',
            axisTicks: {
                show: false
            },
            axisBorder: {
                show: false
            },
            categories: [
                '01/01/2021',
                '01/01/2022',
                (new Date()).toLocaleDateString(),
                '01/01/2024',
                '01/01/2025',
                '01/01/2026',
                '01/01/2027',
                '01/01/2028',
                '01/01/2029',
                '01/01/2030',
                '01/01/2031',
                '01/01/2032'
            ],
            tickAmount: 5
        },
    };
};

export const CryptoRate = () => {
    const minerContext = useContext(MinerContext);
    const chartOptions = useChartOptions();
    const [chartSeries, setChartSeries] = useState([
        {
            name: 'BTC',
            data: [1023, 17345, 63453, 23345, 30345, 40345, 59345, 87345, 93345, 95345, 102345, 114345]
        },
    ]);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexFlow: 'column nowrap',
                // backgroundColor: (theme) => theme.palette.mode === 'dark'
                //     ? 'neutral.800'
                //     : 'neutral.100',
                // p: 3
            }}
        >
            <h2>You profit per day: 1123213</h2>
            <h2>You profit per month: 1123213</h2>
            <h2>You profit per year: 1123213</h2>
            <div style={{
                overflow: 'hidden',
                borderRadius: '50px',
                position: 'relative',
                zIndex: '11000',
            }}>
                <Chart
                    // height={''}
                    width={'600'}
                    options={chartOptions}
                    series={chartSeries ?? []}
                    type="area"
                />
            </div>
        </Box>
    );
};
