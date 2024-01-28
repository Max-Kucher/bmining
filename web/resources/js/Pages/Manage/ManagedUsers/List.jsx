import {useCallback, useEffect, useMemo, useState} from 'react';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import {Box, Button, Card, Container, Modal, Stack, SvgIcon, Typography} from '@mui/material';
import {Seo} from '@/Components/Wrappers/Seo';
import {useMounted} from '@/hooks/use-mounted';
import {usePageView} from '@/hooks/use-page-view';
import {useSelection} from '@/hooks/use-selection';
import {CustomerListSearch} from '@/sections/dashboard/customer/customer-list-search';
import {UsersListTable} from "@/Components/Lists/UsersListTable";
import {manageUserApi} from "@/api/apiMain/manageUsersApi";
import toast from "react-hot-toast";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import {modalStyle} from "@/Pages/OrderProcessing/CryptoPayment";
import {StatusPaper} from "@/Pages/OrderProcessing/Modals/StatusPaper";
import CheckIcon from "@untitled-ui/icons-react/build/esm/Check";
import {Link, router} from "@inertiajs/react";
import {useSelector} from "react-redux";
import {selectToken} from "@/slices/userSlice";
import apiRequest from "@/api/helper";
import {useNavigate} from "react-router-dom";

const useCustomersSearch = () => {
    const [state, setState] = useState({
        filters: {
            query: undefined, hasAcceptedMarketing: undefined, isProspect: undefined, isReturning: undefined
        }, page: 0, rowsPerPage: 5, sortBy: 'updated_at', sortDir: 'desc'
    });

    const handleFiltersChange = useCallback((filters) => {
        setState((prevState) => ({
            ...prevState, filters
        }));
    }, []);

    const handleSortChange = useCallback((sort) => {
        setState((prevState) => ({
            ...prevState, sortBy: sort.sortBy, sortDir: sort.sortDir
        }));
    }, []);

    const handlePageChange = useCallback((event, page) => {
        setState((prevState) => ({
            ...prevState, page
        }));
    }, []);

    const handleRowsPerPageChange = useCallback((event) => {
        setState((prevState) => ({
            ...prevState, rowsPerPage: parseInt(event.target.value, 10)
        }));
    }, []);

    return {
        handleFiltersChange, handleSortChange, handlePageChange, handleRowsPerPageChange, state
    };
};

const useCustomersStore = (searchState) => {
    const isMounted = useMounted();
    const [state, setState] = useState({
        customers: [], customersCount: 0
    });
    const token = useSelector(selectToken);

    const handleCustomersGet = useCallback(async () => {
        try {
            // const response = await customersApi.getCustomers(searchState);
            const response = await manageUserApi.getMyUsers({token, searchState});
            if (isMounted()) {
                setState({
                    customers: response.data.users,
                    statuses: response.data.statuses,
                    customersCount: response.data.count,
                });
            }
        } catch (err) {
            console.error(err);
        }
    }, [searchState, isMounted]);

    useEffect(() => {
            handleCustomersGet();
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
        [searchState]);

    return {
        ...state
    };
};

const useCustomersIds = (customers = []) => {
    return useMemo(() => {
        return customers.map((customer) => customer.id);
    }, [customers]);
};

const List = () => {
    const customersSearch = useCustomersSearch();
    const customersStore = useCustomersStore(customersSearch.state);
    const customersIds = useCustomersIds(customersStore.customers);
    const customersSelection = useSelection(customersIds);

    const [modal, setModal] = useState({
        open: false,
    })

    const [userLeadData, setUserLeadData] = useState({
        id: null,
    });
    const token = useSelector(selectToken);

    const nav = useNavigate();

    const getLeadForProcessing = (e) => {
        e.preventDefault();

        apiRequest(token).get(route('api.manage.get-lead'), {
            validateStatus: function (status) {
                return status < 500; // Resolve only if the status code is less than 500
            }
        }).then((response) => {
            if (response.status == 200) {
                if (response?.data?.user_id) {
                    setUserLeadData({
                        id: response.data.user_id,
                    });
                    nav(`/manage/users/${response.data.user_id}`, {
                        state: {
                            id: response.data.user_id,
                        }
                    });
                    // router.visit(route('manage.users.show', {id: response.data.user_id}));
                    // setModal({
                    //     ...modal, open: true,
                    // });
                    // customersSearch.handleFiltersChange();
                } else {
                    toast.error("Can't extract user for creating link.");
                }

            } else if (response.status >= 400 && response.status < 500) {
                toast.error(response.data.message);
            } else {
                toast.error('An error occurred while trying to get a lead');
            }
        });
    };


    useEffect(() => {
        setInterval(() => {
            customersSearch.handlePageChange();
        }, 60000);
    }, [])

    usePageView();

    return (<>
        <Seo title="Dashboard: Customer List"/>
        <Box
            component="main"
            sx={{
                flexGrow: 1,
            }}
        >
            <Container maxWidth="xl">
                <Stack spacing={4}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        spacing={4}
                    >
                        <Stack spacing={1}>
                            <Typography variant="h4">
                                My customers
                            </Typography>
                        </Stack>
                        <Stack
                            alignItems="center"
                            direction="row"
                            spacing={3}
                        >
                            <Button
                                onClick={getLeadForProcessing}
                                startIcon={(<SvgIcon>
                                    <PlusIcon/>
                                </SvgIcon>)}
                                variant="contained"
                            >
                                Get a lead
                            </Button>
                        </Stack>
                    </Stack>
                    <Card>
                        <CustomerListSearch
                            onFiltersChange={customersSearch.handleFiltersChange}
                            onSortChange={customersSearch.handleSortChange}
                            sortBy={customersSearch.state.sortBy}
                            sortDir={customersSearch.state.sortDir}
                        />
                        <UsersListTable
                            onFiltersChange={customersSearch.handleFiltersChange}
                            statuses={customersStore.statuses}
                            count={customersStore.customersCount}
                            items={customersStore.customers}
                            onDeselectAll={customersSelection.handleDeselectAll}
                            onDeselectOne={customersSelection.handleDeselectOne}
                            onPageChange={customersSearch.handlePageChange}
                            onRowsPerPageChange={customersSearch.handleRowsPerPageChange}
                            onSelectAll={customersSelection.handleSelectAll}
                            onSelectOne={customersSelection.handleSelectOne}
                            page={customersSearch.state.page}
                            rowsPerPage={customersSearch.state.rowsPerPage}
                            selected={customersSelection.selected}
                        />
                    </Card>
                </Stack>
            </Container>
        </Box>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={modal.open}
            onClose={() => {
                setModal({
                    ...modal, open: false,
                });
            }}
            closeAfterTransition
            slots={{backdrop: Backdrop}}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={modal.open}>
                <Box sx={modalStyle}>
                    <>
                        <StatusPaper
                            icon={<CheckIcon/>}
                            title={'Success'}
                            text={'Lead added to "My users"'}
                            button={<>
                                <Stack spacing={3} direction={'row'} pt={4}>
                                    <Button
                                        variant={'contained'}
                                        component={Link}
                                        href={route('manage.users.show', {id: userLeadData?.id ?? 0})}
                                    >Show user</Button>
                                </Stack>
                            </>}
                        />
                    </>
                </Box>
            </Fade>
        </Modal>
    </>);
};

export default List;
