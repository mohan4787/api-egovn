const cloudinarySvc = require("../../services/cloudinary.service");
const BannerModel = require("./banner.model");

class BannerService {
  transformBannerCreate = async (req) => {
    let data = req.body;
    if (req.file) {
      data.image = await cloudinarySvc.fileUpload(req.file.path, "banner");
    }
    return data;
  };

  transformBannerUpdate = async (req, oldData) => {
    let data = req.body;
    if (req.file) {
      data.image = await cloudinarySvc.fileUpload(req.file.path, "banner");
    } else {
      data.image = oldData.image;
    }
    return data;
  };

  storeBanner = async (data) => {
    return await BannerModel.create(data);
  };

  getAllData = async (query, filter = {}) => {
    let page = +query.page || 1;
    let limit = +query.limit || 10;
    let skip = (page - 1) * limit;

    const { rows, count } = await BannerModel.findAndCountAll({
      where: filter,
      offset: skip,
      limit,
      order: [["id", "desc"]],
    });

    return { data: rows, pagination: { page, limit, total: count } };
  };

  getSingleRowById = async (id) => {
    return await BannerModel.findByPk(id);
  };

  updateByFilter = async (filter, update) => {
    const updateData = await BannerModel.update(update, {
      where: filter,
      returning: true,
    });
    return updateData[1][0];
  };

  deleteById = async (id) => {
    return await BannerModel.destroy({ where: { id } });
  };
}

module.exports = new BannerService();
