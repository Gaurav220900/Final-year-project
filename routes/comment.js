const express = require("express");
const router = express();
const commentModel = require("../src/model/comment");

router.post("/comment", async (req, res) => {
  let response = {
    status: false,
  };

  let body = req.body;
  body.userId = res.locals.user._id;

  let commentObj = new commentModel(body);
  commentObj
    .save()
    .then((doc) => {
      response.data = doc;
      response.status = true;
      res.send(response);
    })
    .catch((err) => {
      response.error = err;
      res.send(response);
    });
});

router.get("/comments/:postId", async (req, res) => {
  let response = {
    status: false,
  };

  const postId = req.params.postId;
  if (_.isUndefined(postId) || isEmpty(postId)) {
    response.message("Invalid id");
    res.send(response);
  }
});

router.put("/comment", async (req, res) => {
  let response = {
    status: false,
  };

  let body = req.body;

  const filter = {
    _id: mongoose.Types.ObjectId(body.commentId),
    postId: mongoose.Types.ObjectId(body.postId),
    userId: mongoose.Types.ObjectId(res.locals.user._id),
  };
  const update = body.fields;

  commentModel
    .findOneAndUpdate(filter, update, {
      new: true,
    })
    .then((doc) => {
      response.status = true;
      response.data = doc;
      res.send(response);
    })
    .catch((err) => {
      response.error = err;
      res.send(response);
    });
});

router.post("/comment/delete", async (req, res) => {
  let response = {
    status: false,
  };
  const body = req.body;
  commentModel
    .deleteOne({
      _id: mongoose.Types.ObjectId(body.commentId),
      postId: mongoose.Types.ObjectId(body.postId),
      userId: mongoose.Types.ObjectId(res.locals.user._id),
    })
    .then((doc) => {
      response.status = true;
      response.data = doc;
      res.send(response);
    })
    .catch((err) => {
      response.error = err;
      res.send(response);
    });
});
