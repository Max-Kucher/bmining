import MaterialReactTable from "material-react-table";
import {
    Avatar,
    Badge,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    IconButton,
    Stack,
    SvgIcon,
    Typography
} from "@mui/material";
import {Add, Delete, Edit} from "@mui/icons-material";
import * as React from "react";
import {useEffect, useMemo, useState} from "react";
import {Seo} from "@/Components/Wrappers/Seo";
import {TitleNav} from "@/Components/TitleNav";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import {getInitials} from "@/utils/get-initials";
import {format, parseISO} from "date-fns";
import {useSelector} from "react-redux";
import {selectToken} from "@/slices/userSlice";
import apiRequest from "@/api/helper";
import {useRouter} from "@/hooks/use-router";
import {RouterLink} from "@/components/router-link";
import {dashboardRoutes} from "@/routes/main";

export default function List() {
    return (<>
        <TitleNav title={'Managers'} href={dashboardRoutes.dashboard} linkTitle={'Back to dashboard'}/>
        <Seo title={'Managers'}/>
        <ManagerList/>
    </>);
}

export const UserInfo = ({
                             info = {
                                 id: '',
                                 avatar: '',
                                 name: '',
                                 surname: '',
                                 email: '',
                                 phone: '',
                                 isOnline: '',
                                 lastVisitDate: '',
                             }, showPhone = true
                         }) => {
    const router = useRouter();

    return (<Stack
        alignItems="center"
        direction="row"
        spacing={1}
    >
        {info.isOnline ? <Badge
            anchorOrigin={{
                horizontal: 'right', vertical: 'bottom'
            }}
            color="success"
            variant="dot"
        >
            <Avatar
                title={info.lastVisitDate}
                src={info.avatar}
                sx={{
                    height: 42, width: 42
                }}
            >
                {getInitials(info.name)}
            </Avatar>
        </Badge> : <Avatar
            title={info.lastVisitDate}
            src={info.avatar}
            sx={{
                height: 42, width: 42
            }}
        >
            {getInitials(info.name + " " + info.surname)}
        </Avatar>}
        <div>
            <Box
                color="inherit"
                sx={{textDecoration: 'none'}}
                component={RouterLink}
                to={`/admin/managers/${info.id}`}
                variant="subtitle2"
            >
                {info.name + ' ' + info.surname}
            </Box>
            <Typography
                color="text.secondary"
                variant="body2"
            >
                {info.email}
            </Typography>
            {showPhone ? <Typography
                color="text.secondary"
                variant="body2"
            >
                Phone: {info.phone}
            </Typography> : null}

        </div>
    </Stack>);
}

export function ManagerList() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteUserId, setDeleteTariffId] = useState(null);
    const router = useRouter();

    const [requestParams, setRequestParams] = useState({
        page: 0, rowsPerPage: 5, sortBy: 'updated_at', sortDir: 'desc'
    });
    const closeDialog = () => {
        setDeleteDialog(false);
    }

    const deleteUser = () => {
        axios.delete(route('admin.users.destroy', {id: deleteUserId})).then(() => {
            setItems(items.filter(item => item.id !== deleteUserId));
            updateItems();
            setDeleteTariffId(null);
            closeDialog();
        });

    };

    const columns = useMemo(() => {
            return [{
                accessorKey: 'id', //access nested data with dot notation
                header: '#',
            }, {
                accessorKey: 'userInfo', //access nested data with dot notation
                header: 'Info',
            }, {
                accessorKey: 'info.balance', //access nested data with dot notation
                header: 'Balance',
            }, {
                accessorKey: 'info.percent', //access nested data with dot notation
                header: 'Profit percent',
            }, {
                accessorKey: 'salesCount', //access nested data with dot notation
                header: 'Sales',
            }, {
                accessorKey: 'actions', header: 'Actions',
            }

            ];
        },

        []);

    useEffect(() => {
        updateItems();
    }, []);


    const prepareItems = (data) => {
        return data.map(item => {
            const lastVisitDate = format(parseISO(item.last_visit), 'dd MMM, yyyy HH:mm:ss');
            item.actions = <Stack direction={'row'} spacing={2}>
                {/*<IconButton color={'error'} onClick={() => {*/}
                {/*    setDeleteTariffId(item.id);*/}
                {/*    setDeleteDialog(true);*/}
                {/*}}>*/}
                {/*    <Delete/>*/}
                {/*</IconButton>*/}
                {/* //TODO: REMOVE OR ADD REMOVE MANAGER BTN*/}
                <IconButton color={'primary'} variant={'outlined'} onClick={() => {
                    router.replace(`/admin/managers/${item.id}/edit`);
                }}>
                    <Edit/>
                </IconButton>
                <IconButton
                    component={RouterLink}
                    to={`/admin/managers/${item.id}`}
                >
                    <SvgIcon>
                        <ArrowRightIcon/>
                    </SvgIcon>
                </IconButton>
            </Stack>;
            item.userInfo = <UserInfo info={{
                id: item.id,
                name: item.name,
                surname: item.surname,
                avatar: item.avatar,
                email: item.email,
                isOnline: item.isOnline,
                lastVisitDate: lastVisitDate,
            }} showPhone={false}/>
            return item;
        })
    };
    const token = useSelector(selectToken);
    const updateItems = () => {
        apiRequest(token).post('/api/managers', requestParams).then((response) => {
            let tempData = prepareItems(response.data.users);
            console.log(tempData);
            setItems(tempData);
            setLoading(false);
        });
    };

    useEffect(() => {
        updateItems();
    }, []);

    return (<>
        <MaterialReactTable
            align={'center'}
            columns={columns}
            data={items}
            enablePagination={false}
            state={{isLoading: loading}}
        />
        <div style={{marginTop: '1.25rem'}}>
            <RouterLink to={'/admin/users/add'}>
                <Fab color="primary" aria-label="add">
                    <Add/>
                </Fab>
            </RouterLink>
        </div>


        <Dialog
            open={deleteDialog}
            onClose={closeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle onClick={deleteUser}>{"Delete"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Do you really want to remove this manager?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={deleteUser} color="primary">
                    Yes
                </Button>
                <Button onClick={closeDialog} color="primary" autoFocus>
                    No
                </Button>
            </DialogActions>

        </Dialog>
    </>);
}
