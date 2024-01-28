import {useCallback, useContext, useEffect, useState} from 'react';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import {Avatar, Box, Chip, Container, Stack, SvgIcon, Typography} from '@mui/material';
import {useMounted} from '@/hooks/use-mounted';
import {usePageView} from '@/hooks/use-page-view';
import {CustomerEditForm} from "@/Forms/CustomerEditForm";
import {getInitials} from '@/utils/get-initials';
import {manageUserApi} from "@/api/apiMain/manageUsersApi";
import toast from "react-hot-toast";
import {Seo} from "@/Components/Wrappers/Seo";
import {useSelector} from "react-redux";
import {selectToken} from "@/slices/userSlice";
import {useParams} from "react-router";
import {RouterLink} from "@/components/router-link";

const useCustomer = () => {
    const isMounted = useMounted();
    const [customer, setCustomer] = useState({});
    const [availableStatuses, setAvailableStatuses] = useState([]);

    const {id} = useParams();
    const token = useSelector(selectToken);

    const handleCustomerGet = useCallback(async () => {
        try {
            const response = await manageUserApi.getUser(token, id);

            if (isMounted()) {
                setCustomer(response.data.user);
                setAvailableStatuses(response.data.statuses);
            }
        } catch (err) {
            if (err.response) {
                if (err.response.status >= 400) {
                    toast.error("Wrong request, or you haven't permissions for this action.");
                }
            }
            console.error(err);
        }
    }, [isMounted]);

    useEffect(() => {
            handleCustomerGet();
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
        []);

    return {
        customer: customer, statuses: availableStatuses
    };
};

const Edit = () => {
    const {customer, statuses: availableStatuses} = useCustomer();

    usePageView();

    if (!customer) {
        return null;
    }

    return (<>
        <Seo title="Dashboard: Customer Edit"/>
        <Box
            component="main"
            sx={{
                flexGrow: 1, py: 8
            }}
        >
            <Container maxWidth="lg">
                <Stack spacing={4}>
                    <Stack spacing={4}>
                        <div>
                            <Box
                                color="text.primary"
                                component={RouterLink}
                                to={route('manage.users')}
                                sx={{
                                    alignItems: 'center', display: 'inline-flex'
                                }}
                                underline="hover"
                            >
                                <SvgIcon sx={{mr: 1}}>
                                    <ArrowLeftIcon/>
                                </SvgIcon>
                                <Typography variant="subtitle2">
                                    Customers
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
                                            ID:
                                        </Typography>
                                        <Chip
                                            label={customer.id}
                                            size="small"
                                        />
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                    <CustomerEditForm customer={customer} availableStatuses={availableStatuses}/>
                </Stack>
            </Container>
        </Box>
    </>);
};

export default Edit;
