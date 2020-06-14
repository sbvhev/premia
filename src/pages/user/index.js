import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { emphasize, makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Container,
  Paper,
  Chip,
  Breadcrumbs
} from "@material-ui/core";
import { Add as AddIcon, Home as HomeIcon } from "@material-ui/icons";
import { user, progress, toast } from "redux/actions";

const StyledBreadcrumb = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.grey[300]
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12)
    }
  }
}))(Chip);

const columns = [
  { id: "no", numieric: false, disablePadding: true, label: "No" },
  {
    id: "firstName",
    numeric: true,
    label: "First Name",
    align: "center"
  },
  {
    id: "lastName",
    numeric: true,
    disablePadding: false,
    label: "Last Name",
    align: "center"
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email",
    align: "center"
  },
  {
    id: "role",
    disablePadding: false,
    label: "Role",
    align: "center"
  }
];

const useStyles = makeStyles({
  root: {
    marginTop: "1rem",
    width: "100%"
  },
  container: {
    maxHeight: 640
  },
  createbutton: {
    float: "right"
  },
  boxMargin: {
    marginBottom: 0
  },
  crumbs: {
    marginTop: "1rem"
  },
  restaurant: {
    float: "right",
    marginTop: "1rem"
  }
});

const User = props => {
  const classes = useStyles();
  const [selected, setSelected] = useState("");
  const [createUserOpen, setCreateUserOpen] = useState(false);
  const { getUsers, users = [], setParams, params, count, user } = props;

  useEffect(() => {
    getUsers({ params });
  }, [params, count, user]);

  const handleChangePage = (event, newPage) => {
    setParams({ page: newPage + 1 });
  };

  const handleChangeLimitPage = event => {
    setParams({ limit: event.target.value, page: 1 });
  };

  return (
    <React.Fragment>
      <Container fixed>
        <Breadcrumbs aria-label="breadcrumb" className={classes.crumbs}>
          <StyledBreadcrumb
            component="a"
            href="#"
            label="Users"
            icon={<HomeIcon fontSize="small" />}
          />
        </Breadcrumbs>
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map(column => {
                        const value =
                          column.id === "no" ? index + 1 : row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 50]}
            component="div"
            count={count}
            rowsPerPage={params.limit}
            page={params.page - 1}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeLimitPage}
          />
        </Paper>
        <Chip
          className={classes.restaurant}
          icon={<AddIcon />}
          color="primary"
          label="Create User"
          onClick={() => setCreateUserOpen(true)}
        />
      </Container>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  users: state.user.users,
  params: state.user.params,
  count: state.user.count,
  user: state.user.user
});

const mapDispatchToProps = {
  getUsers: user.getUsers,
  createUser: user.createUser,
  setParams: user.setParams,
  showToast: toast.showToast,
  setLoading: progress.setLoading
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
