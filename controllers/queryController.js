const Employee = require('../models/employeeModel');

const filterQueries = async (req, res) => {
  try {
    //Write your code here for sorting & pagination
    //1) For sorting sort salary from ascending to descending order
    //2) For Pagination set limit 5 as a default limit and default page is 1
    // Formulae to implementing pagination: (page - 1) * limit
    // For Sorting use    .sort('salary')
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await Employee.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    const sortField = req.query.sortField || "lastName";
    const sortOrder = parseInt(req.query.sortOrder) || 1;

    results.results = await Employee.find()
      .sort({ [sortField]: sortOrder })
      .limit(limit)
      .skip(startIndex)
      .exec();
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { filterQueries };
