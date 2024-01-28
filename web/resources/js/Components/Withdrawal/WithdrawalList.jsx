import {
    Box,
    Card,
    CardHeader,
    Divider, FormHelperText,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Tabs,
    Typography
} from "@mui/material";
import {format, parseISO} from "date-fns";
import numeral from "numeral";
import {Link} from "react-router-dom";
import {SeverityPill} from "@/Components/severity-pill";
import {useApiRequest} from "@/api/helper";
import React, {useEffect} from "react";

const statusMap = {
    paid: 'success', pending: 'warning', canceled: 'error'
};
const amountMap = {
    paid: 'success', pending: 'orange', canceled: 'error'
};

export function WithdrawalList(
    {
        items = [],
        updateList = () => {
        },
        actionsHandler = () => {
        },
        errors = {},
    }
) {

    return (<Card>
        <CardHeader
            title="Latest withdrawals"
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
        <Box sx={{
            overflow: 'auto',
        }}>
            <Table>
                <TableBody sx={{
                    overflow: 'auto',
                }}>
                    {items.length === 0 ? <TableRow
                        hover
                        key={'emptyList'}
                    >
                        <TableCell colSpan={7}>
                            <Typography p={1} textAlign={'center'} variant={'body2'}>Empty</Typography>
                        </TableCell>
                    </TableRow> : null}

                    {items.map((item) => {
                        const parsedDate = parseISO(item.created_at);
                        const createdAtMonth = format(parsedDate, 'LLL').toUpperCase();
                        const createdAtDay = format(parsedDate, 'd');
                        const statusColor = statusMap[item.state];
                        const type = item.state === 'paid' ? 'Payment received' : 'Payment sent';
                        const amount = numeral(item.sum).format('$0,0.00');
                        const amountColor = amountMap[item.state];

                        return (<TableRow
                            key={item.id}
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
                                    <Typography variant="body2" sx={{
                                        marginBottom: '0.5rem',
                                    }}>
                                        {item.type === 'btc' ? 'BTC' : 'CARD'}
                                    </Typography>
                                    <SeverityPill color={'info'} variant="subtitle2">
                                        {item.address}
                                    </SeverityPill>
                                </div>
                            </TableCell>
                            <TableCell>
                                <SeverityPill color={statusColor}>
                                    {item.state}
                                </SeverityPill>
                            </TableCell>
                            <TableCell width={180}>
                                <Typography
                                    variant="subtitle2"
                                >
                                    {amount ?? 'undefined'}
                                </Typography>
                            </TableCell>
                            <TableCell width={180}>
                                {actionsHandler(item)}
                            </TableCell>
                        </TableRow>);
                    })}
                </TableBody>
            </Table>
        </Box>

        {Object.keys(errors).length > 0 ? <>
            <FormHelperText sx={{textAlign: 'center', padding: 1}}
                            error={errors.error ?? false}>{errors.error ?? false}</FormHelperText>
        </> : null}

    </Card>);
};
