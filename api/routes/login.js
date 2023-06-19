const express = require("express");
const app = express();
const router = express.Router();
const bbp = require("../dbconnect");
const jwt = require("jsonwebtoken");
const db = "bbp";
router.param("login", (req, res, next, id) => {
  next();
});

router.post("/", (req, res, next) => {
  var where = " ";
  for (const [key, value] of Object.entries(req.body)) {
    where += where == " " ? `WHERE ${key} LIKE '%${value}%'` : ` AND ${key} like '%${value}%' LIMIT 1`;
  }
  var sql = `SELECT * FROM bbp.user ${where}`;
  console.log(sql);
  /*  const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
    expiresIn: "2h",
  }); */
  bbp.query(sql, (err, results, fields) => {
    var token = "";
    var data = {};
    if (results.length > 0) {
      let jwtSecretKey = process.env.JWT_SECRET_KEY;
      console.log(results.length);
      data = {
        username: results[0].username,
        firstName: results[0].firstName,
        lastName: results[0].lastName,
        userId: results[0].userId,
        time: Date(),
      };
      token = jwt.sign(data, jwtSecretKey);
    }

    res.send({ token: token, data: data });
  });
  /*   res.send({
    token: token,
  }); */
});

router.get("/", (req, res, next) => {
  res.send({
    token: "test123",
  });
  /*  var filters = req.query;
  var pageSize = filters.pageSize;
  var pageIndex = filters.pageIndex;
  var colFilters = filters.colFilters;
  var where = " ";
  if ("colFilters" in filters) {
    for (const [arrKey, row] of Object.entries(colFilters)) {
      where += where == " " ? `WHERE ${row.id} LIKE '%${row.value}%'` : ` AND ${row.id} like '%${row.value}%'`;
    }
  }

  var sql = `SELECT * FROM bbp.user ${where} LIMIT ${pageIndex},${pageSize}`;

  bbp.query(sql, (err, results, fields) => {
    res.send(results);
  }); */
});

router.put("/", (req, res, next) => {
  values = req.body;
  /*   console.log(req); */
  console.log(values);
  /*   console.log(req.files); */
  let sql = "UPDATE permit SET ? WHERE ?";
  bbp.query(sql, [values, { permitNum: values.permitNum }], (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

router.post("/", (req, res, next) => {
  var fldStr = "";
  var fldVal = "";
  for (const [key, value] of Object.entries(req.body)) {
    fldStr += `${key},`;
    fldVal += value === "" ? "''," : `'${value}',`;
  }

  let sql = `INSERT INTO ${db}.permit (${fldStr.slice(0, -1)}) VALUES(${fldVal.slice(0, -1)})`;
  bbp.query(sql, fldVal, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.delete("/:permitNum", (req, res, next) => {
  let sql = `DELETE FROM permit WHERE ?`;
  console.log(req);
  bbp.query(sql, [req.params], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      console.log(sql);
      res.send(result);
    }
  });
});

module.exports = router;
