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
  Add as AddIcon,
  Home as HomeIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Reply as ReplyIcon
} from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";
import moment from "moment";
import { review, toast } from "redux/actions";
import CreateReview from "components/create_review";
import UpdateReview from "components/update_review";
import ReplyModal from "components/reply_modal";
import Confirm from "components/confirm";

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
  const {
    getReviews,
    deleteReview,
    showToast,
    reviews,
    me,
    params,
    setParams,
    count,
    currentReview
  } = props;
  const [createOpen, setCreateModalOpen] = useState(false);
  const [updateOpen, setUpdateModalOpen] = useState(false);
  const [replyOpen, setReplyModalOpen] = useState(false);
  const [deleteReviewOpen, setDeleteReviewOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState({});
  const { id } = props.match.params;

  useEffect(() => {
    getReviews({ params, id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, currentReview, count]);

  const handleChangePage = (event, newPage) => {
    setParams({ page: newPage + 1 });
  };

  const handleChangeLimitPage = event => {
    setParams({ limit: event.target.value, page: 1 });
  };

  const handleDeleteSubmit = () => {
    setDeleteReviewOpen(false);

    deleteReview({
      id: selectedReview._id,
      body: {},
      success: () => {
        showToast({
          message: "You successfully deleted selected review!",
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
                    else return null;
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {reviews.map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map(column => {
                        if (me.role === "regular" && column.id === "action")
                          return null;
                        const value =
                          column.id === "no"
                            ? (params.page - 1) * params.limit + index + 1
                            : row[column.id];
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
                                    setSelectedReview(row);
                                    setReplyModalOpen(true);
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
                                      setSelectedReview(row);
                                      setUpdateModalOpen(true);
                                    }}
                                  >
                                    <EditIcon fontSize="small" />
                                  </IconButton>
                                  <IconButton
                                    aria-label="delete"
                                    onClick={() => {
                                      setDeleteReviewOpen(true);
                                      setSelectedReview(row);
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
                                    precision={0.25}
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
                              ? moment(value).format("YYYY/MM/DD hh:mm:ss")
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
        {(me.role === "admin" ||
          (me.role === "regular" && !reviews.length)) && (
          <Chip
            className={classes.comment}
            icon={<AddIcon />}
            color="primary"
            label="Add a review"
            onClick={() => setCreateModalOpen(true)}
          />
        )}
        <CreateReview
          id={id}
          open={createOpen}
          handleClose={() => setCreateModalOpen(false)}
        />
        <ReplyModal
          id={id}
          open={replyOpen}
          handleClose={() => setReplyModalOpen(false)}
          selectRow={selectedReview}
        />
        <UpdateReview
          id={id}
          open={updateOpen}
          handleClose={() => setUpdateModalOpen(false)}
          selectedRow={selectedReview}
        />
        <Confirm
          open={deleteReviewOpen}
          confirmText="Do you want to remove this review?"
          handleClose={() => setDeleteReviewOpen(false)}
          handleSubmit={handleDeleteSubmit}
          selectedRow={selectedReview}
        />
      </Container>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  me: state.auth.me,
  reviews: state.review.reviews,
  count: state.review.count,
  params: state.review.params,
  currentReview: state.review.currentReview
});

const mapDispatchToProps = {
  getReviews: review.getReviews,
  deleteReview: review.deleteReview,
  setParams: review.setParams,
  showToast: toast.showToast
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailedView);
