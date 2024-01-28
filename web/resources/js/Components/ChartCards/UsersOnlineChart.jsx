import {useTheme} from "@mui/material/styles";
import {Box, Button, Card, CardActions, CardContent, CardHeader, SvgIcon, Tooltip, Typography} from "@mui/material";
import InfoCircleIcon from "@untitled-ui/icons-react/build/esm/InfoCircle";
import {Chart} from "@/Components/chart";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import numeral from "numeral";
import {useMemo} from "react";

export function UsersOnlineChart({onlineCount, commonCount}) {
    const labels = ['Online', 'Offline'];
    const chartSeries = useMemo(() => {
        if (onlineCount === undefined) {
            return [0, 0];
        } else {
            return [onlineCount, commonCount - onlineCount];
        }
    }, [onlineCount, commonCount]);

    const theme = useTheme();
    const chartOptions = {
        chart: {
            background: 'transparent',
            stacked: false,
            toolbar: {
                show: false
            }
        },
        colors: [
            theme.palette.primary.main,
            theme.palette.info.main,
            theme.palette.warning.main
        ],
        dataLabels: {
            enabled: false
        },
        fill: {
            opacity: 1,
            type: 'solid'
        },
        labels,
        legend: {
            labels: {
                colors: theme.palette.text.secondary
            },
            show: true
        },
        plotOptions: {
            pie: {
                expandOnClick: false
            }
        },
        states: {
            active: {
                filter: {
                    type: 'none'
                }
            },
            hover: {
                filter: {
                    type: 'none'
                }
            }
        },
        stroke: {
            width: 0
        },
        theme: {
            mode: theme.palette.mode
        },
        tooltip: {
            fillSeriesColor: false
        }
    };

    return (
        <Card>
            <CardHeader
                action={(
                    <Tooltip title="Users activity">
                        <SvgIcon>
                            <InfoCircleIcon/>
                        </SvgIcon>
                    </Tooltip>
                )}
                title="Users online"
            />
            <CardContent>
                <Chart
                    height={300}
                    options={chartOptions}
                    series={chartSeries ?? []}
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
            {/*<CardActions sx={{justifyContent: 'flex-end'}}>*/}
            {/*    <Button*/}
            {/*        color="inherit"*/}
            {/*        endIcon={(*/}
            {/*            <SvgIcon>*/}
            {/*                <ArrowRightIcon/>*/}
            {/*            </SvgIcon>*/}
            {/*        )}*/}
            {/*        size="small"*/}
            {/*    >*/}
            {/*        See all*/}
            {/*    </Button>*/}
            {/*</CardActions>*/}
        </Card>
    );
}
