import {
  saveRecordService,
  getRecordService,
  deleteRecordService,
  updateRecordService,
} from "../services/dnsservice.js";

export const getRecord = async (req, res) => {
  await getRecordService(req.params.id)
    .then((response) => {
      return res.status(response.status).json(response);
    })
    .catch((err) => {
      return res.status(err.status).json(err);
    });
};
export const saveRecord = async (req, res) => {
  console.log(req.body);
  await saveRecordService(req.body)
    .then((response) => {
      return res.status(response.status).json(response);
    })
    .catch((err) => {
      return res.status(err.status).json(err);
    });
};
export const updateRecord = async (req, res) => {
  await updateRecordService(req.body)
    .then((response) => {
      return res.status(response.status).json(response);
    })
    .catch((err) => {
      return res.status(err.status).json(err);
    });
};
export const deleteRecord = async (req, res) => {
  console.log(req.params.id);
  await deleteRecordService(req.params.id)
    .then((response) => {
      return res.status(response.status).json(response);
    })
    .catch((err) => {
      return res.status(err.status).json(err);
    });
};
