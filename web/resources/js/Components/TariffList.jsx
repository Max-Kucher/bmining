import {
    createTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Stack, ThemeProvider
} from "@mui/material";
import {Add, Delete, Edit} from '@mui/icons-material'
import MaterialReactTable from "material-react-table";
import * as React from "react";
import {useEffect, useMemo, useState} from "react";
import {Alert, Snackbar, Button} from "@mui/material";

import {useSelector} from "react-redux";
import {selectToken} from "@/slices/userSlice";
import apiRequest from "@/api/helper";
import {Link} from "react-router-dom";
import {adminRoutes} from "@/routes/main";
import {useForm} from "@/api/helpers/general";

export default function TariffList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteTariffId, setDeleteTariffId] = useState(null);
    const [snackBar, setSnackBar] = useState(false);


    useEffect(() => {
        updateTariffs();
    }, []);
    const token = useSelector(selectToken);
    const updateTariffs = () => {
        apiRequest(token).get(route('api.tariffs')).then((data) => {
            let tempData = data.data.map(item => {
                item.actions = <Stack spacing={1}>
                    <Button
                        startIcon={<Edit/>}
                        variant={'outlined'}
                        component={Link}
                        to={'/admin/tariffs/' + item.id}
                    >Edit</Button>
                    <Button variant="outlined" startIcon={<Delete/>} onClick={() => {
                        setDeleteTariffId(item.id);
                        setDeleteDialog(true);
                    }}>
                        Delete
                    </Button>
                </Stack>
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
            accessorKey: 'desc', header: 'Description',
        }, {
            accessorKey: 'price', //normal accessorKey
            header: 'Price',
        }, {
            accessorKey: 'percent', header: 'Year profit in percent',
        }, {
            accessorKey: 'actions', header: 'Action',
        }],

        [],);


    const {delete: destroy} = useForm({});

    const deleteTariff = () => {
        let uri = route('api.tariff.destroy', {id: deleteTariffId});

        destroy(
            uri,
            {
                onSuccess: () => {
                    setData(data.filter(item => item.id === deleteTariffId));
                    updateTariffs();
                    setDeleteTariffId(null);
                    closeDialog();
                },
            }
        );
    };

    const closeDialog = () => {
        setDeleteDialog(false);
    }

    return (<>
        <Stack spacing={3}>

            <MaterialReactTable
                columns={columns}
                data={data}
                enablePagination={false}
                state={{isLoading: loading}}
            />
            <Link to={adminRoutes.tariffsAdd}>
                <Fab color="primary" aria-label="add">
                    <Add/>
                </Fab>
            </Link>
        </Stack>


        <Dialog
            open={deleteDialog}
            onClose={closeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle onClick={deleteTariff}>{"Delete"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Do you really want to remove this tariff?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={deleteTariff} color="primary">
                    Yes
                </Button>
                <Button onClick={closeDialog} color="primary" autoFocus>
                    No
                </Button>
            </DialogActions>

        </Dialog>
    </>);
}
