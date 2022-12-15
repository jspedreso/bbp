const router = express.Router();

router.param("user_id", (req, res, next, id) => {
  console.log("sulod1");
  // sample user, would actually fetch from DB, etc...
  req.user = {
    id,
    name: "TJ",
  };
  next();
});

router
  .all((req, res, next) => {
    res.json(req.user);
  })
  .route("/:user_id")

  .get((req, res, next) => {
    res.json(req.user);
  })
  .put((req, res, next) => {
    // just an example of maybe updating the user
    req.user.name = req.params.name;
    // save user ... etc
    res.json(req.user);
  })
  .post((req, res, next) => {
    next(new Error("not implemented"));
  })
  .delete((req, res, next) => {
    next(new Error("not implemented"));
  });
