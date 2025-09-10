import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: String,
    status: {
      type: String,
      default: "initial",
    },
    content: String,
    timeStart: Date,
    timeFinish: Date,
    createdBy: String,
    listUser: Array,
    taskParentId: {
      type: String,
      default: "",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema, "tasks");

export default Task;
