
const Registration = require("../models/Registration");
// ==========================================
// REGISTER FOR AN EVENT
// ==========================================

const registerForEvent = async (req, res) => {
    try {
        const { eventId } = req.body;

        // Get logged-in user's ID from JWT
        const userId = req.user.id;

        // Check if event ID is provided
        if (!eventId) {
            return res.status(400).json({
                message: "Event ID is required"
            });
        }

        // Check if user already registered for this event
        const existingRegistration = await Registration.findOne({
            user: userId,
            event: eventId
        });

        if (existingRegistration) {
            return res.status(400).json({
                message: "You are already registered for this event"
            });
        }

        // Create registration
        const registration = new Registration({
            user: userId,
            event: eventId
        });

        await registration.save();

        res.status(201).json({
            message: "Event registration successful",
            registration
        });

    } catch (error) {
        res.status(500).json({
            message: "Registration failed",
            error: error.message
        });
    }
};


// ==========================================
// GET MY REGISTRATIONS
// ==========================================

const getMyRegistrations = async (req, res) => {
    try {
        const userId = req.user.id;

        const registrations = await Registration.find({
            user: userId
        }).populate("event");

        res.status(200).json({
            message: "Registrations fetched successfully",
            registrations
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch registrations",
            error: error.message
        });
    }
};


// ==========================================
// CANCEL REGISTRATION
// ==========================================

const cancelRegistration = async (req, res) => {
    try {
        const { registrationId } = req.params;

        const userId = req.user.id;

        const registration = await Registration.findOne({
            _id: registrationId,
            user: userId
        });

        if (!registration) {
            return res.status(404).json({
                message: "Registration not found"
            });
        }

        registration.status = "cancelled";

        await registration.save();

        res.status(200).json({
            message: "Registration cancelled successfully",
            registration
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to cancel registration",
            error: error.message
        });
    }
};


module.exports = {
    registerForEvent,
    getMyRegistrations,
    cancelRegistration
};