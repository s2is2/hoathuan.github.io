var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
//User(Phone,Password,TypeRegister,TokenLogin,DeviceID,FcmTokens)
mongoose.connect(
  "mongodb+srv://phamxuandu:du13102003@cluster0.ugkshgj.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

let userSchema = mongoose.Schema({
  phone: {
    type: String,
  },
  password: {
    type: String,
  },
  typeRegister: {
    type: String,
  },
  defaultAccount:{
    type: String,
  },
  tokenLogin: {
    type: String,
  },
  fcmTokens: {
    type: String,
  },
});

let User = mongoose.model("User", userSchema);

/* GET home page. */
router.get("/", function (req, res, next) {
  User.find({}, (Error, data) => {
    res.render("index", { users: data });
  });
});

router.get("/form-add", function (req, res, next) {
  res.render("form-add", {});// kết xuất một dạng xem và gửi chuỗi HTML đã kết xuất đến máy khách.
});

router.post("/add", function (req, res, next) {
  User.create(req.body);
  res.redirect("/");// chuyển hướng đến URL có nguồn gốc từ đường dẫn được chỉ định
});

router.get("/form-update/:id", function (req, res, next) {
  User.findById(req.params.id, (Error, data) => {
    res.render("form-update", { user: data });
  });
});

router.post("/update", function (req, res, next) {
  User.findByIdAndUpdate(req.body.id, req.body, (Error, data) => {// tìm id và cập nhật theo id
    res.redirect("/");
  });
});

router.get("/form-delete/:id", function (req, res, next) {
  User.findByIdAndDelete(req.params.id, (Error, data) => {//tìm id và xóa theo id
    res.redirect("/");
  });
});

module.exports = router;
