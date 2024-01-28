import {useForm} from "@inertiajs/react";
import {
    Button, Dialog, FormControl, InputLabel, OutlinedInput, Select, Stack,
} from "@mui/material";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {customer} from "@/api/customers/data";
import {axiosErrorsCfg} from "@/api/helpers/general";
import MenuItem from "@mui/material/MenuItem";
import {useSelector} from "react-redux";
import {selectToken} from "@/slices/userSlice";
import apiRequest from "@/api/helper";

export const ChangeManagerDialog = ({open, onClose, userId}) => {
    const token = useSelector(selectToken);
    const [managers, setManagers] = useState([]);
    const [data, setData] = useState({
        managerId: '',
    });
    const [errors, setErrors] = useState([]);

    const changeInput = (e) => {
        setData({
            ...data, manager_id: e.target.value,
        });
    };

    const submit = (e) => {
        e.preventDefault();
        apiRequest(token).post(route('api.manage.users.change-manager', {id: userId}), data, axiosErrorsCfg)
            .then((response) => {
                if (response.status == 200) {
                    onClose();
                    toast.success('Manager changed');
                } else if (response.status == 422) {
                    setErrors(response.data.errors);
                    toast.error("Can't change manager.");
                } else {
                    toast.error("Request error.");
                }
            })
            .catch((e) => {
                console.error(e);
                toast.error("Request error.");
            })
    };

    useEffect(() => {
        if (errors?.error) {
            toast.error(errors.error);
        }
    }, [errors]);


    const requestManagerList = () => {
        apiRequest(token).get(route('api.managers.initials'), axiosErrorsCfg)
            .then((response) => {
                if (response?.data?.managers) {
                    setManagers(response.data.managers);
                } else {
                    toast.error('Error. Cant get managers list.');
                }
            })
    };

    useEffect(() => {
        requestManagerList();
    }, [])

    return (<Dialog
        fullWidth
        maxWidth="sm"
        onClose={onClose}
        open={open}
    >
        <form onSubmit={submit}>
            <Stack
                spacing={2}
                sx={{p: 3}}
            >
                <FormControl sx={{m: 1, width: 300}}>
                    <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        value={data.manager_id}
                        onChange={changeInput}
                        input={<OutlinedInput label="Manager"/>}
                    >
                        {managers.map((manager) => (<MenuItem
                            key={manager.name}
                            value={manager.id}
                        >
                            {manager.name}
                        </MenuItem>))}
                    </Select>
                </FormControl>
                <Button variant={'contained'} type={'submit'}>Change</Button>
            </Stack>
        </form>
    </Dialog>);
};
