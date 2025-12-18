const { Op } = require("sequelize");
const cloudinarySvc = require("../../services/cloudinary.service");
const BannerModel = require("./banner.model");

class BannerService {
  transformBannerCreate = async (req) => {
    try {
      let data = req.body;
      data.image = await cloudinarySvc.uploadFile(req.file.path, "banner");
      return data;
    } catch (exception) {
      throw exception;
    }
  };

  transformBannerUpdate = async (req, oldData) => {
    try {
      let data = req.body;

      if (req.file) {
        data.image = await cloudinarySvc.uploadFile(req.file.path, "banner");
      } else {
        data.image = oldData.image;
      }

      return data;
    } catch (exception) {
      throw exception;
    }
  };

  storeBanner = async (data) => {
    try {
      const banner = await BannerModel.create(data);
      return banner;
    } catch (exception) {
      throw exception;
    }
  };

  getAllData = async (query, filter = {}) => {
    try {
      let page = +query.page || 1;
      let limit = +query.limit || 10;
      let skip = (page - 1) * limit;

      // SELECT id,title,status FROM TABLE WHERE clause ORDER BY SKIP 0 LIMIT10
      // SELECT * FROM Banners where title ilike '%one%'
      const { rows, count } = await BannerModel.findAndCountAll({
        // attributes: ['id','title']
        where: filter,
        offset: skip,
        limit: limit,
        order: [["id", "desc"]],
      });
      return {
        data: rows,
        pagination: {
          limit: limit,
          page: page,
          total: count,
        },
      };
    } catch (exception) {
      throw exception;
    }
  };

  getSingleRowById = async (id) => {
    try {
      let data = await BannerModel.findByPk(id);
      return data;
    } catch (exception) {
      throw exception;
    }
  };

  updateByFilter = async (filter, update) => {
    try {
      console.log(filter);
      const updateData = await BannerModel.update(update, {
        where: filter,
        returning: [
          "id",
          "title",
          "url",
          "status",
          "image",
          "createdAt",
          "updatedAt",
        ],
      });
      return updateData[1][0];
    } catch (exception) {
      throw exception;
    }
  };
  deleteById = async(id) => {
    try {
      const data = await BannerModel.destroy({
        where: {id: id}
      })
      return data;
    } catch(exception) {
      throw exception
    }
  }
}

const bannerSvc = new BannerService()

module.exports = bannerSvc