import BlockWrapper from "@/Components/Wrappers/BlockWrapper";
import {
    Button, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import {DatePicker} from "@mui/x-date-pickers";
import {format, parseISO} from "date-fns";
import toast from "react-hot-toast";
import numeral from "numeral";
import {Link} from "@inertiajs/react";
import apiRequest from "@/api/helper";
import {useSelector} from "react-redux";
import {selectToken} from "@/slices/userSlice";

export function SalesList() {

    const [sales, setSales] = useState([]);

    const [data, setData] = useState({
        start_date: (new Date).toISOString(), end_date: (new Date).toISOString(),
    });
    const handleStartDateChange = (date) => {
        setData({
            ...data, start_date: date.toISOString()
        });
    };
    const handleEndDateChange = (date) => {
        setData({
            ...data, end_date: date.toISOString()
        });
    };

    const setTodayDate = () => {
        setData({
            ...data, start_date: (new Date).toISOString(), end_date: (new Date).toISOString(),
        });
    };
    const token = useSelector(selectToken);
    const getSalesRequest = () => {
        apiRequest(token).post(route('api.manage.sales'), {
            start_date: data.start_date, end_date: data.end_date,
        }).then(response => {
            if (response?.data?.sales) {
                setSales(response.data.sales);
            } else {
                toast.error("Cant' get sales.");
            }
        })
            .catch(e => {
                console.error(e);
                toast.error("Cant' get sales.");
            })
    };

    const submit = (e) => {
        e.preventDefault();
        getSalesRequest();
    };

    useEffect(() => {
        getSalesRequest();
    }, [])

    return (<BlockWrapper>
        <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
                <form onSubmit={submit}>
                    <Stack spacing={2}>
                        <Stack direction={'row'} spacing={1}>
                            <DatePicker
                                ampm={false}
                                inputFormat="dd/MM/yyyy"
                                label="From"
                                onChange={handleStartDateChange}
                                renderInput={(inputProps) => <TextField fullWidth {...inputProps} />}
                                value={typeof data.start_date === 'string' ? parseISO(data.start_date) : data.start_date}
                            />

                        </Stack>
                        <DatePicker
                            ampm={false}
                            inputFormat="dd/MM/yyyy"
                            label="To"
                            onChange={handleEndDateChange}
                            renderInput={(inputProps) => <TextField {...inputProps} />}
                            value={typeof data.end_date === 'string' ? parseISO(data.end_date) : data.end_date}
                        />
                        <div style={{
                            display: 'flex', justifyContent: 'space-between'
                        }}>
                            <Button type={'submit'} variant={'contained'}>Submit</Button>
                            <Button onClick={setTodayDate} variant={'contained'}>Today</Button>
                        </div>
                    </Stack>
                </form>
            </Grid>
            <Grid item xs={12} lg={8}>
                <Stack spacing={1}>
                    <SalesTable sales={sales}/>
                </Stack>
            </Grid>
        </Grid>
    </BlockWrapper>);
}


export const SalesTable = ({sales}) => {

    const [totalSum, setTotalSum] = useState(0);
    const [totalManagerProfit, setTotalManagerProfit] = useState(0);

    useEffect(() => {
        let tempSum = 0;
        let tempManagerProfit = 0;
        for (let item in sales) {
            tempSum += sales[item].sum;
            tempManagerProfit += sales[item].profit;
        }
        setTotalSum(tempSum);
        setTotalManagerProfit(tempManagerProfit);
    }, [sales]);

    return (<Table>
        <TableHead>
            <TableRow>
                <TableCell>
                    ID
                </TableCell>
                <TableCell>
                    Sum
                </TableCell>
                <TableCell>
                    User
                </TableCell>
                <TableCell>
                    Manager
                    <br/>
                    profit
                    <br/>
                    sum
                </TableCell>
                <TableCell>
                    Date
                </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {sales.length === 0 ? <TableRow
                hover
                key={'emptyList'}
            >
                <TableCell colSpan={5}>
                    <Typography p={2} textAlign={'center'} variant={'body2'}>
                        Sales list empty
                    </Typography>
                </TableCell>
            </TableRow> : null}
            {sales.map((sale, idx) => {
                if (idx >= 3) {
                    return;
                }
                const sum = numeral(sale.sum).format(`${'$'}0,0.00`);
                const profit = numeral(sale.profit).format(`${'$'}0,0.00`);
                const date = format(parseISO(sale.created_at), 'dd MMM, yyyy HH:ii');
                // const createdAt = format(sale.createdAt, 'dd MMM, yyyy');

                return (<TableRow
                    hover
                    key={sale.id}
                >
                    <TableCell title={'Sale id'}>
                        {sale.id}
                    </TableCell>
                    <TableCell title={'Sum of sale'}>
                        {sum}
                    </TableCell>
                    <TableCell>
                        <div title={'User link'}>
                            {sale.user === null ? 'User not found' : <Link
                                href={route('manage.users.show', {id: sale.user?.id ?? 0})}>
                                {sale.user?.name ?? 'Undefined user'}
                            </Link>}
                        </div>
                        <span>
                            via
                            </span>
                        <div title={'Manager link'}>
                            {sale.manager === null ? 'User not found' : <Link
                                href={route('manage.users.show', {id: sale.manager?.id ?? 0})}>
                                {sale.manager?.name ?? 'Undefined user'}
                            </Link>}
                        </div>
                    </TableCell>
                    <TableCell title={'Manager profit from sale'}>
                        {profit}
                    </TableCell>
                    <TableCell title={'Date of sale'}>
                        {date}
                    </TableCell>
                </TableRow>);
            })}
            {sales.length > 0 ? <TableRow
                hover
            >
                <TableCell align={'center'} colSpan={3}>
                    <Typography p={2} textAlign={'center'} variant={'h6'}>
                        Total sum: {totalSum}
                    </Typography>
                </TableCell>
                <TableCell align={'center'} colSpan={2}>
                    <Typography p={2} textAlign={'center'} variant={'h6'}>
                        Manager profits: {totalManagerProfit}
                    </Typography>
                </TableCell>
            </TableRow> : null}
        </TableBody>
    </Table>);
}
