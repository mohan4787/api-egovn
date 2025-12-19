const serviceSvc = require("./service.service");

class ServiceController {
  #service;

  create = async (req, res, next) => {
    try {
      const data = await serviceSvc.transformServiceData(req);
      const service = await serviceSvc.createService(data);

      res.json({
        data: service,
        message: "Service created successfully.",
        status: "SERVICE_CREATED",
        options: null
      });
    } catch (exception) {
      next(exception);
    }
  };

  listAll = async (req, res, next) => {
    try {
      let filter = {};

      if (req.query.search) {
        filter = {
          $or: [
            { title: new RegExp(req.query.search, "i") },
            { status: new RegExp(req.query.search, "i") }
          ]
        };
      }

      let limit = +req.query.limit || 10;
      let currentPage = +req.query.page || 1;

      const { data, pagination } =
        await serviceSvc.getAllByFilter(filter, currentPage, limit, req.query.sort);

      res.json({
        data,
        message: "Service list fetched",
        status: "LISTING_SUCCESS",
        options: { pagination }
      });
    } catch (exception) {
      next(exception);
    }
  };

  #validateServiceById = async (id) => {
    this.#service = await serviceSvc.getSingleRowByFilter({ _id: id });
    if (!this.#service) {
      throw {
        code: 422,
        status: "SERVICE_NOT_FOUND",
        message: "Service not found"
      };
    }
  };

  viewDetail = async (req, res, next) => {
    try {
      await this.#validateServiceById(req.params.id);

      res.json({
        data: this.#service,
        message: "Service detail fetched",
        status: "SERVICE_FETCHED",
        options: null
      });
    } catch (exception) {
      next(exception);
    }
  };

  update = async (req, res, next) => {
    try {
      await this.#validateServiceById(req.params.id);

      const updateData =
        await serviceSvc.transformUpdateData(req, this.#service);

      const updated =
        await serviceSvc.updateSingleByFilter(
          { _id: this.#service._id },
          updateData
        );

      res.json({
        data: updated,
        message: "Service updated successfully",
        status: "SERVICE_UPDATED",
        options: null
      });
    } catch (exception) {
      next(exception);
    }
  };

  deleteOne = async (req, res, next) => {
    try {
      await this.#validateServiceById(req.params.id);

      const del =
        await serviceSvc.deleteSingleRowByFilter({ _id: this.#service._id });

      res.json({
        data: del,
        message: "Service deleted successfully",
        status: "SERVICE_DELETED",
        options: null
      });
    } catch (exception) {
      next(exception);
    }
  };
}

module.exports = new ServiceController();
