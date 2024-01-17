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
    //fetch from redis
    let popular = await client.get(`domain/${domain}`);
    if (popular == null) {
      const data = { count: 0, data: {} };
      const stringData = JSON.stringify(data);
      await client.set(`domain`, stringData);
    } else {
      const jsonData = JSON.parse(popular);
      let count = jsonData.count + 1;
      if (count > 4 && Object.keys(jsonData.data).length == 0) {
        console.log("set called");
        const data = { count: count, data: blogPost };
        const stringData = JSON.stringify(data);
        await client.set(`popular:${id}`, stringData);
      } else {
        const data = { count: count, data: jsonData.data };
        console.log(count);
        const stringData = JSON.stringify(data);
        await client.set(`popular:${id}`, stringData);
      }
    }

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
export const deleteRecordService = (domain) => {
  return new Promise(async (resolve, reject) => {
    //delete from redis
    //delete from mongo
    let record = await Record.deleteOne({ domain: domain });
    //update in redis if counter is greater than 4
    if (record.deletedCount > 0) {
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
    return resolve({
      status: 201,
      message: "Record updated successfully",
    });
    //update from dn2
  });
};
