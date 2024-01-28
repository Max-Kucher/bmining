import {format, parseISO} from 'date-fns';
import numeral from 'numeral';
import {
    Box, Card, CardHeader, Divider, Tab, Table, TableBody, TableCell, TableRow, Tabs, Typography
} from '@mui/material';
import {SeverityPill} from '@/components/severity-pill';
import {Link} from "react-router-dom";

const statusMap = {
    paid: 'success', pending: 'warning', canceled: 'error'
};
const amountMap = {
    paid: 'success', pending: 'orange', canceled: 'error'
};

export const OverviewOrders = ({orders, isManage = false}) => {

    return (<Card>
        <CardHeader
            title="Latest Orders"
            subheader={isManage ? 'User latest orders' : 'Your latest orders'}
            sx={{pb: 0}}
        />
        <Tabs
            value="all"
            sx={{px: 3}}
        >
            <Tab
                label="Overview"
                value="all"
            />
            {/*<Tab*/}
            {/*    label="Confirmed"*/}
            {/*    value="confirmed"*/}
            {/*/>*/}
            {/*<Tab*/}
            {/*    label="Pending"*/}
            {/*    value="pending"*/}
            {/*/>*/}
        </Tabs>
        <Divider/>
        <Box>
            <Table sx={{minWidth: 600}}>
                <TableBody>
                    {orders.length === 0 ? <TableRow
                        hover

                        key={'emptyList'}
                    >
                        <TableCell colSpan={7}>
                            <Typography p={1} textAlign={'center'} variant={'body2'}>You don't have any orders
                                yet</Typography>
                        </TableCell>
                    </TableRow> : null}

                    {orders.map((order) => {
                        const parsedDate = parseISO(order.created_at);
                        const createdAtMonth = format(parsedDate, 'LLL').toUpperCase();
                        const createdAtDay = format(parsedDate, 'd');
                        const statusColor = statusMap[order.state];
                        const type = order.state === 'paid' ? 'Payment received' : 'Payment sent';
                        const amount = (order.state === 'paid' ? '+' : '+') + ' ' + numeral(order.sum / 100).format('$0,0.00');
                        const amountColor = amountMap[order.state];

                        let orderHref = order.state === 'pending' ? `/orders/${order.id}/processing` : `/orders/${order.id}`;
                        if (isManage === true) {
                            orderHref = `/manage/orders/${order.id}`;
                        }

                        return (<TableRow
                            component={Link}
                            to={orderHref}
                            key={order.id}
                            hover
                            sx={{'&:last-child td, &:last-child th': {border: 0}, textDecoration: 'none'}}
                        >
                            <TableCell width={100}>
                                <Box
                                    title={format(parsedDate, 'yyyy-MM-dd')}
                                    sx={{
                                        p: 1,
                                        backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.100',
                                        borderRadius: 2,
                                        maxWidth: 'fit-content'
                                    }}
                                >
                                    <Typography
                                        align="center"
                                        color="text.primary"
                                        variant="caption"
                                    >
                                        {createdAtMonth}
                                    </Typography>
                                    <Typography
                                        align="center"
                                        color="text.primary"
                                        variant="h6"
                                    >
                                        {createdAtDay}
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <div>
                                    <Typography variant="subtitle2">
                                        {order.sender}
                                    </Typography>
                                    <Typography
                                        color="text.secondary"
                                        variant="body2"
                                    >
                                        {order.description}
                                    </Typography>
                                </div>
                            </TableCell>
                            <TableCell>
                                <SeverityPill color={statusColor}>
                                    {order.state}
                                </SeverityPill>
                            </TableCell>
                            <TableCell width={180}>
                                <Typography
                                    color={amountColor}
                                    variant="subtitle2"
                                >
                                    {amount}
                                </Typography>
                            </TableCell>
                        </TableRow>);
                    })}
                </TableBody>
            </Table>
        </Box>
    </Card>);
};
