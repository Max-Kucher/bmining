import {useDispatch, useSelector} from "react-redux";
import {
    logout,
    selectAuth,
    selectEmailVerified,
    selectTfaPassed,
    selectToken,
    selectUser,
    updateUser
} from "@/slices/userSlice";
import {useRouter} from "@/hooks/use-router";
import {Navigate, redirect} from "react-router";
import {useLocation} from "react-router-dom";
import apiRequest from "@/api/helper";
import {useEffect} from "react";

export function AuthWrapper({children}) {
    const user = useSelector(selectUser);

    const emailVerified = useSelector(selectEmailVerified);
    const tfaPassed = useSelector(selectTfaPassed);
    const location = useLocation();
    const isAuth = useSelector(selectAuth);
    const router = useRouter();
    const token = useSelector(selectToken);
    const dispatch = useDispatch();
    const updateUserRequest = () => {
        apiRequest(token).get('/api/user').then((response) => {
            if (response.status == 200) {
                dispatch(updateUser({
                    user: response.data.user,
                    emailVerified: response.data.emailVerified,
                    tfaPassed: response.data.tfaPassed,
                    permissions: response.data.permissions,
                }));
            } else {
                dispatch(logout());
            }
        });
    };
    useEffect(() => {
        updateUserRequest();
        let rotationInterval = setInterval(() => {
            updateUserRequest();
        }, 60000);

        //Clean up can be done like this
        return () => {
            clearInterval(rotationInterval);
        }
    }, []);


    if (isAuth !== true || user === undefined) {
        return <Navigate to={'/login'} replace/>;
    }

    if (emailVerified === false && !location.pathname.includes('email-verify')) {
        console.log(location.pathname);
        return <Navigate to={'/email-verify'} replace/>;
    }
    if (tfaPassed === false && !location.pathname.includes('tfa-pass')) {
        return <Navigate to={'/tfa-pass'} replace/>;
    }

    return <>
        {children}
    </>
}
