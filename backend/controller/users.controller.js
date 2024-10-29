const userModel = require("../models/users.model");
const bcrypt = require("bcryptjs");

exports.getAllUser = async (req, res) => {
  try {
    let Users = await userModel
      .find({})
      .populate("allProduct.id", "pName pImages pPrice")
      .populate("user", "name email")
      .sort({ _id: -1 });
    if (Users) {
      return res.json({ Users });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getSingleUser = async (req, res) => {
  let { uId } = req.body;
  if (!uId) {
    return res.json({ error: "All filled must be required" });
  } else {
    try {
      let User = await userModel
        .findById(uId)
        .select("name email phoneNumber userImage updatedAt createdAt");
      if (User) {
        return res.json({ User });
      }
    } catch (err) {
      console.log(err);
    }
  }
};

exports.postAddUser = async (req, res) => {
  let { allProduct, user, amount, transactionId, address, phone } = req.body;
  if (!allProduct || !user || !amount || !transactionId || !address || !phone) {
    return res.json({ message: "All filled must be required" });
  } else {
    try {
      let newUser = new userModel({
        allProduct,
        user,
        amount,
        transactionId,
        address,
        phone,
      });
      let save = await newUser.save();
      if (save) {
        return res.json({ success: "User created successfully" });
      }
    } catch (err) {
      return res.json({ error: error });
    }
  }
};

exports.postEditUser = async (req, res) => {
  let { uId, name, phoneNumber } = req.body;
  if (!uId || !name || !phoneNumber) {
    return res.json({ message: "All filled must be required" });
  } else {
    let currentUser = userModel.findByIdAndUpdate(uId, {
      name: name,
      phoneNumber: phoneNumber,
      updatedAt: Date.now(),
    });
    currentUser.exec((err, result) => {
      if (err) console.log(err);
      return res.json({ success: "User updated successfully" });
    });
  }
};

exports.getDeleteUser = async (req, res) => {
  let { oId, status } = req.body;
  if (!oId || !status) {
    return res.json({ message: "All filled must be required" });
  } else {
    let currentUser = userModel.findByIdAndUpdate(oId, {
      status: status,
      updatedAt: Date.now(),
    });
    currentUser.exec((err, result) => {
      if (err) console.log(err);
      return res.json({ success: "User updated successfully" });
    });
  }
};

exports.changePassword = async (req, res) => {
  let { uId, oldPassword, newPassword } = req.body;
  if (!uId || !oldPassword || !newPassword) {
    return res.json({ message: "All filled must be required" });
  } else {
    const data = await userModel.findOne({ _id: uId });
    if (!data) {
      return res.json({
        error: "Invalid user",
      });
    } else {
      const oldPassCheck = await bcrypt.compare(oldPassword, data.password);
      if (oldPassCheck) {
        newPassword = bcrypt.hashSync(newPassword, 10);
        let passChange = userModel.findByIdAndUpdate(uId, {
          password: newPassword,
        });
        passChange.exec((err, result) => {
          if (err) console.log(err);
          return res.json({ success: "Password updated successfully" });
        });
      } else {
        return res.json({
          error: "Your old password is wrong!!",
        });
      }
    }
  }
};

exports.updateUserRole = async (req, res) => {
  let { loggedInUserId } = req.body;

  try {
    // Tìm người dùng theo ID và cập nhật userRole thành 1
    let updatedUser = await userModel.findByIdAndUpdate(
      loggedInUserId, // Điều kiện tìm kiếm: ID của người dùng
      { userRole: 1 }, // Cập nhật userRole thành 1
      { new: true } // Trả về tài liệu đã được cập nhật
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User role updated successfully",
      updatedUser,
    });
  } catch (err) {
    res.status(500).json({ error: "Error updating user role" });
  }
};
