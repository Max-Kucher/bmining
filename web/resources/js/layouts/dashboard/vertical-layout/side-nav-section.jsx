import PropTypes from 'prop-types';
import {Box, Stack} from '@mui/material';
import {SideNavItem} from './side-nav-item';

const renderItems = ({depth = 0, items, pathname = ''}) => items.reduce((acc,
                                                                         item) => reduceChildRoutes({
    acc,
    depth,
    item,
    pathname
}), []);

const reduceChildRoutes = ({acc, depth, item, pathname = ''}) => {
    let pathname1 = '';
    const checkPath = !!(item.path && pathname1);
    const partialMatch = checkPath ? pathname1.includes(item.path) : false;
    const exactMatch = checkPath ? pathname1 === item.path : false;

    if (item.items) {
        acc.push(
            <SideNavItem
                active={partialMatch}
                depth={depth}
                disabled={item.disabled}
                icon={item.icon}
                key={item.title}
                label={item.label}
                open={partialMatch}
                title={item.title}
            >
                <Stack
                    component="ul"
                    spacing={0.5}
                    sx={{
                        listStyle: 'none',
                        m: 0,
                        p: 0
                    }}
                >
                    {renderItems({
                        depth: depth + 1,
                        items: item.items,
                        pathname
                    })}
                </Stack>
            </SideNavItem>
        );
    } else {
        acc.push(
            <SideNavItem
                active={exactMatch}
                depth={depth}
                disabled={item.disabled}
                external={item.external}
                icon={item.icon}
                key={item.title}
                label={item.label}
                path={item.path}
                title={item.title}
            />
        );
    }

    return acc;
};

export const SideNavSection = (props) => {
    const {items = [], pathname = '', subheader = '', ...other} = props;

    return (
        <Stack
            component="ul"
            spacing={0.5}
            sx={{
                listStyle: 'none',
                m: 0,
                p: 0
            }}
            {...other}>
            {subheader && (
                <Box
                    component="li"
                    sx={{
                        // color: 'var(--nav-section-title-color)',
                        color: 'var(--nav-section-title-color)',
                        fontSize: 12,
                        fontWeight: 700,
                        lineHeight: 1.66,
                        mb: 1,
                        ml: 1,
                        textTransform: 'uppercase'
                    }}
                >
                    {subheader}
                </Box>
            )}
            {renderItems({items, pathname})}
        </Stack>
    );
};

SideNavSection.propTypes = {
    items: PropTypes.array,
    pathname: PropTypes.string,
    subheader: PropTypes.string
};
