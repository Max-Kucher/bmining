import {Helmet} from "react-helmet-async";

export function Seo({title = null, children}) {

    if (title === null) {
        return <Helmet>
            {children}
        </Helmet>
    } else {
        return <Helmet>
            <title>{title}</title>
        </Helmet>;
    }
}
