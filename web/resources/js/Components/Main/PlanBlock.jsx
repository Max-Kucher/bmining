import {Button} from "@mui/material";
import {Link} from "@inertiajs/react";

export function PlanBlock({title, link, params}) {
    return (<>
        <div className="plan-block">
            <div className="plan-block__head">
                <div className="plan-block__title">
                    {title}
                </div>
            </div>
            <div className="plan-block__body">
                {params}
            </div>
            <div className="plan-block__footer">
                {link}
            </div>
        </div>
    </>);
}

export function ParamsList({params = []}) {
    return (<>
        <div className="params-list">
            {params.map((item, idx) => {
                return (
                    <div key={idx} className="params-list__item">
                        <div className="param-label">{item.label}</div>
                        <div className="param-value">{item.value}</div>
                    </div>
                );
            })}
        </div>
    </>);
}

export function GetStartedButton({text, href, sx = {}}) {
    return (<>
        <Button component={href[0] == '#' ? 'a' : Link} href={href} fullWidth variant={'contained'} sx={{
            backgroundColor: '#FDB02B',
            textAlign: 'center',
            padding: '1.3125rem 0',
            borderRadius: '0.3125rem',
            width: '100%',
            ...sx,
        }}>{text}</Button>
    </>);
}
