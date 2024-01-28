import {Seo} from "@/Components/Wrappers/Seo";
import {UsersChartCard} from "@/Components/ChartCards/UsersChartCard";
import {Grid, Stack} from "@mui/material";
import {UsersOnlineChart} from "@/Components/ChartCards/UsersOnlineChart";
import OverviewCounter from "@/Components/Overview/OverviewCounter";
import {PersonAdd, Shop, Shop2} from "@mui/icons-material";
import {SalesList} from "@/Components/SalesList";
import {useEffect, useState} from "react";
import apiRequest from "@/api/helper";
import {useSelector} from "react-redux";
import {selectToken} from "@/slices/userSlice";

export default function AdminDashboard() {

    const [onlineUsers, setOnlineUsers] = useState(0);
    const [commonUsers, setCommonUsers] = useState(0);
    const [minersToday, setMinersToday] = useState(0);
    const [usersToday, setUsersToday] = useState(0);
    const [ordersToday, setOrdersToday] = useState(0);
    const [usersCount, setUsersCount] = useState({
        count: [],
        labels: [],
    });
    const token = useSelector(selectToken);

    useEffect(() => {
        apiRequest(token).get('/api/admin-dashboard').then((response) => {
            setOnlineUsers(response.data.onlineUsers);
            setCommonUsers(response.data.commonUsers);
            setMinersToday(response.data.runningMinersToday);
            setUsersToday(response.data.registeredUsersToday);
            setOrdersToday(response.data.ordersToday);
            setUsersCount(response.data.usersCounts);
        });
    }, []);

    return (<>
        <Seo title={'Admin Dashboard'}/>

        <Grid container spacing={4}>
            <Grid item xs={12} justifyContent={'space-around'}>
                <Stack direction={'row'} spacing={3} justifyContent={'space-evenly'}>
                    <OverviewCounter title={'Purchased miners today'} amount={minersToday} Icon={Shop}/>
                    <OverviewCounter title={'Registered today'} amount={usersToday} Icon={PersonAdd}/>
                    <OverviewCounter title={'Created orders today'} amount={ordersToday} Icon={Shop2}/>
                </Stack>
            </Grid>

            <Grid item xs={12} md={8}>
                <UsersChartCard
                    usersCount={usersCount}
                    sx={{
                        height: '100%',
                    }}/>
            </Grid>
            <Grid item xs={12} md={4}>
                <UsersOnlineChart onlineCount={onlineUsers} commonCount={commonUsers}/>
            </Grid>
            <Grid item xs={12}>
                <SalesList/>
            </Grid>

        </Grid>
    </>);
}
