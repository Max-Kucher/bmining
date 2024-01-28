import {Avatar, Box, Button, FormHelperText, Stack, SvgIcon, Typography} from "@mui/material";
import {alpha} from "@mui/material/styles";
import Camera01Icon from "@untitled-ui/icons-react/build/esm/Camera01";
import User01Icon from "@untitled-ui/icons-react/build/esm/User01";
import {useEffect} from "react";
import {useForm} from "@/helpers/general";
import {updateAvatar} from "@/slices/userSlice";
import toast from 'react-hot-toast';
import {useDispatch} from "react-redux";

export function UpdateAvatarForm({avatar}) {
    const {data, setData, post: post, errors, processing, recentlySuccessful, nowSuccessful, responseData} = useForm({
        'avatar': avatar,
    });

    const dispatch = useDispatch();
    const changeInput = (e) => {
        // console.log(e.target.files ?? []);
        setData({
            ...data, [e.target.name]: e.target.name === 'avatar' ? e.target.files[0] : e.target.value,
        });
    };

    const onSuccess = (data) => {
        dispatch(updateAvatar({
            avatar: data.avatar,
        }))
    };

    useEffect(() => {
        if (responseData?.avatar) {
            onSuccess(responseData);
        }
    }, [recentlySuccessful])

    const submit = (e) => {
        e.preventDefault();
        post(route('api.profile.update.avatar'), {
            forceFormData: true, preserveScroll: true,
        });
    };

    useEffect(() => {
        if (recentlySuccessful) {
            toast.success('Avatar updated.')
        }
    }, [recentlySuccessful]);


    return (<form encType='multipart/form-data' onSubmit={submit}>
        <Stack
            alignItems="center"
            direction="row"
            spacing={2}
        >
            <Box
                sx={{
                    borderColor: 'neutral.300', borderRadius: '50%', borderStyle: 'dashed', borderWidth: 1, p: '4px'
                }}
            >
                <Box
                    sx={{
                        borderRadius: '50%', height: '100%', width: '100%', position: 'relative'
                    }}
                >
                    <Box
                        sx={{
                            alignItems: 'center',
                            backgroundColor: (theme) => alpha(theme.palette.neutral[700], 0.5),
                            borderRadius: '50%',
                            color: 'common.white',
                            cursor: 'pointer',
                            display: 'flex',
                            height: '100%',
                            justifyContent: 'center',
                            left: 0,
                            opacity: 0,
                            position: 'absolute',
                            top: 0,
                            width: '100%',
                            zIndex: 1,
                            '&:hover': {
                                opacity: 1
                            }
                        }}
                        component={'label'}
                    >
                        <input name={'avatar'}
                               onChange={changeInput} hidden accept="image/*" multiple
                               type="file"/>
                        <Stack
                            alignItems="center"
                            direction="row"
                            spacing={1}
                        >
                            <SvgIcon color="inherit">
                                <Camera01Icon/>
                            </SvgIcon>
                            <Typography
                                color="inherit"
                                variant="subtitle2"
                                sx={{fontWeight: 700}}
                            >
                                Select
                            </Typography>
                        </Stack>
                    </Box>

                    <Avatar
                        src={typeof data.avatar === 'object' && data.avatar !== null
                            ?
                            URL.createObjectURL(data.avatar)
                            :
                            (avatar ? avatar : '')}
                        sx={{
                            height: 100, width: 100
                        }}
                    >
                        <SvgIcon>
                            <User01Icon/>
                        </SvgIcon>
                    </Avatar>
                </Box>
            </Box>
            <Button
                color="inherit"
                size="small"
                type={'submit'}
            >
                Change
            </Button>
            <FormHelperText error={errors.avatar}>{errors.avatar ?? ''}</FormHelperText>
        </Stack>
    </form>);
}
