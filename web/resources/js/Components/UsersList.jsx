import {
    createTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, ThemeProvider, IconButton,
} from "@mui/material";
import {Add, Delete, Edit} from '@mui/icons-material'
import MaterialReactTable from "material-react-table";
import * as React from "react";
import {useEffect, useMemo, useState} from "react";
import {Alert, Snackbar, Button} from "@mui/material";
import {Verified, GppMaybe} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {selectToken} from "@/slices/userSlice";
import apiRequest from "@/api/helper";
import {useForm} from "@/helpers/general";
import {Link} from "react-router-dom";
import {RouterLink} from "@/components/router-link";

export default function UsersList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);


    useEffect(() => {
        updateUsers();
    }, []);

    const token = useSelector(selectToken);
    const updateUsers = () => {
        apiRequest(token).get('/api/users').then((data) => {
            let tempData = data.data.map(item => {
                item.actions = <div>
                    <IconButton
                        component={RouterLink}
                        to={'/admin/users/' + item.id}
                        color={'primary'} variant={'outlined'}>
                        <Edit/>
                    </IconButton>
                    <IconButton color={'error'} onClick={() => {
                        setDeleteUserId(item.id);
                        setDeleteDialog(true);
                    }}>
                        <Delete/>
                    </IconButton>
                </div>;
                // console.log(item);
                item.emailVerified =
                    <div className='flex justify-center'>{item.email_verified_at === null ? <GppMaybe/> :
                        <Verified/>}</div>;
                if (item.tariff == null) {
                    item.tariff = {
                        name: '---'
                    }
                }
            });
            setData(data.data);
            setLoading(false);
        });
    };

    const columns = useMemo(() => [{
            accessorKey: 'id', //access nested data with dot notation
            header: '#',

        },
            {
                accessorKey: 'name', //access nested data with dot notation
                header: 'Name',
            },
            {
                accessorKey: 'surname', header: 'Surname',
            },
            {
                accessorKey: 'email', //normal accessorKey
                header: 'Email',
            },
            {
                accessorKey: 'emailVerified', header: 'Email verified',
            },
            {
                accessorKey: 'phone', header: 'Phone number',
            },
            {
                accessorKey: 'actions', header: 'Actions',
            },],

        [],);


    const {delete: destroy} = useForm({});

    const deleteUser = () => {
        let uri = route('api.users.delete', {id: deleteUserId});

        destroy(uri,
            {
                onSuccess: () => {
                    setData(data.filter(item => item.id !== deleteUserId));
                    updateUsers();
                    setDeleteUserId(null);
                    closeDialog();
                },
            }
        );
    };

    const closeDialog = () => {
        setDeleteDialog(false);
    }

    return (<>

        <MaterialReactTable
            align={'center'}

            columns={columns}
            data={data}
            enablePagination={false}
            state={{isLoading: loading}}
        />
        <div style={{paddingTop: '1rem'}}>
            <Link to={'/admin/users/add'}>
                <Fab color="primary" aria-label="add">
                    <Add/>
                </Fab>
            </Link>
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
                    Do you really want to remove this user?
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
