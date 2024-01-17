import { Record } from "../models/dns.js";
import { client } from "../config/redis.js";

export const saveRecordService = (record) => {
  return new Promise(async (resolve, reject) => {
    if (!record || !record.domain || !record.ip) {
      console.log(record);
      return reject({
        status: 403,
        message: "Please enter valid of the record  ",
      });
    }
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
    let popularCount = await client.hget(`${domain}`, "count");
    if (popularCount == null || popularCount <= 4) {
      let record = await Record.findOne({ domain: domain });

      if (record) {
        if (popularCount > 0) {
          await client.hincrby(domain, "count", 1);
        } else {
          await client.hset(domain, "count", 1);
        }
        return resolve({
          status: 200,
          data: record,
          message: "Record fetched successfully",
          from: "From mongo ",
        });
      }
    } else {
      await client.hincrby(domain, "count", 1);
      if (popularCount > 4) {
        let currData = await client.hget(domain, "data");
        if (currData == null) {
          let record = await Record.findOne({ domain: domain });
          await client.hset(domain, "data", JSON.stringify(record));
          return resolve({
            status: 200,
            data: record,
            message: "Record fetched successfully",
            from: "From mongo but now stored in redis",
          });
        }

        return resolve({
          status: 200,
          data: JSON.parse(currData),
          message: "Record fetched successfully",
          from: "From redis",
        });
      }
    }

    //fetch from dn2
    return reject({
      status: 404,
      message: "Record not found",
    });
  });
};
export const deleteRecordService = (domain) => {
  return new Promise(async (resolve, reject) => {
    //delete from redis
    //delete from mongo
    let record = await Record.deleteOne({ domain: domain });

    if (record.deletedCount > 0) {
      await client.del(domain);
      return resolve({
        status: 201,
        message: "Record deleted successfully",
      });
    }

    //delete from dn2
    return reject({
      status: 404,
      message: "Record not found",
    });
  });
};
export const updateRecordService = (record) => {
  return new Promise(async (resolve, reject) => {
    //update from redis
    //update from mongo
    if (!record || !record.domain || !record.ip) {
      console.log(record);
      return reject({
        status: 403,
        message: "Please enter valid of the record  ",
      });
    }

    let recordUpdate = await Record.updateOne(
      { domain: record.domain },
      { ...record }
    );
    if (recordUpdate.matchedCount == 0 || recordUpdate.modifiedCount == 0) {
      return reject({
        status: 404,
        message: "Record not found",
      });
    }
    console.log(recordUpdate);
    await client.del(record.domain);
    return resolve({
      status: 201,
      message: "Record updated successfully",
    });
    //update from dn2
  });
};
