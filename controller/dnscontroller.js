import { saveRecordService } from "../services/dnsservice.js";

export const getRecord = async (req, res) => {
  console.log(req.params.id);
  return res.send({ message: "Message" });
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
  console.log(req.body);
  return res.send({ message: "Message" });
};
export const deleteRecord = async (req, res) => {
  console.log(req.body);
  return res.send({ message: "Message" });
};
