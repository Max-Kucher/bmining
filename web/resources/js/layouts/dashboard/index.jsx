import PropTypes from 'prop-types';
import {useSettings} from '@/hooks/use-settings';
import {useSections} from './config';
import {VerticalLayout} from './vertical-layout';
import {useTheme} from "@mui/material/styles";

export const Layout = (props) => {
    const sections = useSections();

    const settings = useSettings();
    const theme = useTheme();


    return (<VerticalLayout
        sections={sections}
        navColor={settings.navColor}
        {...props} />);
};

Layout.propTypes = {
    children: PropTypes.node
};
