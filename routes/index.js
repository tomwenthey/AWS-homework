var express = require("express");
var AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: "AKIAI5CTEARKHOOIKMLQ",
  secretAccessKey: "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",
  region: "us-east-2"
});

var ec2 = new AWS.EC2();
var params = {
  Description: "This is my root volume snapshot.",
  VolumeId: "vol-055416f827df19444"
};

var router = express.Router();
/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/snapshot", function(req, res, next) {
  ec2.createSnapshot(params, function(err, data) {
    var rs = { status: 0 };

    if (err) {
      rs.message = err;
    } else {
      rs.message = data;
      rs.status = 1;
    } // successful response
    console.log(rs);
    res.render("snapshot", { snapshot: rs });
  });
});

module.exports = router;
