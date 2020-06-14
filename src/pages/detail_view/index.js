import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { emphasize, makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Container,
  Box,
  Breadcrumbs,
  Chip,
  IconButton
} from "@material-ui/core";
import {
  Create as CreateIcon,
  Home as HomeIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Reply as ReplyIcon
} from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";
import moment from "moment";
import { review } from "redux/actions";

const columns = [
  {
    id: "no",
    numieric: true,
    disablePadding: true,
    label: "No",
    align: "center",
    maxWidth: "1rem"
  },
  {
    id: "rate",
    numeric: true,
    label: "Rate",
    align: "center",
    maxWidth: "10rem"
  },
  {
    id: "comment",
    disablePadding: true,
    label: "Comment",
    align: "center",
    maxWidth: "18rem"
  },
  {
    id: "reply",
    disablePadding: true,
    label: "Reply",
    align: "center",
    maxWidth: "18rem"
  },
  {
    id: "date",
    disablePadding: true,
    label: "Date of the visit",
    align: "center",
    maxWidth: "9rem"
  },
  {
    id: "action",
    disablePadding: true,
    label: "Action",
    align: "center",
    maxWidth: "5rem"
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: "1rem",
    width: "100%"
  },
  inline: {
    display: "inline"
  },
  crumbs: {
    marginTop: "1rem"
  },
  itemRoot: {
    flexGrow: 1
  },
  comment: {
    marginTop: "1rem",
    float: "right"
  },
  textField: {
    width: "100%"
  },
  container: {
    maxHeight: 650
  },
  boxMargin: {
    marginBottom: 0
  },
  actiondiv: {
    display: "flex"
  }
}));

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

const DetailedView = props => {
  const classes = useStyles();
  const history = useHistory();
  const { getReviews, reviews, me, params, setParams, count } = props;
  const [open, setOpen] = useState(false);
  const [rate, setRate] = useState(0);
  const [deleteOpen, setDeleteModalOpen] = useState(false);
  const [fieldValue, setFieldValue] = useState("");
  const [reviewSelected, setSelectedReview] = useState("");
  const [reply, addReply] = useState("");
  const [createOrEdit, setCreateOrEdit] = useState(true);
  const { id } = props.match.params;

  useEffect(() => {
    getReviews({ params, id });
  }, [params]);

  const handleChangePage = (event, newPage) => {
    setParams({ page: newPage });
  };

  const handleChangeRowsPerPage = event => {
    setParams({ limit: event.target.value, page: 1 });
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
            label="Dashboard"
            icon={<HomeIcon fontSize="small" />}
            onClick={() => history.push("/restaurants")}
          />
          <StyledBreadcrumb component="a" href="#" label="Details" />
        </Breadcrumbs>
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map(column => {
                    if (column.id !== "action")
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ width: column.maxWidth }}
                        >
                          {column.label}
                        </TableCell>
                      );
                    else if (me.role !== "regular")
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ width: column.maxWidth }}
                        >
                          {column.label}
                        </TableCell>
                      );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {reviews.map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map(column => {
                        if (me.role === "regular" && column.id === "action")
                          return;
                        const value =
                          column.id === "no" ? index + 1 : row[column.id];
                        if (column.id === "action" && me.role === "owner")
                          return (
                            <React.Fragment key={column.id}>
                              <TableCell
                                align={column.align}
                                style={{ width: column.maxWidth }}
                              >
                                <IconButton
                                  aria-label="reply"
                                  onClick={() => {
                                    setSelectedReview(row._id);
                                    openDialog();
                                  }}
                                >
                                  <ReplyIcon fontSize="small" />
                                </IconButton>
                              </TableCell>
                            </React.Fragment>
                          );
                        else if (column.id === "action" && me.role === "admin")
                          return (
                            <React.Fragment key={column.id}>
                              <TableCell
                                align={column.align}
                                style={{ width: column.maxWidth }}
                              >
                                <div className={classes.actiondiv}>
                                  <IconButton
                                    aria-label="edit"
                                    onClick={() => {
                                      setSelectedReview(row._id);
                                      setRate(row.rate);
                                      setFieldValue(row.comment);
                                      addReply(row.reply);
                                      setCreateOrEdit(false);
                                      openDialog();
                                    }}
                                  >
                                    <EditIcon fontSize="small" />
                                  </IconButton>
                                  <IconButton
                                    aria-label="delete"
                                    onClick={() => {
                                      setSelectedReview(row._id);
                                      setDeleteModalOpen(true);
                                    }}
                                  >
                                    <DeleteIcon fontSize="small" />
                                  </IconButton>
                                </div>
                              </TableCell>
                            </React.Fragment>
                          );
                        else if (column.id === "rate")
                          return (
                            <React.Fragment key={column.id}>
                              <TableCell
                                align={column.align}
                                style={{ width: column.maxWidth }}
                              >
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
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ width: column.maxWidth }}
                          >
                            {column.id === "date"
                              ? moment(value).format("YYYY-MM-DD")
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
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        {me.role !== "owner" && (
          <Chip
            className={classes.comment}
            icon={<CreateIcon />}
            color="primary"
            label="Leave a comment"
            onClick={openDialog}
          />
        )}
      </Container>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  me: state.auth.me,
  reviews: state.review.reviews,
  count: state.review.count,
  params: state.review.params
});

const mapDispatchToProps = {
  getReviews: review.getReviews,
  setParams: review.setParams
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailedView);
