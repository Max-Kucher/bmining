import Page from "@/pages/auth-demo/login/modern";
import {Layout} from "@/layouts/auth/modern-layout";
import LightWrapper from "@/Components/Wrappers/LIghtWrapper";

export default function Login({status, canResetPassword}) {

    return (<>
            <LightWrapper>
                <Layout>
                    <Page/>
                </Layout>
            </LightWrapper>
        </>
    );
}
