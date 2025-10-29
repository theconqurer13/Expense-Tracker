const transectionModel = require("../models/transectionModel");
const moment = require("moment");
const mongoose = require("mongoose");

// GET /api/v1/transactions
// Supports optional query params: frequency (number of days | 'custom'),
// selectedDate[0]=ISO, selectedDate[1]=ISO, type ('all'|'income'|'expense')
const getAllTransection = async (req, res) => {
  try {
    const { frequency, type, category } = req.query;
    const selectedDateStart = req.query["selectedDate[0]"];
    const selectedDateEnd = req.query["selectedDate[1]"];

    const dateFilter =
      frequency && frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : selectedDateStart && selectedDateEnd
        ? {
            date: {
              $gte: new Date(selectedDateStart),
              $lte: new Date(selectedDateEnd),
            },
          }
        : {};

    const query = {
      userid: req.user.id,
      ...(type && type !== "all" ? { type } : {}),
      ...(category && category !== "all" ? { category } : {}),
      ...dateFilter,
    };

    const transections = await transectionModel.find(query).sort({ date: -1 });
    res.status(200).json(transections);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};

const deleteTransection = async (req, res) => {
  try {
    const { id } = req.params;
    await transectionModel.findOneAndDelete({ _id: id, userid: req.user.id });
    res.status(200).json({ message: "Transaction deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete transaction" });
  }
};

const editTransection = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await transectionModel.findOneAndUpdate(
      { _id: id, userid: req.user.id },
      req.body,
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update transaction" });
  }
};

const addTransection = async (req, res) => {
  try {
    const payload = { ...req.body, userid: req.user.id };
    const newTransection = new transectionModel(payload);
    const saved = await newTransection.save();
    res.status(201).json(saved);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create transaction" });
  }
};

module.exports = {
  getAllTransection,
  addTransection,
  editTransection,
  deleteTransection,
};

// GET /api/v1/transactions/stats
// Query: start=ISO8601 optional; aggregates expense totals per month and per category
const getTransactionStat = async (req, res) => {
  try {
    const startParam = req.query.start;
    const startDate = startParam ? new Date(startParam) : moment().startOf('year').toDate();

    const matchStage = {
      $match: {
        userid: new mongoose.Types.ObjectId(req.user.id),
        type: 'expense',
        date: { $gte: startDate },
      },
    };

    const monthly = await transectionModel.aggregate([
      matchStage,
      {
        $group: {
          _id: { year: { $year: '$date' }, month: { $month: '$date' } },
          amount: { $sum: '$amount' },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
      {
        $project: {
          _id: 0,
          month: {
            $concat: [
              {
                $arrayElemAt: [
                  [ '', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
                  '$_id.month',
                ],
              },
              ' ',
              { $toString: '$_id.year' },
            ],
          },
          amount: { $round: ['$amount', 2] },
        },
      },
    ]);

    const categories = await transectionModel.aggregate([
      matchStage,
      {
        $group: {
          _id: '$category',
          value: { $sum: '$amount' },
        },
      },
      { $sort: { value: -1 } },
      {
        $project: {
          _id: 0,
          name: '$_id',
          value: { $round: ['$value', 2] },
        },
      },
    ]);

    res.json({ monthly, categories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to compute stats' });
  }
};

module.exports.getTransactionStat = getTransactionStat;