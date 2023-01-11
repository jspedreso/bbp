const express = require("express");
const app = express();
const router = express.Router();

const bbp = require("../dbconnect");
const db = "bbp";
router.param("permitNum", (req, res, next, id) => {
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

  var sql = `SELECT x.* FROM
(SELECT *,DATEDIFF(date_add(CURDATE(), INTERVAL 3 MONTH),valid) as remainingDays  FROM bbp.permit) x
WHERE x.remainingDays<=90 LIMIT ${pageIndex},${pageSize}`;

  bbp.query(sql, (err, results, fields) => {
    if (err) {
      throw err;
    } else {
      res.send(results);
    }
  });
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
