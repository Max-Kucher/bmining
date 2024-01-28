import BlockWrapper from "@/Components/Wrappers/BlockWrapper";
import {ManagerSalesChart} from "@/Charts/ManagerSalesChart";
import {useTheme} from "@mui/material/styles";
import {useEffect, useState} from "react";

export function ManagerSalesChartCard({leadsStat}) {
    const [values, setValues] = useState({
        total: 0,
        sales: 0,
        startedLeads: 0,
    });

    useEffect(() => {
        setValues({
            totalLeads: {label: "Total leads", value: leadsStat.totalLeads},
            todayLeads: {label: "Today leads", value: leadsStat.todayLeads},
            totalSales: {label: "Total sales", value: leadsStat.totalSales},
            todaySales: {label: "Today sales", value: leadsStat.todaySales},
        });
    }, [leadsStat])
    return (<BlockWrapper>
        <ManagerSalesChart values={values}/>
    </BlockWrapper>);
}
