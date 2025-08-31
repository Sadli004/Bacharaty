const Doctor = require("../../models/Doctor");
const Appointment = require("../../models/Appointment");
const moment = require("moment");
module.exports.createDoctor = async (req, res) => {
  const info = req.body;
  try {
    const newDoctor = new Doctor(info);
    await newDoctor.save();
    res.status(201).json({ message: "Doctor created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports.getDoctorsList = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select("-password");
    res.json(doctors);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports.getDoctorById = async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await Doctor.findById(id).select("-password");
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.makeSchedule = async (req, res) => {
  const doctorId = req.user.uid;
  const { workingDays, startTime, endTime, slotDuration } = req.body;
  try {
    const schedule = await Schedule.findOneAndUpdate({ doctorId }, req.body, {
      upsert: true,
      new: true,
    });
    res.json(schedule);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};
// GET /schedule/:doctorId
module.exports.getDocSchedule = async (req, res) => {
  const { doctorId } = req.params;
  const { date } = req.query;
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor)
      return res.status(404).json({ message: "Couldn't find doctor" });
    // const dayOfWeek = moment(date).format("dddd"); //ex: Monday
    const dayOfWeek = new Date(date).getDay();
    console.log(dayOfWeek);
    console.log(doctor.workingHours);
    const workingDay = doctor.workingHours.find((d) => d.day == dayOfWeek);
    console.log(workingDay);
    if (!workingDay) return res.json({ date, slots: [] });
    const exception = doctor.exceptions.find(
      (ex) => moment(ex.date).format("YYYY-MM-DD") === date
    );
    let startTime = workingDay.start;
    let endTime = workingDay.end;
    if (exception) {
      if (!exception.available) {
        return res.status(400).json({ date, slots: [] });
      }
      startTime = exception.start || startTime;
      endTime = exception.end || endTime;
    }
    const slotDuration = doctor.slotDuration || 30;
    let slots = [];
    let current = moment(`${date} ${startTime}`, "YYYY-MM-DD HH:mm");
    const end = moment(`${date} ${endTime}`, "YYYY-MM-DD HH:mm");

    while (current < end) {
      slots.push(current.format("HH:mm"));
      current.add(slotDuration, "minutes");
    }

    // Filter out already booked appointments
    const appointments = await Appointment.find({
      doctor: doctorId,
      date: {
        $gte: moment(date).startOf("day").toDate(),
        $lte: moment(date).endOf("day").toDate(),
      },
    });

    const bookedTimes = appointments.map((a) => a.time);

    slots = slots.filter((slot) => !bookedTimes.includes(slot));

    res.json({ date, slots });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Network error");
  }
};

//update working hours
module.exports.updateWorkingHours = async (req, res) => {
  const { uid } = req.user;
  const { day, start, end } = req.body;
  try {
    const doctor = await Doctor.findById(uid);
    if (!doctor) return res.status(404).json({ Message: "Doctor not found" });
    const workingHour = doctor.workingHours.find((wh) => wh.day === day);
    if (!workingHour) {
      return res.status(404).json({ message: `${day} schedule not found` });
    }

    workingHour.start = start;
    workingHour.end = end;

    await doctor.save();
    return res.json(doctor.workingHours);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Network error");
  }
};
//add a working day
module.exports.makeAvailable = async (req, res) => {
  const { uid } = req.user;
  const { day, start, end } = req.body;

  try {
    const doctor = await Doctor.findById(uid);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    // Prevent duplicate day entries
    if (doctor.workingHours.some((workDay) => workDay.day === day)) {
      return res.status(400).json({ message: "This day is already set" });
    }

    // Add the new working day
    doctor.workingHours.push({ day, start, end });

    // Sort by day (0-6)
    doctor.workingHours.sort((a, b) => a.day - b.day);

    await doctor.save();

    return res.json(doctor.workingHours);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Network error");
  }
};

// unavailable for day (delete from working days)
module.exports.makeUnavailable = async (req, res) => {
  const { uid } = req.user;
  const { day } = req.body;
  try {
    const doctor = await Doctor.findById(uid);
    if (!doctor) return res.status(404).json({ Message: "Doctor not found" });
    const dayIndex = doctor.workingHours.findIndex(
      (workDay) => workDay.day == day
    );
    if (dayIndex === -1) {
      return res
        .status(404)
        .json({ message: `${day} is not found in working hours` });
    }
    doctor.workingHours.splice(dayIndex, 1);
    doctor.save();
    return res.status(200).json(doctor.workingHours);
  } catch (error) {
    return res.status(500).send("Network error");
  }
};
// add exception
module.exports.addExceptions = async (req, res) => {
  const { uid } = req.user;
  const { date } = req.query; // date in format YYYY-MM-DD
  let { start, end, available } = req.body;

  try {
    const doctor = await Doctor.findById(uid);
    if (!doctor) return res.status(404).json({ Message: "Doctor not found" });

    // If not available, we ignore time slots
    if (available == false) {
      start = null;
      end = null;
    }

    // Push the exception
    doctor.exceptions.push({ date, available, start, end });

    // Sort exceptions by date (ascending)
    doctor.exceptions.sort((a, b) => new Date(a.date) - new Date(b.date));

    await doctor.save();

    return res.json(doctor.exceptions);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};
// edit exceptions
module.exports.editException = async (req, res) => {
  const { uid } = req.user;
  const { date } = req.query;
  let { start, end, available } = req.body;
  try {
    const doctor = await Doctor.findById(uid);
    if (!doctor) return res.status(404).json({ Message: "Doctor not found" });

    let exception = doctor.exceptions.find(
      (ex) => moment(ex.date).format("YYYY-MM-DD") == date
    );
    // return res.send(exception);
    if (available == 0) {
      console.log("available");
      exception.available = available;
      exception.start = null;
      exception.end = null;
    } else {
      exception.available = available;
      exception.start = start;
      exception.end = end;
    }

    await doctor.save();

    return res.json(doctor.exceptions);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};
module.exports.deleteException = async (req, res) => {
  const { uid } = req.user;
  const { date } = req.query;
  try {
    const doctor = await Doctor.findById(uid);
    if (!doctor) return res.status(404).json({ Message: "Doctor not found" });
    const index = doctor.exceptions.findIndex(
      (ex) => moment(ex.date).format("YYYY-MM-DD") == date
    );

    doctor.exceptions.splice(index, 1);
    await doctor.save();
    return res.json(doctor.exceptions);
  } catch (error) {
    console.log(error);
    req.status(500).send("Internal server error");
  }
};
