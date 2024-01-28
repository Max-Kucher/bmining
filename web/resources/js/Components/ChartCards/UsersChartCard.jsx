import {Box, Card, CardContent, CardHeader, Typography} from "@mui/material";
import {Chart} from "@/Components/chart";
import numeral from "numeral";
import {useTheme} from "@mui/material/styles";
import {usePage} from "@inertiajs/react";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function UsersChartCard({users, usersCount, ...props}) {
    const theme = useTheme();
    const chartSeries = usersCount.count;
    const labels = usersCount.labels.map(item => (capitalizeFirstLetter(item)));
    const chartOptions = {
        chart: {
            background: 'transparent', stacked: false, toolbar: {
                show: false
            }
        }, colors: [
            theme.palette.primary.dark,
            theme.palette.warning.dark,
            theme.palette.success.dark,
            theme.palette.info.dark,
            theme.palette.neutral[700]
        ], dataLabels: {
            enabled: false
        }, fill: {
            opacity: 1, type: 'solid'
        }, labels, legend: {
            show: false
        }, stroke: {
            colors: [theme.palette.background.paper], width: 1
        }, theme: {
            mode: theme.palette.mode
        }, tooltip: {
            fillSeriesColor: false
        }
    };


    return (<Card sx={{
        ...props.sx
    }}>
        <CardHeader title="Users"/>
        <CardContent>
            <Chart
                height={260}
                options={chartOptions}
                series={chartSeries}
                type="donut"
            />
            {chartSeries.map((item, index) => {
                const amount = numeral(item).format('0,0');

                return (<Box
                    key={index}
                    sx={{
                        alignItems: 'center', display: 'flex', p: 1
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: chartOptions.colors[index],
                            borderRadius: '50%',
                            height: 8,
                            width: 8
                        }}
                    />
                    <Typography
                        sx={{ml: 2}}
                        variant="subtitle2"
                    >
                        {labels[index]}
                    </Typography>
                    <Box sx={{flexGrow: 1}}/>
                    <Typography
                        color="text.secondary"
                        variant="subtitle2"
                    >
                        {amount}
                    </Typography>
                </Box>);
            })}
        </CardContent>
    </Card>);
}
