import numeral from 'numeral';
import {
    Box,
    Card, CardContent,
    CardHeader,
    Divider,
    SvgIcon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import {useContext, useState} from "react";
import {MinersTableActions} from "@/Components/Tables/MinersTableActions";
import {Edit} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {RouterLink} from "@/Components/router-link";

const now = new Date();


const technologyMap = {
    'html-css': '/assets/logos/logo-html.svg',
    'react-js': '/assets/logos/logo-react-js.svg',
    'vue-js': '/assets/logos/logo-vue-js.svg',
    angular: '/assets/logos/logo-angular.svg',
    figma: '/assets/logos/logo-figma.svg',
    sketch: '/assets/logos/logo-sketch.svg'
};


export const MinersTable = ({miners, isManage, userId = null, user = null}) => {
    const [showMinersDialog, setShowMinersDialog] = useState(false);

    const openDialog = () => {
        setShowMinersDialog(!showMinersDialog);
    };
    return (
        <Card>
            <CardHeader
                action={(isManage ? <MinersTableActions user={user} userId={userId}/> : null)}
                title="Latest miners"
            />
            <Divider/>
            <CardContent sx={{
                overflow: 'auto',
            }}>

                <Table sx={{
                    minWidth: 900,
                }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                ID
                            </TableCell>
                            <TableCell>
                                Mining plan
                            </TableCell>
                            <TableCell>
                                Deposit
                            </TableCell>
                            <TableCell>
                                Profit
                            </TableCell>
                            <TableCell>
                                Profit %
                            </TableCell>
                            <TableCell>
                                Running
                            </TableCell>
                            <TableCell>
                                Days left
                            </TableCell>
                            {isManage ? <TableCell>
                                Actions
                            </TableCell> : null}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {miners.length === 0 ?
                            <TableRow
                                hover

                                key={'emptyList'}
                            >
                                <TableCell colSpan={isManage ? 8 : 7}>
                                    <Typography p={2} textAlign={'center'} variant={'body2'}>
                                        {isManage ? "User do not have any miners" : "You don't have purchased miners yet"}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            : null}
                        {miners.map((miner, idx) => {
                            if (idx >= 3) {
                                return;
                            }
                            const deposit = numeral(miner.deposit).format(`${'$'}0,0.00`);
                            const profit = numeral(miner.profit).format(`${'$'}0,0.00`);
                            // const createdAt = format(miner.createdAt, 'dd MMM, yyyy');

                            return (<TableRow
                                hover
                                key={miner.id}
                            >
                                <TableCell title={'Miner id'}>
                                    {miner.id}
                                </TableCell>
                                <TableCell title={'Mining plan name'}>
                                    {miner.tariffName}
                                </TableCell>
                                <TableCell>
                                    {deposit}
                                </TableCell>
                                <TableCell title={'Total profit from miner at the moment'}>
                                    {profit}
                                </TableCell>
                                <TableCell title={'Mining plan profit percent'}>
                                    {miner.profitPercent}
                                </TableCell>
                                <TableCell>
                                    {miner.run ? 'Yes' : 'Stopped'}
                                </TableCell>
                                <TableCell>
                                    {miner.days}
                                </TableCell>
                                {isManage ? <TableCell align={"center"}>
                                    <Box>
                                        <SvgIcon component={RouterLink}
                                                 color={'primary'}
                                                 to={`/manage/miners/${miner.id}/edit`}
                                        >
                                            <Edit/>
                                        </SvgIcon>
                                    </Box>
                                </TableCell> : null}
                            </TableRow>);
                        })}
                    </TableBody>
                </Table>
            </CardContent>

            <Box
                sx={{
                    display: 'flex', justifyContent: 'flex-end', p: 2
                }}
            >
                {/*<Button*/}
                {/*    component={Link}*/}
                {/*    href={route('miners')}*/}
                {/*    color="inherit"*/}
                {/*    endIcon={(<SvgIcon>*/}
                {/*        <ChevronRightIcon/>*/}
                {/*    </SvgIcon>)}*/}
                {/*    size="small"*/}
                {/*>*/}
                {/*    See All*/}
                {/*</Button>*/}
                {/*    TODO: Add see al miners link to table! */}
            </Box>
        </Card>
    );
};
