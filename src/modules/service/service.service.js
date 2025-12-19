const slugify = require("slugify");
const ServiceModel = require("./service.model");
const { generateRandomString } = require("../../utilities/helper");

class ServiceService {
  transformServiceData = async (req) => {
    let data = req.body;

    let code = generateRandomString(6);
    data.slug = slugify(`${data.title}-${code}`, {
      lower: true,
      trim: true
    });

    if (typeof data.requiredDocuments === "string") {
      data.requiredDocuments = JSON.parse(data.requiredDocuments);
    }

    data.createdBy = req.loggedInUser._id;
    return data;
  };

  transformUpdateData = async (req, oldService) => {
    let data = req.body;
    data.updatedBy = req.loggedInUser._id;
    return data;
  };

  createService = async (data) => {
    return await new ServiceModel(data).save();
  };

  getAllByFilter = async (filter, page, limit, sort) => {
    let skip = (page - 1) * limit;
    let data = await ServiceModel.find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sort || { title: "asc" });

    let total = await ServiceModel.countDocuments(filter);

    return {
      data,
      pagination: { page, limit, total }
    };
  };

  getSingleRowByFilter = async (filter) => {
    return await ServiceModel.findOne(filter);
  };

  updateSingleByFilter = async (filter, data) => {
    return await ServiceModel.findOneAndUpdate(
      filter,
      { $set: data },
      { new: true }
    );
  };

  deleteSingleRowByFilter = async (filter) => {
    return await ServiceModel.findOneAndDelete(filter);
  };
}

module.exports = new ServiceService();
