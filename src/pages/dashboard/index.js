import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
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
  Box,
  Paper,
  Typography,
  Breadcrumbs,
  Chip,
  Slider,
  IconButton
} from "@material-ui/core";

import { Rating } from "@material-ui/lab";

import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Home as HomeIcon,
  MoreVert as MoreVertIcon
} from "@material-ui/icons";
import debounce from "lodash-es/debounce";

import CreateRestaurant from "components/create_restaurant";
import UpdateRestaurant from "components/update_restaurant";
import Confirm from "components/confirm";
import { restaurant, toast, progress } from "redux/actions";

const columns = [
  {
    id: "no",
    numieric: true,
    disablePadding: true,
    label: "No",
    align: "center"
  },
  { id: "name", numeric: true, label: "Name", align: "center" },
  { id: "user", disablePadding: true, label: "User", align: "center" },
  {
    id: "overall_rating",
    disablePadding: true,
    label: "Overall Rate",
    align: "center"
  },
  {
    id: "highest_rating",
    disablePadding: true,
    label: "Highest Rate",
    align: "center"
  },
  {
    id: "lowest_rating",
    disablePadding: true,
    label: "Lowest Rate",
    align: "center"
  },
  { id: "action", disablePadding: true, label: "Action", align: "center" }
];

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
  },
  dialog: {
    width: "30rem"
  },
  slider: {
    width: "20rem",
    margin: "auto"
  },
  user: {
    marginTop: "0.5rem"
  }
});

const Dashboard = props => {
  const classes = useStyles();
  const history = useHistory();
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [range, setRange] = useState([0, 5]);

  const {
    getRestaurants,
    deleteRestaurant,
    showToast,
    userInfo,
    restaurants = [],
    restaurant,
    setParams,
    params,
    count
  } = props;

  const setDebouncedParams = useCallback(
    debounce(newvalue => {
      if (newvalue && newvalue.length === 2) {
        setParams({ min: newvalue[0], max: newvalue[1] });
      }
    }, 1000),
    []
  );

  useEffect(() => {
    getRestaurants({ params });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, count, restaurant]);

  useEffect(() => {
    setDebouncedParams(range);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range]);

  const handleChangeRange = (event, newValue) => {
    setRange(newValue);
  };

  const handleChangePage = (event, newPage) => {
    setParams({ page: newPage + 1 });
  };

  const handleChangeLimitPage = event => {
    setParams({ limit: event.target.value, page: 1 });
  };

  const handleClick = event => {
    event.preventDefault();
  };

  const handleDeleteSubmit = () => {
    setDeleteOpen(false);

    deleteRestaurant({
      id: selectedRow._id,
      body: {},
      success: () => {
        showToast({
          message: "You successfully deleted selected restaurant!",
          intent: "success",
          timeout: 3000
        });
      },
      fail: err => {
        showToast({
          message: err.response.data.message,
          intent: "error"
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
            label="Restaurants"
            icon={<HomeIcon fontSize="small" />}
            onClick={handleClick}
          />
        </Breadcrumbs>
        <div className={classes.slider}>
          <Typography id="discrete-slider-custom" gutterBottom>
            Filter
          </Typography>
          <Slider
            value={range}
            onChange={handleChangeRange}
            min={0}
            max={5}
            step={0.01}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
          />
        </div>

        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map(column => {
                    if (column.id === "user" && userInfo.role !== "admin")
                      return null;
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {restaurants.map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map(column => {
                        const value =
                          column.id === "no"
                            ? params.limit * (params.page - 1) + index + 1
                            : row[column.id];
                        if (column.id === "user" && userInfo.role !== "admin")
                          return null;
                        else if (
                          column.id === "user" &&
                          userInfo.role === "admin"
                        ) {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {row[column.id].firstName +
                                " " +
                                row[column.id].lastName +
                                " (" +
                                row[column.id].email +
                                ")"}
                            </TableCell>
                          );
                        } else if (column.id === "action")
                          return (
                            <React.Fragment key={column.id}>
                              <TableCell align={column.align}>
                                {userInfo.role === "admin" && (
                                  <React.Fragment>
                                    <IconButton
                                      aria-label="details"
                                      onClick={() => {
                                        setSelectedRow(row);
                                        setUpdateOpen(true);
                                      }}
                                    >
                                      <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                      aria-label="details"
                                      onClick={() => {
                                        setSelectedRow(row);
                                        setDeleteOpen(true);
                                      }}
                                    >
                                      <DeleteIcon fontSize="small" />
                                    </IconButton>
                                  </React.Fragment>
                                )}
                                <IconButton
                                  aria-label="details"
                                  onClick={() => {
                                    history.push(`/restaurants/${row._id}`);
                                  }}
                                >
                                  <MoreVertIcon fontSize="small" />
                                </IconButton>
                              </TableCell>
                            </React.Fragment>
                          );
                        else if (
                          column.id === "overall_rating" ||
                          column.id === "highest_rating" ||
                          column.id === "lowest_rating"
                        )
                          return (
                            <React.Fragment key={column.id}>
                              <TableCell align={column.align}>
                                <Box
                                  mb={3}
                                  className={classes.boxMargin}
                                  borderColor="transparent"
                                >
                                  <Rating
                                    name="read-only"
                                    value={value}
                                    precision={0.1}
                                    readOnly
                                  />
                                </Box>
                              </TableCell>
                            </React.Fragment>
                          );
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
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
        {(userInfo.role === "owner" || userInfo.role === "admin") && (
          <Chip
            className={classes.restaurant}
            icon={<AddIcon />}
            color="primary"
            label="Create restaurant"
            onClick={() => setCreateOpen(true)}
          />
        )}
      </Container>
      <Confirm
        open={deleteOpen}
        confirmText="Do you want to remove this restaurant?"
        handleClose={() => setDeleteOpen(false)}
        handleSubmit={handleDeleteSubmit}
        selectedRow={selectedRow}
      />
      <CreateRestaurant
        handleClose={() => setCreateOpen(false)}
        classes={classes}
        open={createOpen}
      />
      <UpdateRestaurant
        handleClose={() => setUpdateOpen(false)}
        classes={classes}
        open={updateOpen}
        selectedRow={selectedRow}
      />
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  params: state.restaurant.params,
  restaurants: state.restaurant.restaurants,
  restaurant: state.restaurant.currentRestaurant,
  userInfo: state.auth.me,
  count: state.restaurant.count
});

const mapDispatchToProps = {
  getRestaurants: restaurant.getRestaurants,
  createRestaurant: restaurant.createRestaurant,
  updateRestaurant: restaurant.updateRestaurant,
  deleteRestaurant: restaurant.deleteRestaurant,
  setParams: restaurant.setParams,
  showToast: toast.showToast,
  setLoading: progress.setLoading
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
