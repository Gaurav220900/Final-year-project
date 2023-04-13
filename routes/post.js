const express = new express();
const router = express();
const postModel = require("../src/model/post");

router.post("/post", (req, res) => {
  let response = {
    status: false,
  };

  let body = req.body;

  let postObj = new postModel(body);
  postObj
    .save()
    .then((data) => {
      (response.status = true), (response.data = data);
      res.send(response);
    })
    .catch((err) => {
      response.error = err;
      res.send(response);
    });
});

router.get("/posts", (req, res) => {
  let response = {
    status: false,
  };

  let skip =
    typeof req.query.skip !== "undefined" && req.query.skip >= 0
      ? parseInt(req.query.skip)
      : 0;
  let limit =
    typeof req.query.limit !== "undefined" && req.query.limit > 0
      ? parseInt(req.query.limit)
      : 10;

  var cond = [
    {
      $facet: {
        totalData: [
          { $match: {} },
          { sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
        ],
        totalCount: [{ $count: "count" }],
      },
    },
  ];

  postModel.aggregate(cond).exec(function (err, data) {
    if (err) {
      return res.status(200).json({
        status: false,
        message: "Get Error While Getting Data",
        error: err,
      });
    } else {
      if (!!data) {
        res.status(200).json({
          status: true,
          data: data,
        });
      } else {
        res.status(200).json({
          status: false,
          message: "No Data Available",
        });
      }
    }
  });
});

router.get("/post/:id", async (req, res) => {
  let response = {
    status: false,
  };

  const postId = req.params.id;
  if (_.isUndefined(postId) || _isEmpty(postId)) {
    response.message = "Invalid Id";
    res.send(response);
  }

  postModel
    .findById({ _id: mongoose.Types.ObjectId(postId) })
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

router.delete("/post/:id", async (req, res) => {
  let response = {
    status: false,
  };

  const postId = req.params.id;
  if (_.isUndefined(postId) || _isEmpty(postId)) {
    response.message = "Invalid Id";
    res.send(response);
  }

  postModel
    .deleteOne({ _id: mongoose.Types.ObjectId(postId) })
    .then((doc) => {
      response.status = true;
      response.data = doc;
      (response.message = "Post deleted Successfully"), res.send(response);
    })
    .catch((err) => {
      response.error = err;
      res.send(response);
    });
});

router.put("/post/:id", async (req, res) => {
  let response = {
    status: false,
  };

  const postId = req.params.id;
  if (_.isUndefined(postId) || _isEmpty(postId)) {
    response.message = "Invalid Id";
    res.send(response);
  }

  const body = req.body;
  const update = body.fields;
  const filter = { _id: mongoose.Types.ObjectId(postId) };
  postModel
    .findOneAndUpdate(filter, update, {
      new: true,
    })
    .then((doc) => {
      response.status = true;
      response.data = doc;
      (response.message = "Post deleted Successfully"), res.send(response);
    })
    .catch((err) => {
      response.error = err;
      res.send(response);
    });
});
