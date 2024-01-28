import {Link} from 'react-router-dom'
export function CommonLink({children, href, sx = {}, color = '#4B4B4B'}) {
    return (
        <Link style={{
            color: color,
            textDecoration: 'none',

            ...sx,
        }} component={Link} to={href}>
            {children}
        </Link>
    );
}
