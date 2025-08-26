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
    const dayOfWeek = moment(date).format("dddd"); //ex: Monday
    console.log(dayOfWeek);
    console.log(doctor.workingHours);
    const workingDay = doctor.workingHours.find(
      (d) => d.day.toLowerCase() == dayOfWeek.toLowerCase()
    );
    console.log(workingDay);
    if (!workingDay) return res.json({ date, slots: [] });
    const exception = doctor.exceptions.find(
      (ex) => moment(ex.date).format("YYYY-MM-DD") === date
    );
    let startTime = workingDay.start;
    let endTime = workingDay.end;
    if (exception) {
      if (!exception.available) {
        return res.status().json({ date, slots: [] });
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
    return res.status(500).send("Network error");
  }
};

//update working hours
module.exports.updateWorkingHours = async (req,res) => {
const {uid} = req.user;
const {day, start,end} = req.body;
try {
  const doctor = await Doctor.findById(uid);
  if(!doctor) return res.status(404).json({Message: "Doctor not found"})
  const workingHour = doctor.workingHours.find(wh => wh.day === day);
    if (!workingHour) {
      return res.status(404).json({ message: `${day} schedule not found` });
    }

    workingHour.start = start;
    workingHour.end = end;

    await doctor.save();
    res.json(doctor.workingHours);
} catch (error) {
  console.log(error)
  return res.status(500).send('Network error')
}
}