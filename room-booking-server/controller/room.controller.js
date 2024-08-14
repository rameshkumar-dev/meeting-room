import bookingModel from "../model/booking.model.js";
import roomModel from "../model/room.model.js";
import moment from "moment";

export const createRoom = async (req, res) => {
  try {
    const { roomNo, type } = req.body;
    console.log("roomno: ", req.body);
    const details = await roomModel.findOne({ roomNo });
    if (details) {
      return res.send({ message: "Room Number Already Present" });
    }
    const room = await roomModel.create({ roomNo, type });
    return res.send({ message: "Room Create", data: room });
  } catch (err) {
    console.log(err);
    res.send({ message: "Internal Server Error in Create Room" });
  }
};

export const searchRoom = async (req, res) => {
  try {
    const { roomNo, type, status } = req.query;

    const config = {};
    if (roomNo) {
      config["roomNo"] = roomNo;
    }
    if (type) {
      config["type"] = type;
    }
    if (status) {
      config["status"] = status;
    }

    console.log(config);

    const roomDetails = await roomModel.find(config);

    return res.send({
      message: "Room Create",
      no_of_items: roomDetails.length,
      data: roomDetails,
    });
  } catch (err) {
    console.log(err);
    res.send({ message: "Internal Server Error in Search Room" });
  }
};

export const bookRoom = async (req, res) => {
  try {
    const { roomNo, date, timeSlot } = req.body;

    const roomDetails = await roomModel.findOne({ roomNo });

    if (!roomDetails || roomDetails.status === "Not-Available") {
      return res.send({ message: "This Room is not available" });
    }

    let data = [],
      isAvailable = false;

    data = timeSlot.map(async (item) => {
      const details = await bookingModel.findOne({
        roomId: roomDetails._id,
        checkInDate: date,
        $or: [
          {
            $and: [
              { checkInTime: { $lte: item.checkInTime } },
              { checkOutTime: { $gt: item.checkInTime } },
            ],
          },
          {
            $and: [
              { checkInTime: { $lt: item.checkOutTime } },
              { checkOutTime: { $gte: item.checkOutTime } },
            ],
          },
          {
            $and: [
              { checkInTime: { $gte: item.checkInTime } },
              { checkOutTime: { $lte: item.checkOutTime } },
            ],
          },
        ],
      });
      if (details) {
        isAvailable = true;
      }
      return {
        roomId: roomDetails._id,
        checkInDate: date,
        checkInTime: item.checkInTime,
        checkOutTime: item.checkOutTime,
      };
    });

    data = await Promise.all(data);
    console.log(data);

    if (isAvailable) {
      return res.send({ message: "Slots Not Available" });
    }

    const bookingDetails = await bookingModel.insertMany(data);

    return res.send({ message: "Room Booked", data: bookingDetails });
  } catch (err) {
    console.log(err);
    return res.send({ message: "Internal Server Error in Book Room" });
  }
};

export const viewRoom = async (req, res) => {
  try {
    const { roomId } = req.params;

    if (!roomId) {
      return res.send({ message: "Room Id Required" });
    }

    const roomDetails = await roomModel.findById(roomId);

    if (!roomDetails) {
      return res.send({ message: "Invalid Room Id" });
    }

    const currentDate = new Date();

    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    // const currentDate = new Date(date);

    // console.log(currentDate);

    // console.log(new Date());

    const data = await bookingModel.aggregate([
      {
        $match: {
          $and: [
            {checkInDate : {$gte : currentDate}},
            {checkInDate : {$lte : lastDayOfMonth}}
          ],
        },
      },
      {
        $group: {
          _id: "$checkInDate",
          bookedSlot: {
            $push: {
              checkInTime: "$checkInTime",
              chechOutTime: "$checkOutTime",
            },
          },
        },
      },
    ]);

    return res.send({ message: "View Room", data });
  } catch (err) {
    console.log(err);
    return res.send({ message: "Internal Server Error in View Room" });
  }
};
