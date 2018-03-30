import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, {
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';
import SaveIcon from 'material-ui-icons/Save'
import { lighten } from 'material-ui/styles/colorManipulator';
import { TextField } from 'material-ui'

let counter = 0;
function createData(name, student) {
    counter += 1;
    // return { id: counter, student.name, student.aadhar_id, student.school, student.district, student.state, '' }
    return {}
}

const columnData = [
    { id: 'aadhar_id', numeric: true, disablePadding: false, label: 'Aadhar ID' },
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'school', numeric: false, disablePadding: false, label: 'School' },
    { id: 'district', numeric: false, disablePadding: false, label: 'District' },
    { id: 'state', numeric: false, disablePadding: false, label: 'State'},
    { id: 'input', numeric: false, disablePadding: true, label: 'Value'},
];

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {columnData.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                numeric={column.numeric}
                                padding={column.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === column.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={order}
                                        onClick={this.createSortHandler(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

let EnhancedTableToolbar = props => {
    const { numSelected, classes, onSave, onDelete } = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subheading">
                        {numSelected} selected
          </Typography>
                ) : (
                        <Typography variant="title">List of Selected Students</Typography>
                    )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="Delete" onClick={onDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                        <Tooltip title="Filter list">
                            <IconButton aria-label="Filter list" onClick={onSave}>
                                <SaveIcon />
                            </IconButton>
                        </Tooltip>
                    )}
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 800,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class StudentTable extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            order: 'asc',
            orderBy: 'name',
            selected: [],
            data: [],
            page: 0,
            rowsPerPage: 30,
        }
    }

    componentWillReceiveProps(newProps){
        if(newProps.data && (newProps.data != this.state.data)){
            this.setState({
                data: newProps.data,
            })
        }
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const data =
            order === 'desc'
                ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

        this.setState({ data, order, orderBy });
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState({ selected: this.state.data.map(n => n.id) });
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    onValueChange = e => {
        const {ftype} = this.props
        let copyData = this.state.data.slice()
        let [aadhar_id, index] = e.target.name.split('-')
        if(ftype == 'number')
            copyData[parseFloat(index)].value = parseFloat(e.target.value)
        else
            copyData[parseFloat(index)].value = e.target.value 
        this.setState({ data: copyData })
    }

    onBlur = e => {
        this.props.onChange(this.state.data)
    }

    isSelected = id => this.state.selected.indexOf(id) !== -1; 

    render() {
        const { classes, ftype, fdefault } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length} 
                onSave={this.props.onSave}
                onDelete={() => {
                    this.props.onDelete(this.state.selected)
                    this.setState({
                        selected: []
                    })
                }}/>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((n, index) => {
                                const isSelected = this.isSelected(n.aadhar_id);
                                return (
                                    <TableRow
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={n.aadhar_id}
                                        selected={isSelected}
                                    >
                                        <TableCell 
                                            padding="checkbox"
                                            role="checkbox"
                                            onClick={
                                                event => this.handleClick(event, n.aadhar_id)
                                            }
                                        >
                                            <Checkbox checked={isSelected} />
                                        </TableCell>
                                        <TableCell numeric>{n.aadhar_id}</TableCell>
                                        <TableCell padding="none">{n.name}</TableCell>
                                        <TableCell >{n.school}</TableCell>
                                        <TableCell >{n.district}</TableCell>
                                        <TableCell >{n.state}</TableCell>
                                        <TableCell >
                                            <TextField
                                                type={ftype}
                                                name={`${n.aadhar_id.toString()}-${index}`} 
                                                value={n.value == null ? fdefault:n.value}
                                                onChange={this.onValueChange}
                                                onBlur={this.onBlur}
                                                /></TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    colSpan={6}
                                    count={data.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    backIconButtonProps={{
                                        'aria-label': 'Previous Page',
                                    }}
                                    nextIconButtonProps={{
                                        'aria-label': 'Next Page',
                                    }}
                                    rowsPerPageOptions={[10, 20, 30]}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </Paper>
        );
    }
}

export default withStyles(styles)(StudentTable);