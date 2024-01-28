import {formatDistanceToNowStrict, parseISO, subHours, subMinutes} from 'date-fns';
import {
    Avatar,
    Box,
    Card,
    CardHeader,
    Container,
    Divider,
    Drawer,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    OutlinedInput,
    Stack,
    SvgIcon,
    Tooltip,
    Typography
} from '@mui/material';
import Send01Icon from "@untitled-ui/icons-react/build/esm/Send01";
import {usePage} from "@inertiajs/react";
import {useEffect, useRef, useState} from "react";
import toast from "react-hot-toast";
import {customer} from "@/api/customers/data";
import {Scrollbar} from "@/components/scrollbar";
import SimpleBar from "simplebar-react";
import {getInitials} from "@/utils/get-initials";
import {useSelector} from "react-redux";
import {selectToken, selectUser} from "@/slices/userSlice";
import apiRequest from "@/api/helper";

const now = new Date();

export const CommentsList = ({
                                 comments, customerId, onSuccess = () => {
    }
                             }) => {

    const user = useSelector(selectUser);

    const [currentComment, setCurrentComment] = useState();
    const [errors, setErrors] = useState({});
    const token = useSelector(selectToken);
    const handleSend = () => {
        apiRequest(token).post(route('api.manage.comments.add'), {
            text: currentComment, user_id: customerId,
        }).then(response => {
            if (response.status == 200) {
                toast.success('Added!');
                onSuccess();
                setCurrentComment('');
            }
        }).catch((e) => {
            console.log(e.response);
            if (e?.response) {
                if (e.response.status == 422 && e.response?.data?.errors) {
                    let errors = {};
                    for (let errKey in e.response.data.errors) {
                        errors[errKey] = e.response.data.errors[errKey][0];
                    }
                    setErrors(errors);
                }
            } else {
                toast.error('Error while adding comment');
                return;
            }
        });
    };

    const refDiv = useRef(null);
    useEffect(() => {
        if (refDiv == null || refDiv.current == null) {
            return;
        }
        refDiv.current.scrollIntoView(false);
    }, [comments.length]);

    return (<Card>
        <CardHeader
            action={(<IconButton>
                <SvgIcon>
                    {/*<DotsHorizontalIcon/>*/}
                </SvgIcon>
            </IconButton>)}
            title="Comments"
        />
        <Divider/>

        <List disablePadding>
            <Box style={{maxHeight: '400px', overflowY: 'scroll'}}
                 variant='persistent'
                 open={true}

            >
                {comments.map((comment, index) => {
                    const showDivider = index < comments.length - 1;
                    const ago = formatDistanceToNowStrict(parseISO(comment.created_at));

                    return (<><ListItem
                        divider={showDivider}
                        key={comment.id}
                    >
                        <ListItemAvatar>
                            <Avatar
                                src={comment.author.avatar}
                                sx={{cursor: 'pointer'}}
                            >
                                {getInitials(comment.author.name + " " + comment.author.surname)}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            disableTypography
                            primary={(<Stack direction={'row'} justifyContent={'space-between'}>
                                <Link
                                    color="text.primary"
                                    sx={{cursor: 'pointer'}}
                                    underline="none"
                                    variant="subtitle2"
                                    href={route('manage.users.show', {id: comment.author.id})}
                                >
                                    {comment.author.name}
                                </Link>
                                <Typography
                                    color="text.secondary"
                                    noWrap
                                    variant="caption"
                                >
                                    {ago}
                                    {' '}
                                    ago
                                </Typography>
                            </Stack>)}
                            secondary={(<Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                {comment.text}
                            </Typography>)}
                        />
                    </ListItem>
                        <div ref={refDiv}></div>
                    </>);
                })}
            </Box>

        </List>

        <Stack
            alignItems="center"
            direction="row"
            justifyContent={'center'}
            spacing={2}
            sx={{
                display: 'flex', px: 3, py: 1,
            }}>
            <Avatar
                sx={{
                    display: {
                        display: 'flex', justifyContent: 'center', alignItems: 'center', // xs: 'none', sm: 'inline'
                    }
                }}
                src={user.avatar}
            />
            <div>
            </div>
            <OutlinedInput
                onKeyDown={(e) => {
                    if (e.code == 'Enter') {
                        handleSend();
                    }
                }}
                label={errors.text ?? false}
                error={errors.text ?? false}
                // disabled={disabled}
                fullWidth
                onChange={(e) => {
                    setCurrentComment(e.target.value);
                }}
                placeholder="Leave a message"
                size="small"
                value={currentComment}
            />
            <Box
                sx={{
                    alignItems: 'center', display: 'flex', m: -2, ml: 2
                }}
            >
                <Tooltip title="Send">
                    <Box sx={{m: 1}}>
                        <IconButton
                            color="primary"
                            // disabled={!body || disabled}
                            sx={{
                                backgroundColor: 'primary.main', color: 'primary.contrastText', '&:hover': {
                                    backgroundColor: 'primary.dark'
                                }
                            }}
                            onClick={handleSend}
                        >
                            <SvgIcon>
                                <Send01Icon/>
                            </SvgIcon>
                        </IconButton>
                    </Box>
                </Tooltip>
            </Box>
        </Stack>
    </Card>);
}
