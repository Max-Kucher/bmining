import {useCallback, useEffect, useMemo, useState} from 'react';
import Bell01Icon from '@untitled-ui/icons-react/build/esm/Bell01';
import {Badge, IconButton, SvgIcon, Tooltip} from '@mui/material';
import {usePopover} from '@/hooks/use-popover';
import {notifications as initialNotifications} from './notifications';
import {NotificationsPopover} from './notifications-popover';
import {useSelector} from "react-redux";
import {selectToken} from "@/slices/userSlice";
import apiRequest from "@/api/helper";

const useNotifications = () => {
    const [notifications, setNotifications] = useState(initialNotifications);
    const unread = useMemo(() => {
        return notifications.reduce((acc, notification) => acc + (notification.read ? 0 : 1), 0);
    }, [notifications]);

    const handleRemoveOne = useCallback((notificationId) => {
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
        handleMarkAllAsRead, handleRemoveOne, notifications, unread
    };
};

export const NotificationsButton = () => {
    const popover = usePopover();
    const [unreadCount, setUnreadCount] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const token = useSelector(selectToken);
    const updateUnreadCount = () => {

        apiRequest(token).get(route('api.events.count')).then((response) => {
            if (response?.data?.count || response?.data?.count === 0) {
                setUnreadCount(response.data.count);
            }
        });
    };

    useEffect(() => {
        if (popover.open === true) {
            getNotifications();
        }
    }, [popover.open]);

    const getNotifications = () => {
        apiRequest(token).get(route('api.events')).then((response) => {
            if (response?.data?.events) {
                setNotifications(response.data.events);
            }
        });
    };

    const handleMarkAllAsRead = () => {
        apiRequest(token).get(route('api.events.read')).then((response) => {
            updateUnreadCount();

        });
    };


    const handleRemoveOne = (id) => {
        apiRequest(token).delete(route('api.events.delete', {id: id})).then((response) => {
            updateUnreadCount();
            getNotifications();
        });
    };


    useEffect(() => {
        updateUnreadCount();
    }, []);

    return (<>
        <Tooltip title="Notifications">
            <IconButton
                ref={popover.anchorRef}
                onClick={popover.handleOpen}
            >

                <Badge
                    color="error"
                    badgeContent={unreadCount}
                >
                    <SvgIcon>
                        <Bell01Icon/>
                    </SvgIcon>
                </Badge>
            </IconButton>
        </Tooltip>
        <NotificationsPopover
            anchorEl={popover.anchorRef.current}
            notifications={notifications}
            onClose={popover.handleClose}
            onMarkAllAsRead={handleMarkAllAsRead}
            onRemoveOne={handleRemoveOne}
            open={popover.open}
        />
    </>);
};
