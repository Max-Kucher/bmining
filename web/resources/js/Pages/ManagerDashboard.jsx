import {SalesList} from "@/Components/SalesList";
import {Grid, Stack} from "@mui/material";
import {Seo} from "@/Components/Wrappers/Seo";
import OverviewCounter from "@/Components/Overview/OverviewCounter";
import {Group, GroupAdd, MonetizationOn, PersonAdd, Shop, Shop2, ShoppingCartCheckout} from "@mui/icons-material";
import {useEffect, useState} from "react";
import apiRequest from "@/api/helper";
import {useSelector} from "react-redux";
import {selectToken} from "@/slices/userSlice";

export default function ManagerDashboard({}) {
    const [leadStats, setLeadStats] = useState({
        totalLeads: 0, todayLeads: 0, totalSales: 0, todaySales: 0,
    });

    const token = useSelector(selectToken);

    useEffect(() => {
        apiRequest(token).get('/api/manager-dashboard').then((response) => {
            setLeadStats(response.data.leadStats);
        });
    }, []);

    return <>
        <Seo title={'Manager dashboard'}></Seo>
        <Grid container spacing={2}>
            <Grid item xs={12} justifyContent={'space-around'}>
                <h2>My stats</h2>
                <Stack direction={'row'} spacing={3} justifyContent={'space-evenly'}>
                    <OverviewCounter title={'Leads total'} amount={leadStats.totalLeads} Icon={Group}/>
                    <OverviewCounter title={'Leads today'} amount={leadStats.todayLeads} Icon={GroupAdd}/>
                    <OverviewCounter title={'Sales total'} amount={leadStats.totalSales} Icon={MonetizationOn}/>
                    <OverviewCounter title={'Sales today'} amount={leadStats.todaySales} Icon={ShoppingCartCheckout}/>
                </Stack>
            </Grid>
            <Grid item xs={12} lg={6}>
                {/*<ManagerSalesChartCard leadsStat={leadStats}/>*/}
            </Grid>
            <Grid item xs={12} lg={6}>
                {/*<ManagerSalesChart/>*/}
            </Grid>
            <Grid item xs={12}>
                <SalesList/>
            </Grid>
        </Grid>
    </>
}
