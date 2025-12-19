const bannerSvc = require("./banner.service");

class BannerController {
  create = async (req, res, next) => {
    try {
      const data = await bannerSvc.transformBannerCreate(req);
      const banner = await bannerSvc.storeBanner(data);

      res.json({
        data: banner,
        message: "Banner created successfully",
        status: "BANNER_CREATED",
        options: null,
      });
    } catch (err) {
      next(err);
    }
  };

  listAll = async (req, res, next) => {
    try {
      const result = await bannerSvc.getAllData(req.query);
      res.json({
        data: result.data,
        message: "Banner list fetched",
        status: "LISTING_SUCCESS",
        options: { pagination: result.pagination },
      });
    } catch (err) {
      next(err);
    }
  };

  viewDetail = async (req, res, next) => {
    try {
      const banner = await bannerSvc.getSingleRowById(req.params.id);
      if (!banner) throw { code: 404, message: "Banner not found", status: "BANNER_NOT_FOUND" };

      res.json({
        data: banner,
        message: "Banner detail fetched",
        status: "BANNER_FETCHED",
        options: null,
      });
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      const oldBanner = await bannerSvc.getSingleRowById(req.params.id);
      if (!oldBanner) throw { code: 404, message: "Banner not found", status: "BANNER_NOT_FOUND" };

      const updateData = await bannerSvc.transformBannerUpdate(req, oldBanner);
      const updated = await bannerSvc.updateByFilter({ id: oldBanner.id }, updateData);

      res.json({
        data: updated,
        message: "Banner updated successfully",
        status: "BANNER_UPDATED",
        options: null,
      });
    } catch (err) {
      next(err);
    }
  };

  deleteOne = async (req, res, next) => {
    try {
      const deleted = await bannerSvc.deleteById(req.params.id);
      res.json({
        data: deleted,
        message: "Banner deleted successfully",
        status: "BANNER_DELETED",
        options: null,
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new BannerController();
