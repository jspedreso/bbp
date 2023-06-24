const express = require("express");
const app = express();
const router = express.Router();
const bbp = require("../dbconnect");
const db = "bbp";
router.param("userId", (req, res, next, id) => {
  req.permnitNum = {
    id,
    name: "TJ",
  };
  next();
});

router.get("/", (req, res, next) => {
  var filters = req.query;
  var pageSize = filters.pageSize;
  var pageIndex = filters.pageIndex;
  var colFilters = filters.colFilters;
  var where = " ";
  if ("colFilters" in filters) {
    for (const [arrKey, row] of Object.entries(colFilters)) {
      where += where == " " ? `WHERE ${row.id} LIKE '%${row.value}%'` : ` AND ${row.id} like '%${row.value}%'`;
    }
  }

  var sql = `SELECT userId,firstName,middleName,lastName,accountType,username,password FROM bbp.user ${where} LIMIT ${pageIndex},${pageSize}`;

  bbp.query(sql, (err, results, fields) => {
    res.send(results);
  });
});

router.put("/", (req, res, next) => {
  values = req.body;
  let sql = "UPDATE user SET ? WHERE ?";
  bbp.query(sql, [values, { userId: values.userId }], (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log(values);
      res.send(result);
    }
  });
});

router.post("/", (req, res, next) => {
  var fldStr = "";
  var fldVal = [];
  for (const [key, value] of Object.entries(req.body)) {
    fldStr += `${key},`;
    fldVal.push(value);
  }

  let sql = `INSERT INTO ${db}.user (${fldStr.slice(0, -1)}) VALUES(?,?,?,?,?,?,?)`;

  bbp.query(sql, fldVal, (err, result) => {
    console.log(result);
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

router.delete("/:userId", (req, res, next) => {
  let sql = `DELETE FROM user WHERE ?`;
  /* console.log(values); */
  bbp.query(sql, [req.params], (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log(sql);
      res.send(result);
    }
  });
});

module.exports = router;
