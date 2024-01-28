import {useTheme} from "@mui/material/styles";
import {Box, Grid, Typography} from "@mui/material";
import {Chart} from "@/Components/chart";
import numeral from "numeral";
import {useEffect, useState} from "react";

const genChartOptions = (labels, theme) => {

    return {
        chart: {
            background: 'transparent'
        },
        colors: [theme.palette.primary.main, theme.palette.warning.main, theme.palette.info.main],
        labels,
        plotOptions: {
            radialBar: {
                track: {
                    background: theme.palette.mode === 'dark' ? theme.palette.neutral[800] : theme.palette.neutral[100]
                }, dataLabels: {
                    name: {
                        color: theme.palette.text.primary
                    }, value: {
                        color: theme.palette.text.primary
                    }
                }
            }
        },
        states: {
            active: {
                filter: {
                    type: 'none'
                }
            }, hover: {
                filter: {
                    type: 'none'
                }
            }
        },
        theme: {
            mode: theme.palette.mode
        }
    };
};

export function ManagerSalesChart({
                                      values = {todayLeads: 0, todaySales: 0}
                                  }) {
    const [chartSeries, setChartSeries] = useState([]);
    const [labels, setLabels] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        setChartSeries([
            Math.round(values.todayLeads / values.todaySales * 100),
            Math.round(values.todayLeads / values.todayLeads * 100)
        ]);
        setLabels(['Today leads', 'Today sales',]);
    }, []);
    return (<>
        <Grid containers>
            <Grid item>
                <Chart
                    height={300}
                    options={genChartOptions(labels, theme)}
                    series={chartSeries}
                    type="radialBar"
                />
            </Grid>
            <Grid item>
                {(Object.values(values)).map((item, index) => {
                    // const amount = numeral(item.value).format('0,0');

                    return (<Box
                        key={index}
                        sx={{
                            alignItems: 'center', display: 'flex', p: 1
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: genChartOptions(labels, theme).colors[index],
                                borderRadius: '50%',
                                height: 8,
                                width: 8
                            }}
                        />
                        <Typography
                            sx={{ml: 2}}
                            variant="subtitle2"
                        >
                            {item.title}
                        </Typography>
                        <Box sx={{flexGrow: 1}}/>
                        <Typography
                            color="text.secondary"
                            variant="subtitle2"
                        >
                            {item.value}
                        </Typography>
                    </Box>);
                })}
            </Grid>
        </Grid>
    </>);
}
