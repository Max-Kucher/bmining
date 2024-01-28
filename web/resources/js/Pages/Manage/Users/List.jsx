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
import PageWrapper from "@/Components/Wrappers/PageWrapper";
import {useSelector} from "react-redux";
import {selectToken} from "@/slices/userSlice";

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
            const response = await manageUserApi.getUsers({token, searchState});
            if (isMounted()) {
                setState({
                    customers: response.data.users,
                    customersCount: response.data.count,
                    statuses: response.data.statuses
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


    usePageView();

    return (<>
        <Seo title="Dashboard: Leads list"/>
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
                                Leads
                            </Typography>
                        </Stack>
                        <Stack
                            alignItems="center"
                            direction="row"
                            spacing={3}
                        >

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
    </>);
};

export default List;
