import {Layout} from "@/layouts/auth/modern-layout";
import ForgotPasswordForm from "@/Forms/ForgotPasswordForm";

export default function ForgotPassword({status}) {
    return (
        <>
            <Layout>
                <ForgotPasswordForm/>
            </Layout>
        </>
    );
}
