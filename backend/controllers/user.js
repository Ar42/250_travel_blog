import User from "../models/User.js";

// UPDATE
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).send({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

//   DELETE
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send({
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

//   GET
export const getAUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

//   GET ALL
export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).send({
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
