import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Box,
} from "@mui/material";
import {Add, Delete, Edit, Person, VerifiedUser} from '@mui/icons-material'
import MaterialReactTable from "material-react-table";
import * as React from "react";
import {useEffect, useMemo, useState} from "react";
import {Alert, Snackbar, Button} from "@mui/material";
import {Link, router, useForm} from '@inertiajs/react'
import {Verified, GppMaybe} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {selectToken} from "@/slices/userSlice";
import apiRequest from "@/api/helper";

export default function KycList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteUserId, setDeleteKycId] = useState(null);
    const [snackBar, setSnackBar] = useState(false);
    const [itemToUpdate, setItemToUpdate] = useState(null);
    const {
        data: formData, setData: setFormData, patch, errors, processing, recentlySuccessful, nowSuccessful
    } = useForm(null);


    useEffect(() => {
        updateList();
    }, []);

    const verifyKyc = (item) => {
        setItemToUpdate(item);
        setFormData({
            verified: !item.verified,
        });
    };

    useEffect(() => {
        if (itemToUpdate !== null && formData !== null) {
            patch(route('admin.kycs.update', {id: itemToUpdate.id}), {
                preserveScroll: true
            });
            setItemToUpdate(null);
            setFormData(null);
            updateList();
        }
    }, [itemToUpdate, formData]);

    const token = useSelector(selectToken);

    const updateList = () => {
        apiRequest(token).get('/api/kycs').then((data) => {
            let tempData = data.data.map(item => {
                item.actions = <div className=''>
                    <IconButton color={'primary'} variant={'outlined'} onClick={() => {
                        router.visit('/admin/kyc/' + item.id);
                    }}>
                        <Edit/>
                    </IconButton>
                    <IconButton color={'error'} onClick={() => {
                        setDeleteKycId(item.id);
                        setDeleteDialog(true);
                    }}>
                        <Delete/>
                    </IconButton>
                </div>;
                item.user = <>
                    <Link href={"/admin/users/" + item.user_id}>
                        <IconButton
                            // href=
                            color={'primary'}
                            variant={'outlined'}
                            onClick={() => {
                                router.visit('/admin/users/' + item.id);
                            }}>
                            <Person/>
                        </IconButton>
                    </Link>
                </>;
                item.photoBox = <>
                    <a href={item.photo}>
                        <Box
                            component="img"
                            src={typeof item.photo === 'object' ? URL.createObjectURL(item.photo) : (item.photo ? item.photo : '')}
                            sx={{
                                maxWidth: 300, maxHeight: 300, opacity: 1, objectFit: 'cover'
                            }}
                        />
                    </a>
                </>;
                item.verifiedIcon = <button className='flex justify-center' onClick={() => {
                    verifyKyc(item);
                }}>{item.verified == false ? <GppMaybe/> : <VerifiedUser/>}</button>;
            });
            setData(data.data);
            setLoading(false);
        });
    };

    const columns = useMemo(() => [{
            accessorKey: 'id', //access nested data with dot notation
            header: '#',

        }, {
            accessorKey: 'name', //access nested data with dot notation
            header: 'Name',
        }, {
            accessorKey: 'surname', header: 'Surname',
        }, {
            accessorKey: 'photoBox', //normal accessorKey
            header: 'Photo',
        }, {
            accessorKey: 'verifiedIcon', header: 'Verified',
        }, {
            accessorKey: 'user', header: 'User',
        }],

        [],);


    const {delete: destroy} = useForm({});

    const deleteUser = () => {

        destroy(route('admin.kycs.destroy', {id: deleteUserId}), {
            preserveScroll: true, onSuccess: () => () => {

            }, // onError: ()=>{},
            onFinish: () => {
                setData(data.filter(item => item.id !== deleteUserId));
                updateList();
                setDeleteKycId(null);
                closeDialog();
            },
        });
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
        {/*<div className='flex justify-end'>*/}
        {/*    <Link href={'/admin/kycs'}>*/}
        {/*        <Fab color="primary" aria-label="add">*/}
        {/*            <Add/>*/}
        {/*        </Fab>*/}
        {/*    </Link>*/}
        {/*</div>*/}


        <Dialog
            open={deleteDialog}
            onClose={closeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle onClick={deleteUser}>{"Delete"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Do you really want to remove this kyc?
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
