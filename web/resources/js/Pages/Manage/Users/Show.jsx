import {useCallback, useEffect, useState} from 'react';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import {
    Avatar, Box, Button, Chip, Container, Divider, Stack, SvgIcon, Tab, Tabs, Typography, Unstable_Grid2 as Grid
} from '@mui/material';
import {Link} from '@inertiajs/react'
import {Seo} from '@/Components/seo';
import {useMounted} from '@/hooks/use-mounted';
import {usePageView} from '@/hooks/use-page-view';
import {CustomerBasicDetails} from "@/Pages/Manage/Users/Parts/CustomerBasicDetails";
import {getInitials} from '@/utils/get-initials';
import {manageUserApi} from "@/api/apiMain/manageUsersApi";
import {CommentsList} from "@/Components/CommentsList";
import {OverviewOrders} from "@/Components/Overview/OverviewOrders";
import {MinersTable} from "@/Components/Tables/MinersTable";
import {AddBox, VerifiedUser} from "@mui/icons-material";
import {AddNewTaskDialog} from "@/Components/Dialogs/AddNewTaskDialog";
import {CustomerTasks} from "@/Components/CustomerTasks";
import {ChangeManagerDialog} from "@/Components/Dialogs/ChangeManagerDialog";
import BlockWrapper from "@/Components/Wrappers/BlockWrapper";
import {useSelector} from "react-redux";
import {selectPermissions, selectToken} from "@/slices/userSlice";
import {useParams} from "react-router";
import {RouterLink} from "@/Components/router-link";
import toast from "react-hot-toast";
import {NotAllowed} from "@/Components/NotAllowed";
import {WithdrawalsTab} from "@/Pages/Manage/Users/Tabs/WithdrawalsTab";

const tabs = [
    {label: 'Details', value: 'details'},
    {label: 'Tasks', value: 'tasks'},
    {label: 'Withdrawals', value: 'withdrawals'},
    // {label: 'Logs', value: 'logs'}
];

const Show = () => {
    const [stateUpdated, setStateUpdated] = useState(false);
    const [currentTab, setCurrentTab] = useState('details');

    const isMounted = useMounted();
    const [customer, setCustomer] = useState(null);
    const [showTaskDialog, setShowTaskDialog] = useState(false);
    const [showManagerDialog, setShowManagerDialog] = useState(false);
    const token = useSelector(selectToken);
    const perms = useSelector(selectPermissions);

    const openTaskDialog = () => {
        setShowTaskDialog(true);
    };

    const closeDialog = () => {
        setShowTaskDialog(false);
    };

    const openManagerDialog = () => {
        setShowManagerDialog(true);
    };

    const closeManagerDialog = () => {
        setShowManagerDialog(false);
    };
    const [notAllowed, setNotAllowed] = useState(false);


    let {id} = useParams();
    const handleCustomerGet = useCallback(async () => {
        try {
            let response = await manageUserApi.getUser(token, id);
            if (response.status === 200) {
                response.data.user.comments = response.data.comments;
                response.data.user.orders = response.data.orders;
                response.data.user.miners = response.data.miners;
                response.data.user.statuses = response.data.statuses;
                response.data.user.manager = response.data.manager;
                if (isMounted()) {
                    setCustomer(response.data.user);
                }
            } else if (response.status === 403) {
                setNotAllowed(true);
            } else {
                toast.error('Request error');
            }
        } catch (err) {
            console.error(err);
        }
    }, [isMounted, stateUpdated]);


    useEffect(() => {
        handleCustomerGet();
    }, []);

    usePageView();

    const updateState = () => {
        handleCustomerGet();
    };

    const handleTabsChange = useCallback((event, value) => {
        setCurrentTab(value);
    }, []);

    if (!customer) {
        return <>
            <BlockWrapper sx={{
                justifyContent: 'center',
            }}>
                <NotAllowed/>
            </BlockWrapper>
        </>;
    }

    return (<>


        <Seo title="Dashboard: Customer Details"/>
        <Box
            component="main"
            sx={{
                flexGrow: 1, py: 8
            }}
        >
            <Container maxWidth="xl">

                <>
                    <AddNewTaskDialog userId={customer.id} open={showTaskDialog} onClose={closeDialog}/>
                    <ChangeManagerDialog userId={customer.id} open={showManagerDialog}
                                         onClose={closeManagerDialog}/>
                    <Stack spacing={4}>
                        <Stack spacing={4}>
                            <div>
                                <Box
                                    color="text.primary"
                                    component={RouterLink}
                                    to={route('manage.my-users')}
                                    sx={{
                                        alignItems: 'center', display: 'inline-flex'
                                    }}
                                    underline="hover"
                                >
                                    <SvgIcon sx={{mr: 1}}>
                                        <ArrowLeftIcon/>
                                    </SvgIcon>
                                    <Typography variant="subtitle2">
                                        My users
                                    </Typography>
                                </Box>
                            </div>
                            <Stack
                                alignItems="flex-start"
                                direction={{
                                    xs: 'column', md: 'row'
                                }}
                                justifyContent="space-between"
                                spacing={4}
                            >

                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={2}
                                >
                                    <Avatar
                                        src={customer.avatar}
                                        sx={{
                                            height: 64, width: 64
                                        }}
                                    >
                                        {getInitials(customer.name)}
                                    </Avatar>
                                    <Stack spacing={1}>
                                        <Typography variant="h4">
                                            {customer.email}
                                        </Typography>
                                        <Stack
                                            alignItems="center"
                                            direction="row"
                                            spacing={1}
                                        >
                                            <Typography variant="subtitle2">
                                                user_id:
                                            </Typography>
                                            <Chip
                                                label={customer.id}
                                                size="small"
                                            />
                                        </Stack>
                                        <div>
                                            <b>Balance: {customer.balance} USD</b>
                                        </div>
                                    </Stack>

                                </Stack>
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={2}
                                >
                                    <Button
                                        color="inherit"
                                        component={Link}
                                        endIcon={(<SvgIcon>
                                            <Edit02Icon/>
                                        </SvgIcon>)}
                                        href={route('manage.users.edit', {id: customer.id})}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={openManagerDialog}
                                        endIcon={(<SvgIcon>
                                            <VerifiedUser/>
                                        </SvgIcon>)}
                                        variant="contained"
                                    >
                                        Pass to manager
                                    </Button>
                                    <Button
                                        onClick={openTaskDialog}
                                        endIcon={(<SvgIcon>
                                            <AddBox/>
                                        </SvgIcon>)}
                                        variant="contained"
                                    >
                                        Add new task
                                    </Button>
                                </Stack>
                            </Stack>
                            <div>
                                <Tabs
                                    textColor='primary.dark'
                                    indicatorColor='primary'
                                    onChange={handleTabsChange}
                                    scrollButtons="auto"
                                    sx={{mt: 3}}
                                    value={currentTab}
                                    variant="scrollable"
                                >
                                    {tabs.map((tab) => (<Tab
                                        key={tab.value}
                                        label={tab.label}
                                        value={tab.value}
                                    />))}
                                </Tabs>
                                <Divider/>
                            </div>
                        </Stack>
                        {currentTab === 'details' && (<div>
                            <Grid
                                container
                                spacing={4}
                            >
                                <Grid
                                    xs={12}
                                    lg={4}
                                >
                                    <Stack spacing={3}>
                                        <CustomerBasicDetails customer={customer}/>
                                        <BlockWrapper title={'User manager'} subtitle={'Handling by:'}>
                                            {customer.manager !== null ?
                                                <Stack direction={'row'} spacing={2}>
                                                    <Avatar
                                                        src={customer.manager.avatar}
                                                        sx={{cursor: 'pointer'}}

                                                    >
                                                        {getInitials(customer.manager.name + " " + customer.manager.surname)}
                                                    </Avatar>
                                                    <Link
                                                        href={route('manage.users.show', {id: customer.manager.id})}
                                                        color="text.primary"
                                                        sx={{cursor: 'pointer'}}
                                                        underline="none"
                                                        variant="subtitle2"
                                                    >
                                                        {customer.manager.name + " " + customer.manager.surname}
                                                    </Link>
                                                </Stack>
                                                :
                                                <h4 style={{textAlign: 'center'}}>This user is not handled by any
                                                    manager.
                                                </h4>
                                            }
                                        </BlockWrapper>
                                    </Stack>
                                </Grid>
                                <Grid
                                    xs={12}
                                    lg={8}
                                >
                                    <Stack spacing={4}>
                                        {<CommentsList comments={customer.comments} customerId={customer.id}
                                                       onSuccess={updateState}
                                        />}
                                        <MinersTable user={customer} userId={customer.id} isManage={true}
                                                     miners={customer.miners}/>
                                        <OverviewOrders isManage={true} orders={customer.orders}/>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </div>)}
                        {currentTab === 'tasks' && <CustomerTasks userId={customer.id}/>}
                        {currentTab === 'withdrawals' && <WithdrawalsTab targetUser={customer}/>}
                        {/*{currentTab === 'logs' && <CustomerLogs logs={logs}/>}*/}
                    </Stack>
                </>
            </Container>
        </Box>
    </>);
};

export default Show;

