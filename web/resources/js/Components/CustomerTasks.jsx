import BlockWrapper from "@/Components/Wrappers/BlockWrapper";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {Box, Grid, Stack, Typography} from "@mui/material";
import {format, parseISO} from "date-fns";
import _ from "lodash";
import {AdminContent} from "@/Components/AdminContent";

import {useSelector} from "react-redux";
import {selectToken} from "@/slices/userSlice";
import apiRequest from "@/api/helper";
import {RouterLink} from "@/components/router-link";

export function CustomerTasks({userId}) {
    const [tasks, setTasks] = useState([]);
    const token = useSelector(selectToken);

    const getTasksRequets = () => {
        apiRequest(token).get(route('api.manage.users.tasks', {id: userId})).then((response) => {
            if (response?.data?.tasks) {
                setTasks(response.data.tasks);
            }
        }).catch(err => {
            toast.error("Can't load user tasks.");
        });
    };

    useEffect(() => {
        getTasksRequets();
    }, [])

    return (<>
            <BlockWrapper>
                {tasks.length === 0 ? <h2 style={{textAlign: 'center', width: '100%'}}>Tasks list empty</h2> : null}
                <Grid container spacing={3}>
                    {tasks.map((item, idx) => {
                        const shownAfter = format(parseISO(item.show_after), 'MMM dd, h:mm a');
                        return (<Grid item xs={12} md={4}>
                            <Box sx={{
                                borderRadius: 4,
                                backgroundColor: 'primary.main',
                                color: 'primary.contrastText',
                                paddingX: 2,
                                paddingY: 2,
                                minWidth: '300px'
                            }}>
                                <Stack spacing={2}>
                                    <Stack direction={'row'} justifyContent={'space-between'}>
                                        <Typography variant={'h5'}>
                                            {item.title}
                                        </Typography>
                                        <Typography variant={'h5'}
                                                    style={{marginRight: '10px'}}>#{idx + 1}</Typography>
                                    </Stack>
                                    <Typography variant={'body1'}>
                                        {item.description}
                                    </Typography>
                                    <Stack direction={'row'} justifyContent={'space-between'}>
                                        <Typography variant={'caption'}>
                                            {shownAfter}
                                        </Typography>
                                        <AdminContent>
                                            <RouterLink to={route('manage.users.show', {id: item.author.id})}>
                                                <Typography variant={'caption'}>
                                                    {item.author.name}
                                                </Typography>
                                            </RouterLink>
                                        </AdminContent>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Grid>);
                    })}
                </Grid>
            </BlockWrapper>
        </>
    );
}
