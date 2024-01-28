import {useCallback, useEffect, useMemo, useState} from 'react';
import Bell01Icon from '@untitled-ui/icons-react/build/esm/Bell01';
import {Badge, IconButton, SvgIcon, Tooltip} from '@mui/material';
import {usePopover} from '@/hooks/use-popover';
import {NotificationsPopover} from "@/layouts/dashboard/notifications-button/notifications-popover";
import {useSelector} from "react-redux";
import {selectToken} from "@/slices/userSlice";
import apiRequest from "@/api/helper";
import {AssignmentInd, PlaylistAdd, TaskAlt} from "@mui/icons-material";
import {TasksPopover} from "@/Components/Tasks/TasksPopover";
import {useResponseHandler} from "@/api/helpers/general";

const useNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const unread = useMemo(() => {
        return notifications.reduce((acc, notification) => acc + (notification.read ? 0 : 1), 0);
    }, [notifications]);

    const handleMarkDoneOne = useCallback((notificationId) => {
        setNotifications((prevState) => {
            return prevState.filter((notification) => notification.id !== notificationId);
        });
    }, []);

    const handleMarkAllAsRead = useCallback(() => {
        setNotifications((prevState) => {
            return prevState.map((notification) => ({
                ...notification, read: true
            }));
        });
    }, []);

    return {
        handleMarkAllAsRead, handleMarkDoneOne, notifications, unread
    };
};

export const TasksButton = () => {
    const popover = usePopover();
    const [unreadCount, setUnreadCount] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const token = useSelector(selectToken);
    const {responseHandler} = useResponseHandler();
    const updateUnreadCount = () => {
        apiRequest(token).get('/api/manage/tasks/count').then((response) => {
            if (response?.data?.count || response?.data?.count === 0) {
                setUnreadCount(response.data.count);
            }
            responseHandler({
                response: response
            });
        });
    };

    useEffect(() => {
        if (popover.open === true) {
            getNotifications();
        }
    }, [popover.open]);

    const getNotifications = () => {
        apiRequest(token).get('/api/manage/tasks/last-active').then((response) => {
            if (response?.data?.tasks) {
                setNotifications(response.data.tasks);
            }
            responseHandler({
                response: response
            });
        });
    };

    const handleMarkDoneOne = (id) => {
        apiRequest(token).get(route('api.tasks.markAsDone', {id: id})).then((response) => {
            updateUnreadCount();
            getNotifications();
            responseHandler({
                response: response
            });
        });
    };


    useEffect(() => {
        updateUnreadCount();
    }, []);

    return (<>
        <Tooltip title="Tasks">
            <IconButton
                ref={popover.anchorRef}
                onClick={popover.handleOpen}
            >

                <Badge
                    color="error"
                    badgeContent={unreadCount}
                >
                    <SvgIcon>
                        <PlaylistAdd/>
                    </SvgIcon>
                </Badge>
            </IconButton>
        </Tooltip>
        <TasksPopover
            anchorEl={popover.anchorRef.current}
            notifications={notifications}
            onClose={popover.handleClose}
            onMarkDoneOne={handleMarkDoneOne}
            open={popover.open}
        />
    </>);
};
