import CurrencyDollarIcon from '@untitled-ui/icons-react/build/esm/CurrencyDollar';
import ReceiptIcon from '@untitled-ui/icons-react/build/esm/Receipt';
import {
    Box, Button, Card, CardHeader, Divider, Stack, SvgIcon, Table, TableBody, TableCell, TableRow, Typography
} from '@mui/material';
import {SeverityPill} from "@/Components/severity-pill";
import {useMemo} from "react";
import {format, parseISO} from "date-fns";

export const OrderInfo = ({order}) => {
    const created_at = useMemo(() => {
        let date = parseISO(order.created_at);
        return format(date, 'yyyy.MM.dd HH:mm');
    }, [order.created_at]);

    return (
        <Card>
            <CardHeader title="Order info"/>
            <Divider/>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle2">
                                Order
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                #{order.id}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle2">
                                Miner plan
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                {order.tariff.name}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle2">
                                Sum (BTC)
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                {order.payment.sum} BTC
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle2">
                                Sum (USD)
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                {(order.payment.sum * order.payment.rate).toFixed(0)} $
                            </Typography>
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle2">
                                State
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <SeverityPill color={'warning'}>
                                {order.state}
                            </SeverityPill>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle2">
                                Created at:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <SeverityPill>
                                {created_at}
                            </SeverityPill>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Card>
    );
};
