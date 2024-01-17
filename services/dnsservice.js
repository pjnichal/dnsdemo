import { Record } from "../models/dns.js";

export const saveRecordService = (record) => {
  return new Promise(async (resolve, reject) => {
    try {
      const recordStore = Record({ ...record });
      await recordStore.save();
      return resolve({
        status: 201,
        message: "Record saved successfully",
      });
    } catch (error) {
      console.log(error);
      if (error.code === 11000)
        return reject({
          status: 403,
          message: "Record already exists",
        });
      return reject({
        status: 402,
        message: "Failed to save record",
      });
    }
  });
};
export const getRecordService = (domain) => {
  return new Promise(async (resolve, reject) => {
    //fetch from redis
    //fetch from mongo
    let record = await Record.findOne({ domain: domain });
    //update in redis if counter is greater than 4
    if (record) {
      return resolve({
        status: 200,
        data: record,
        message: "Record fetched successfully",
      });
    }

    //fetch from dn2
    return reject({
      status: 404,
      message: "Record not found",
    });
  });
};
