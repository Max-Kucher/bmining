import Page from "@/pages/auth-demo/register/modern";
import {Layout} from "@/layouts/auth/modern-layout";
import {useSelector} from "react-redux";
import {selectAuth} from "@/slices/userSlice";
import {useRouter} from "@/hooks/use-router";
import {useEffect} from "react";

export default function Register() {
    const isAuth = useSelector(selectAuth);
    const router = useRouter();

    useEffect(() => {
        if (isAuth === true) {
            router.replace('/dashboard');
        }
    }, [isAuth]);


    return (
        <>
            <Layout>
                <Page/>
            </Layout>
        </>
    );
}
