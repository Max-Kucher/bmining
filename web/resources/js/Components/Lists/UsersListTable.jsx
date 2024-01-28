import numeral from 'numeral';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import {
    Avatar,
    Badge,
    Box,
    Button,
    Checkbox,
    IconButton,
    Stack,
    SvgIcon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import {getInitials} from '@/utils/get-initials';
import {SeverityPill} from "@/Components/severity-pill";
import {format, parseISO} from "date-fns";
import AutocompleteInputAdd from "@/Components/Inputs/AutocompleteInputAdd";
import {useState} from "react";
import {RouterLink} from "@/Components/router-link";

export const UsersListTable = ({statuses = [], onFiltersChange, ...props}) => {


    const {
        count = 0, items = [], onDeselectAll, onDeselectOne, onPageChange = () => {
        }, onRowsPerPageChange, onSelectAll, onSelectOne, page = 0, rowsPerPage = 0, selected = []
    } = props;

    const selectedSome = (selected.length > 0) && (selected.length < items.length);
    const selectedAll = (items.length > 0) && (selected.length === items.length);
    const enableBulkActions = selected.length > 0;

    const [currentSearchStatus, setCurrentSearchStatus] = useState('');
    const mapStatuses = function (statuses) {
        return statuses.map((statusTitle) => {
            return {
                title: statusTitle
            };
        });
    };

    const statusMap = {
        'new': 'success', 'blocked': 'error', 'pending': 'warning',
    };

    return (<Box sx={{position: 'relative'}}>
        {enableBulkActions && (<Stack
            direction="row"
            spacing={2}
            sx={{
                alignItems: 'center',
                backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.50',
                display: enableBulkActions ? 'flex' : 'none',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                px: 2,
                py: 0.5,
                zIndex: 10
            }}
        >
            <Checkbox
                checked={selectedAll}
                indeterminate={selectedSome}
                onChange={(event) => {
                    if (event.target.checked) {
                        onSelectAll?.();
                    } else {
                        onDeselectAll?.();
                    }
                }}
            />
            <Button
                color="inherit"
                size="small"
            >
                Delete
            </Button>
            <Button
                color="inherit"
                size="small"
            >
                Edit
            </Button>
        </Stack>)}
        {/*<Scrollbar sx={{'& .simplebar-placeholder': 'display: none'}}>*/}
        <Table sx={{minWidth: 700}}>
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            checked={selectedAll}
                            indeterminate={selectedSome}
                            onChange={(event) => {
                                if (event.target.checked) {
                                    onSelectAll?.();
                                } else {
                                    onDeselectAll?.();
                                }
                            }}
                        />
                    </TableCell>
                    <TableCell>
                        Name
                    </TableCell>
                    <TableCell>
                        Location
                    </TableCell>
                    <TableCell>
                        Miners
                    </TableCell>
                    <TableCell title={'Total deposits'}>
                        Deposits
                        <br/>
                        sum
                    </TableCell>
                    <TableCell>
                        <div style={{
                            display: 'flex', flexFlow: 'column nowrap',
                        }}>
                            <div>
                                Status
                            </div>
                            <div>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    onFiltersChange({
                                        status: currentSearchStatus,
                                    });
                                }}>
                                    <AutocompleteInputAdd
                                        options={mapStatuses(statuses)}
                                        variant={'standard'}
                                        value={currentSearchStatus}
                                        setValue={(val) => {
                                            let valToSave = val;
                                            if (typeof val == 'string') {
                                                valToSave = val;
                                            } else {
                                                valToSave = val.inputValue;
                                            }
                                            setCurrentSearchStatus(valToSave);
                                        }} name={'status'}/>
                                </form>
                            </div>
                        </div>

                    </TableCell>
                    <TableCell align="right">
                        Actions
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {items.map((customer) => {
                    const customerId = customer.id;
                    const isSelected = selected.includes(customerId);
                    const lastVisitDate = format(parseISO(customer.last_visit), 'dd MMM, yyyy HH:mm:ss');
                    return (<TableRow
                        hover
                        key={customerId}
                        selected={isSelected}
                    >
                        <TableCell padding="checkbox">
                            <Checkbox
                                checked={isSelected}
                                onChange={(event) => {
                                    if (event.target.checked) {
                                        onSelectOne?.(customerId);
                                    } else {
                                        onDeselectOne?.(customerId);
                                    }
                                }}
                                value={isSelected}
                            />
                        </TableCell>
                        <TableCell>
                            <Stack
                                alignItems="center"
                                direction="row"
                                spacing={1}
                            >
                                {customer.isOnline ? <Badge
                                    anchorOrigin={{
                                        horizontal: 'right', vertical: 'bottom'
                                    }}
                                    color="success"
                                    variant="dot"
                                >
                                    <Avatar
                                        title={lastVisitDate}
                                        src={customer.avatar}
                                        sx={{
                                            height: 42, width: 42
                                        }}
                                    >
                                        {getInitials(customer.name)}
                                    </Avatar>
                                </Badge> : <Avatar
                                    title={lastVisitDate}
                                    src={customer.avatar}
                                    sx={{
                                        height: 42, width: 42
                                    }}
                                >
                                    {getInitials(customer.name)}
                                </Avatar>}
                                <div>
                                    <Box
                                        color="inherit"
                                        sx={{textDecoration: 'none'}}
                                        component={RouterLink}
                                        to={route('manage.users.show', {id: customerId})}
                                        variant="subtitle2"
                                    >
                                        {customer.name}
                                    </Box>
                                    <Typography
                                        color="text.secondary"
                                        variant="body2"
                                    >
                                        {customer.email}
                                    </Typography>
                                    <Typography
                                        color="text.secondary"
                                        variant="body2"
                                    >
                                        Phone: {customer.phone}
                                    </Typography>
                                </div>
                            </Stack>
                        </TableCell>
                        <TableCell>
                            {customer.geo ?? 'unkown'}
                        </TableCell>
                        <TableCell>
                            {customer.totalMiners}
                        </TableCell>
                        <TableCell>
                            <Typography color={customer.totalDeposit > 0 ? 'green' : 'primary'}>
                                {numeral(customer.totalDeposit).format('0,0$')}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle2">
                                <SeverityPill color={statusMap[customer.status] ?? 'primary'}>
                                    {customer.status}
                                </SeverityPill>
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <IconButton
                                component={RouterLink}
                                href={route('manage.users.edit', {id: customerId})}
                            >
                                <SvgIcon>
                                    <Edit02Icon/>
                                </SvgIcon>
                            </IconButton>
                            <IconButton
                                component={RouterLink}
                                href={route('manage.users.show', {id: customerId})}
                            >
                                <SvgIcon>
                                    <ArrowRightIcon/>
                                </SvgIcon>
                            </IconButton>
                        </TableCell>
                    </TableRow>);
                })}
            </TableBody>
        </Table>
        {/*</Scrollbar>*/}
        <TablePagination
            component="div"
            count={count}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
        />
    </Box>);
};

UsersListTable.propTypes = {
    count: PropTypes.number,
    items: PropTypes.array,
    onDeselectAll: PropTypes.func,
    onDeselectOne: PropTypes.func,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    onSelectAll: PropTypes.func,
    onSelectOne: PropTypes.func,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    selected: PropTypes.array
};
