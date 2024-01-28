import PropTypes from 'prop-types';
import numeral from 'numeral';
import {
    Box, Card, CardContent, CardHeader, Stack, Typography, useMediaQuery
} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {Chart} from '@/components/chart';
import {useEffect, useMemo, useState} from "react";

const useChartOptions = (labels, miners) => {
    const theme = useTheme();

    return {
        chart: {
            background: 'transparent'
        },

        colors: [theme.palette.primary.main, theme.palette.info.dark, theme.palette.success.main], dataLabels: {
            enabled: false
        }, grid: {
            padding: {
                top: 0, right: 0, bottom: 0, left: 0
            }
        }, labels, legend: {
            show: false
        }, plotOptions: {
            polarArea: {
                rings: {
                    strokeWidth: 0
                }, spokes: {
                    strokeWidth: 0
                },
            }, pie: {
                expandOnClick: true
            }, radialBar: {
                dataLabels: {
                    show: false
                }, hollow: {
                    size: '100%'
                }
            }
        }, states: {
            active: {
                filter: {
                    type: 'none'
                }
            }, hover: {
                filter: {
                    type: 'none'
                }
            }
        }, stroke: {
            width: 0, color: undefined,
        },

        // theme: {
        //     monochrome: {
        //         enabled: true,
        //         shadeTo: 'dark',
        //         shadeIntensity: 0.1,
        //         color: theme.palette.primary.main,
        //     }
        // },
        theme: {
            mode: theme.palette.mode
        }, tooltip: {
            enabled: miners.length > 0 ? true : false, fillSeriesColor: false, y: {
                formatter(value) {
                    return numeral(value).format('$0,0.00');
                }
            }
        }
    };
};

export const CryptoCurrentBalance = ({miners}) => {
    const theme = useTheme();
    const isMdScreen = useMediaQuery(theme.breakpoints.down('lg'));


    const [stats, setStats] = useState({});
    const [chartSeries, setChartSeries] = useState([0]);
    const [labels, setLabels] = useState(['Miners']);


    useEffect(() => {
        let tempStats = {};
        miners.forEach(item => {
            tempStats[item.tariffName] = (tempStats[item.tariffName] ?? 0) + item.deposit;
        });
        setStats(tempStats);
    }, [miners]);

    const extractLabels = (stats) => {
        let tempLabels = [];
        let tempSeries = [];
        for (let key in stats) {
            tempSeries.push(stats[key]);
            tempLabels.push(key);
        }
        if (tempLabels.length === 0) {
            return [[0], ['Miners']];
        }
        return [tempSeries, tempLabels];
    };

    useEffect(() => {
        let [tmpSeries, tmpLabels] = extractLabels(stats);
        setChartSeries(tmpSeries);
        setLabels(tmpLabels);
    }, [stats]);

    const chartOptions = useChartOptions(labels, miners);
    const totalAmount = useMemo(() => {
        return chartSeries.reduce((acc, item) => acc += item, 0)
    }, [chartSeries]);

    const formattedTotalAmount = useMemo(() => {
        return numeral(totalAmount).format('$0,0.00')
    }, [totalAmount]);


    return (<Card>
        <CardHeader
            title="Total investment"
            subheader="Balance across all your miners"
        />
        <CardContent>
            <Stack
                alignItems="center"
                justifyContent={'center'}
                direction="row"
                flexWrap="wrap"
                spacing={3}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center', height: 200, justifyContent: 'center', width: 200
                    }}
                >
                    {miners.length > 0 ? <Chart
                        height={200}
                        options={chartOptions}
                        series={chartSeries}
                        type={'donut'}
                    /> : <Chart
                        height={200}
                        options={chartOptions}
                        series={[1000]}
                        type={'donut'}
                    />}
                </Box>
                <Stack
                    spacing={4}
                    sx={{
                        marginLeft: isMdScreen ? '0!important' : '2rem',
                        flexGrow: '1',
                    }}
                >
                    <Stack spacing={1}>
                        <Typography
                            color="text.secondary"
                            variant="overline"
                        >
                            Total investment sum
                        </Typography>
                        <Typography variant="h4">
                            {formattedTotalAmount}
                        </Typography>
                    </Stack>
                    <Stack spacing={1}>
                        <Typography
                            color="text.secondary"
                            variant="overline"
                        >
                            Mining plans
                        </Typography>
                        <Stack
                            component="ul"
                            spacing={1}
                            sx={{
                                listStyle: 'none', m: 0, p: 0
                            }}
                        >
                            {chartSeries.map((item, index) => {
                                const amount = numeral(item).format('$0,0.00');

                                return (<Stack
                                    alignItems="center"
                                    component="li"
                                    direction="row"
                                    key={index}
                                    spacing={2}
                                >
                                    <Box
                                        sx={{
                                            backgroundColor: chartOptions.colors[index],
                                            borderRadius: '4px',
                                            height: 16,
                                            width: 16
                                        }}
                                    />
                                    <Typography
                                        sx={{flexGrow: 1}}
                                        variant="subtitle2"
                                    >
                                        {labels[index]}
                                    </Typography>
                                    <Typography
                                        color="text.secondary"
                                        variant="subtitle2"
                                    >
                                        {amount}
                                    </Typography>
                                </Stack>);
                            })}
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </CardContent>
        {/*<Divider/>*/}
        {/*<CardActions>*/}
        {/*    /!*<Button*!/*/}
        {/*    /!*    color="inherit"*!/*/}
        {/*    /!*    endIcon={(*!/*/}
        {/*    /!*        <SvgIcon fontSize="small">*!/*/}
        {/*    /!*            <TrendUp02Icon/>*!/*/}
        {/*    /!*        </SvgIcon>*!/*/}
        {/*    /!*    )}*!/*/}
        {/*    /!*    size="small"*!/*/}
        {/*    /!*>*!/*/}
        {/*    /!*    Add funds*!/*/}
        {/*    /!*</Button>*!/*/}
        {/*    /!*<Button*!/*/}
        {/*    /!*    color="inherit"*!/*/}
        {/*    /!*    endIcon={(*!/*/}
        {/*    /!*        <SvgIcon fontSize="small">*!/*/}
        {/*    /!*            <TrendDown02Icon/>*!/*/}
        {/*    /!*        </SvgIcon>*!/*/}
        {/*    /!*    )}*!/*/}
        {/*    /!*    size="small"*!/*/}
        {/*    /!*>*!/*/}
        {/*        Transfer funds*/}
        {/*    </Button>*/}
        {/*</CardActions>*/}
    </Card>);
};

CryptoCurrentBalance.propTypes = {
    chartSeries: PropTypes.array.isRequired, labels: PropTypes.array.isRequired
};
