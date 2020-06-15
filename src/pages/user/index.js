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
  Breadcrumbs,
  IconButton
} from "@material-ui/core";
import {
  Add as AddIcon,
  Group as GroupIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from "@material-ui/icons";
import CreateUser from "components/create_user";
import UpdateUser from "components/update_user";
import Confirm from "components/confirm";
import { user, progress, toast } from "redux/actions";

const StyledBreadcrumb = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      cursor: "pointer",
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
  { id: "role", disablePadding: false, label: "Role", align: "center" },
  { id: "action", disablePadding: false, label: "Actions", align: "center" }
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
  const [selectedRow, setSelected] = useState("");
  const [createUserOpen, setCreateUserOpen] = useState(false);
  const [updateUserOpen, setUpdateUserOpen] = useState(false);
  const [deleteUserOpen, setDeleteUserOpen] = useState(false);
  const {
    getUsers,
    users = [],
    setParams,
    params,
    count,
    user,
    deleteUser,
    showToast
  } = props;

  useEffect(() => {
    getUsers({ params });
  }, [params, user, count]);

  const handleChangePage = (event, newPage) => {
    setParams({ page: newPage + 1 });
  };

  const handleChangeLimitPage = event => {
    setParams({ limit: event.target.value, page: 1 });
  };

  const handleDeleteSubmit = () => {
    setDeleteUserOpen(false);

    deleteUser({
      id: selectedRow._id,
      body: {},
      success: () => {
        showToast({
          message: "You successfully deleted selected user!",
          intent: "success",
          timeout: 3000
        });
      },
      fail: err => {
        showToast({
          message: err.response.data.message,
          status: "error"
        });
      }
    });
  };

  return (
    <React.Fragment>
      <Container fixed>
        <Breadcrumbs aria-label="breadcrumb" className={classes.crumbs}>
          <StyledBreadcrumb
            component="a"
            href="#"
            label="Users"
            icon={<GroupIcon fontSize="small" />}
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
                        if (column.id === "action") {
                          return (
                            <TableCell align={column.align}>
                              <IconButton
                                aria-label="details"
                                onClick={() => {
                                  setSelected(row);
                                  setUpdateUserOpen(true);
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                aria-label="details"
                                onClick={() => {
                                  setSelected(row);
                                  setDeleteUserOpen(true);
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          );
                        }
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
        <CreateUser
          open={createUserOpen}
          handleClose={() => {
            setCreateUserOpen(false);
          }}
          classes={classes}
        />
        <UpdateUser
          open={updateUserOpen}
          handleClose={() => {
            setUpdateUserOpen(false);
          }}
          classes={classes}
          selectedRow={selectedRow}
        />
        <Confirm
          open={deleteUserOpen}
          confirmText="Do you want to remove this user?"
          handleClose={() => setDeleteUserOpen(false)}
          handleSubmit={handleDeleteSubmit}
          selectedRow={selectedRow}
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
  deleteUser: user.deleteUser,
  setParams: user.setParams,
  showToast: toast.showToast,
  setLoading: progress.setLoading
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
