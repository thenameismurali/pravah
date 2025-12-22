const express = require("express");
const Event = require("../models/Event");

const router = express.Router();

/**
 * POST: Create a new event
 * URL: POST /api/events
 */
router.post("/", async (req, res) => {
  try {
    const { project, date, time, venue, desc, latitude, longitude } = req.body;

    // Validation
    if (
      !project ||
      !date ||
      !time ||
      !venue ||
      !desc ||
      latitude === undefined ||
      longitude === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const event = await Event.create({
      project,
      date,
      time,
      venue,
      desc,
      latitude,
      longitude,
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

/**
 * GET: Fetch all events
 * URL: GET /api/events
 */
router.get("/", async (req, res) => {
  try {
    const { date } = req.query;

    let events;

    if (date) {
      // fetch events for a specific date
      events = await Event.find({ date });
    } else {
      // fetch all events
      events = await Event.find().sort({ createdAt: -1 });
    }

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});
/**
 * GET: Fetch all event dates (for calendar dots)
 * URL: GET /api/events/dates
 */
router.get("/dates", async (req, res) => {
  try {
    const events = await Event.find().select("date -_id");

    // remove duplicates
    const uniqueDates = [...new Set(events.map(e => e.date))];

    res.status(200).json(uniqueDates);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});


module.exports = router;
