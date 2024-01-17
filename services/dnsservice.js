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
          status: 402,
          message: "Record already exists",
        });
      return reject({
        status: 402,
        message: "Failed to save record",
      });
    }
  });
};
