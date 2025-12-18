const { Op } = require("sequelize");
const bannerSvc = require("./banner.service")

class BannerController {
  createBanner = async (req, res, next) => {
    try {
      const payload = await bannerSvc.transformBannerCreate(req);
      const banner = await bannerSvc.storeBanner(payload);

      res.json({
        data: banner,
        message: "Banner Created",
        status: "BANNER_CREATED",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listAllData = async (req, res, next) => {
    try {
      let filter = {};
      if (req.query.search) {
        filter = {
          title: {
            [Op.iLike]: `%${req.query.search}%`,
          },
        };
      }
      let { data, pagination } = await bannerSvc.getAllData(req.query, filter);
      res.json({
        data: data,
        message: "List all data",
        status: "OK",
        options: pagination,
      });
    } catch (exception) {
      next(exception);
    }
  };

  lisAllForHome = async (req, res, next) => {
    try {
      let filter = {
        status: "active"
      };
      if (req.query.search) {
        filter = {
          ...filter,
          title: {
            [Op.iLike]: `%${req.query.search}%`,
          },
        };
      }
      let { data, pagination } = await bannerSvc.getAllData(req.query, filter);
      res.json({
        data: data,
        message: "List all data",
        status: "OK",
        options: pagination,
      });
    } catch (exception) {
      next(exception);
    }
  };

  getById = async (req, res, next) => {
    try {
      let id = req.params.id;
      const data = await bannerSvc.getSingleRowById(id);
      if (!data) {
        throw {
          code: 422,
          message: "Banner not found",
          status: "BANNER_NOT_FOUND",
        };
      }
      res.json({
        data: data,
        message: "Banner Detail",
        status: "BANNER_DETAIL",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  updateBanner = async (req, res, next) => {
    try {
      let id = req.params.id;
      const data = await bannerSvc.getSingleRowById(id);
      if (!data) {
        throw {
          code: 422,
          message: "Banner not found",
          status: "BANNER_NOT_FOUND",
        };
      }
      //
      const payload = await bannerSvc.transformBannerUpdate(req, data);
      const update = await bannerSvc.updateByFilter(
        {
          id: id,
        },
        payload
      );
      res.json({
        data: update,
        message: "Banner Updated",
        status: "BANNER_UPDATED",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  deleteById = async (req, res, next) => {
    try {
      let id = req.params.id;
      const data = await bannerSvc.getSingleRowById(id);
      if (!data) {
        throw {
          code: 422,
          message: "Banner not found",
          status: "BANNER_NOT_FOUND",
        };
      }
      let response = await bannerSvc.deleteById(id);
      res.json({
        data: response,
        message: "Banner Deleted",
        status: "BANNER_DELETED",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };
}

const bannerCtrl = new BannerController()
module.exports = bannerCtrl