import {
    Button, Dialog, FormHelperText, Stack, TextField
} from "@mui/material";
import {DateTimePicker} from "@mui/x-date-pickers";
import {useEffect} from "react";
import toast from "react-hot-toast";
import {useForm} from "@/api/helpers/general";

export const AddNewTaskDialog = ({open, onClose, userId}) => {

    const {data, setData, patch, errors, processing, recentlySuccessful, nowSuccessful} = useForm({
        title: '', text: '', user_id: userId, show_after: (new Date()).toISOString(), date: (new Date()).getTime()
    });

    const changeInput = (e) => {
        setData({
            ...data, [e.target.name]: e.target.value,
        });
    };

    const changeShowDate = (date) => {
        setData({
            ...data, show_after: date.toISOString(), date: date.getTime(),
        });
    };

    const setDateNow = () => {
        setData({
            ...data, show_after: (new Date()).toISOString(), date: (new Date()).getTime(),
        });
    };
    const submit = (e) => {
        e.preventDefault();
        patch(route('api.manage.tasks.store'));
    };

    useEffect(() => {
        if (recentlySuccessful === true) {
            toast.success('Task added');
            onClose();
        }
    }, [recentlySuccessful]);

    useEffect(() => {
        if (errors?.error) {
            toast.success(errors.error);
        }
    }, [errors]);

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
                <TextField
                    error={!!(errors.title)}
                    fullWidth
                    helperText={errors.title}
                    label="Title"
                    name="title"
                    onChange={changeInput}
                    value={data.title}
                />
                <TextField
                    error={!!(errors.text)}
                    fullWidth
                    helperText={errors.text}
                    label="Text"
                    name="text"
                    onChange={changeInput}
                    value={data.text}
                />

                <Stack spacing={2} direction={'row'}>
                    <DateTimePicker
                        ampm={false}
                        name={'show_after'}
                        label="Set task date"
                        onChange={changeShowDate}
                        renderInput={(inputProps) => (<TextField
                            fullWidth
                            {...inputProps} />)}
                        value={data.date}
                    />
                    <Button type={'button'} onClick={setDateNow}>NOW</Button>
                </Stack>
                {!!(errors.show_after) && (<FormHelperText error>
                    {errors.show_after}
                </FormHelperText>)}
                <Button variant={'contained'} type={'submit'}>Create</Button>
            </Stack>
        </form>
    </Dialog>);
};
