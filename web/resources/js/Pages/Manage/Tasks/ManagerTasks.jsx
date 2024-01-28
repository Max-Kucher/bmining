import PageWrapper from "@/Components/Wrappers/PageWrapper";
import {Seo} from "@/Components/Wrappers/Seo";
import {TitleNav} from "@/Components/TitleNav";
import BlockWrapper from "@/Components/Wrappers/BlockWrapper";
import {Box, Grid, IconButton, Stack, SvgIcon, Tooltip, Typography} from "@mui/material";
import {format, parseISO} from "date-fns";
import {AdminContent} from "@/Components/AdminContent";
import {useSelector} from "react-redux";
import {selectToken, selectUser} from "@/slices/userSlice";
import {useEffect, useState} from "react";
import apiRequest from "@/api/helper";
import toast from "react-hot-toast";
import {Check, FileDownloadDoneRounded} from "@mui/icons-material";
import {useResponseHandler} from "@/api/helpers/general";
import {RouterLink} from "@/Components/router-link";

export default function ManagerTasks() {
    const token = useSelector(selectToken);
    const [tasks, setTasks] = useState([]);

    const user = useSelector(selectUser);
    const {responseHandler} = useResponseHandler();

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = () => {
        apiRequest(token).get(route('api.manage.my-tasks')).then((response) => {
            if (response.status == 200)     {
                setTasks(response.data.tasks);
            } else {
                toast.error('Cant load tasks');
            }
        });
    };

    const handleMarkDoneOne = (id) => {
        apiRequest(token).get(route('api.tasks.markAsDone', {id: id})).then((response) => {
            loadTasks();
            if (response.status == 200) {
                toast.success('Task marked as done.');
            }
            responseHandler({
                response: response
            });
        });
    };

    return (<>
        <Seo title={'My tasks'}></Seo>
        <TitleNav title={'My tasks'} linkTitle={'Back to dashboard'} href={route('dashboard')}></TitleNav>
        {
            <>
                <BlockWrapper sx={{
                    paddingTop: '2rem',
                    paddingBottom: '1rem',
                }}>
                    <Grid container spacing={3}>
                        {tasks.length === 0 ?
                            <h2 style={{textAlign: 'center', 'width': '100%'}}>Tasks list is empty</h2> : null}
                        {tasks.map((item, idx) => {
                            const shownAfter = format(parseISO(item.show_after), 'dd MMM, yyyy HH:mm');
                            // TODO: need to separate types of tasks
                            return (<Grid item xs={12} md={4}>
                                <Box sx={{
                                    borderRadius: 1,
                                    backgroundColor: 'primary.main',
                                    color: 'primary.contrastText',
                                    paddingX: 2,
                                    paddingY: 1,
                                    minWidth: '300px',
                                }}>
                                    <Stack spacing={1}>
                                        <Stack direction={'row'} justifyContent={'space-between'}>
                                            <Typography variant={'h6'}>
                                                {item.title}
                                                <Typography variant={'h5'}
                                                            style={{
                                                                display: 'inline-block',
                                                                marginLeft: '1rem',
                                                                marginRight: '0.625rem'
                                                            }}>#{idx + 1}</Typography>

                                            </Typography>
                                            <Tooltip title="Mark as done">
                                                <IconButton
                                                    sx={{
                                                        '&:hover': {
                                                            backgroundColor: 'success.main',
                                                            color: 'white',
                                                            transition: '0.3s'

                                                        },
                                                    }}
                                                    edge="end"
                                                    onClick={() => {
                                                        if (item.state !== 'new') {
                                                            handleMarkDoneOne(item.id)
                                                        }
                                                    }}
                                                    size="small"
                                                >
                                                    <SvgIcon>
                                                        {
                                                            item.state == 'new' ? <FileDownloadDoneRounded/> :
                                                                <Check/>
                                                        }
                                                    </SvgIcon>
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                        <Typography variant={'body1'}>
                                            {item.description}
                                        </Typography>

                                        {item.user.id !== user.id ?
                                            <RouterLink href={route('manage.users.show', {id: item.user_id})}>
                                                <Typography title={'Author'} variant={'caption'}>
                                                    For user: {item.user.name}
                                                </Typography>
                                            </RouterLink> : null
                                        }

                                        <Stack direction={'row'} justifyContent={'space-between'}>
                                            <Typography variant={'caption'}>
                                                Start date: {shownAfter}
                                            </Typography>
                                            {item?.author?.id !== user.id ?
                                                <RouterLink
                                                    href={route('manage.users.show', {id: item?.author_id})}>
                                                    <Typography title={'Author'} variant={'caption'}>
                                                        {item?.author?.name ?? 'System'}
                                                    </Typography>
                                                </RouterLink> : null}

                                        </Stack>
                                    </Stack>
                                </Box>
                            </Grid>);


                        })}
                    </Grid>
                </BlockWrapper>
            </>

        }
    </>);
}
