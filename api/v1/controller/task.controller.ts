import { Request, Response } from "express";
import Task from "../models/task.model";
import paginationHelper from "../../../helpers/pagination.helper";
import searchHelper from "../../../helpers/search.helper";

export const index = async (req: Request, res: Response) => {
  interface Find {
    deleted: boolean,
    status?: string
    title?: RegExp
  }

  const find: Find = {
    deleted: false
  }

  if (req.query.status) {
    find.status = req.query.status.toString()
  }

  //Search
  let objectSearch = searchHelper(req.query);
  if (req.query.keyword) {
    find.title = objectSearch.regex;
  }


  // Pagination
  let initPagination = {
    currentPage: 1,
    limitItems: 2,
  };
  const countTask = await Task.countDocuments(find);
  const objectPagination = paginationHelper(
    initPagination,
    req.query,
    countTask
  );
  // End Pagination


  //Sort
  const sort = {}
  if (req.query.sortKey && req.query.sortValue) {
    const sortKey = req.query.sortKey.toString();
    sort[sortKey] = req.query.sortValue;
  }
  //End Sort
  const tasks = await Task.find(find)
    .sort(sort)
    .skip(objectPagination.skip)
    .limit(objectPagination.limitItems);

  res.json(tasks);
}

export const detail = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const task = await Task.findOne({
    _id: id,
    deleted: false
  });
  res.json(task);
}

export const changeStatus = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const status: string = req.body.status;
    await Task.updateOne(
      { _id: id },
      { status: status }
    );
    res.json({
      code: 200,
      message: "Update status successfully!",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Update status failed!",
    });
  }
}

export const changeMulti = async (req: Request, res: Response) => {
  try {
    enum Key{
      status = "status",
      delete = "delete"
    }
    const ids: string[] = req.body.ids;
    const key: string = req.body.key;
    const value: string = req.body.value;

    switch (key) {
      case Key.status:
        await Task.updateMany(
          { _id: { $in: ids } },
          { status: value }
        );
        res.json({
          code: 200,
          message: "Update status successfully!",
        });
        break;

      case Key.delete:
        await Task.updateMany(
          { _id: { $in: ids } },
          { deleted: value }
        );
        res.json({
          code: 200,
          message: "Update deleted successfully!",
        });
        break;

      default:
        res.json({
          code: 400,
          message: "Không tồn tại!",
        });
        break;
    }
  } catch (error) {
    res.json({
      code: 400,
      message: "Update status failed!",
    });
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.json({
      code: 200,
      message: "Create task successfully!",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Create task failed!",
    });
  }
}

export const edit = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    await Task.updateOne(
      { _id: id },
      req.body
    );
    res.json({
      code: 200,
      message: "Edit task successfully!",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Edit task failed!",
    });
  }
}

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    await Task.updateOne(
      { _id: id },
      {
        deleted: true,
        deletedAt: new Date()
      }
    )
    res.json({
      code: 200,
      message: "Delete task successfully!",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Delete task failed!",
    });
  }
}
