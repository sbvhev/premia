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
  Dehaze as DehazeIcon,
  Home as HomeIcon,
  MoreVert as MoreVertIcon
} from "@material-ui/icons";
import debounce from "lodash-es/debounce";

import ManageRestaurant from "components/manage_restaurant";
import Confirm from "components/confirm";
import { restaurant, toast } from "redux/actions";

const columns = [
  {
    id: "no",
    numieric: true,
    disablePadding: true,
    label: "No",
    align: "center"
  },
  {
    id: "name",
    numeric: true,
    label: "Name",
    align: "center"
  },
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
  {
    id: "action",
    disablePadding: true,
    label: "Action",
    align: "center"
  }
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
  }
});

const Dashboard = props => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [fieldValue, setFieldValue] = useState("");
  const [selectedRow, setSelctedRow] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [range, setRange] = useState([0, 5]);

  const {
    getRestaurants,
    createRestaurant,
    updateRestaurant,
    userInfo,
    restaurants = [],
    showToast,
    setParams,
    params,
    filter
  } = props;

  const setDebouncedParams = useCallback(
    debounce(newvalue => {
      if (newvalue && newvalue.length == 2) {
        setParams({ min: newvalue[0], max: newvalue[1] });
      }
    }, 1000),
    []
  );

  useEffect(() => {
    getRestaurants({ params });
  }, [params]);

  useEffect(() => {
    setDebouncedParams(range);
  }, [range]);

  const handleChangeRange = (event, newValue) => {
    setRange(newValue);
  };

  const handleChangePage = (event, newPage) => {
    setParams({ page: newPage });
  };

  const handleChangeRowsPerPage = event => {
    console.log(event.target.value);
    setParams({ limit: event.target.value, page: 1 });
  };

  const handleClick = event => {
    event.preventDefault();
  };

  const fieldChange = event => {
    setFieldValue(event.target.value);
  };

  const handleClose = () => {
    setFieldValue("");
    setOpen(false);
  };

  const handleSave = () => {
    if (selectedRow !== "") updateRestaurant(fieldValue, selectedRow);
    else {
      createRestaurant(fieldValue);
    }
  };

  const openDialog = () => {
    setOpen(true);
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
                {restaurants.map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map(column => {
                        const value =
                          column.id === "no" ? index + 1 : row[column.id];
                        if (column.id === "action")
                          return (
                            <React.Fragment key={column.id}>
                              <TableCell align={column.align}>
                                {userInfo.role === "admin" && (
                                  <React.Fragment>
                                    <IconButton
                                      aria-label="details"
                                      onClick={() => {
                                        setFieldValue(row.name);
                                        setSelctedRow(row._id);
                                        openDialog();
                                      }}
                                    >
                                      <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                      aria-label="details"
                                      onClick={() => {
                                        setSelctedRow(row._id);
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
                                    precision={0.5}
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
            count={restaurants.length}
            rowsPerPage={params.limit}
            page={params.page - 1}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        {(userInfo.role === "owner" || userInfo.role === "admin") && (
          <Chip
            className={classes.restaurant}
            icon={<AddIcon />}
            color="primary"
            label="Create restaurant"
            onClick={openDialog}
          />
        )}
      </Container>
      <Confirm
        open={deleteOpen}
        confirmText="Do you want to remove this restaurant?"
        handleDisagree={() => setDeleteOpen(false)}
        handleAgree={() => {
          setDeleteOpen(false);
          setSelctedRow("");
        }}
      />
      <ManageRestaurant
        handleSave={handleSave}
        handleClose={handleClose}
        classes={classes}
        selectedRow={selectedRow}
        open={open}
        fieldChange={fieldChange}
        fieldValue={fieldValue}
      />
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  params: state.restaurant.params,
  restaurants: state.restaurant.restaurants,
  userInfo: state.auth.me
});

const mapDispatchToProps = {
  getRestaurants: restaurant.getRestaurants,
  createRestaurant: restaurant.createRestaurant,
  updateRestaurant: restaurant.updateRestaurant,
  setParams: restaurant.setParams,
  showToast: toast.showToast
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
