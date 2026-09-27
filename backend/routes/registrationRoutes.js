const express = require("express");

const {
    registerForEvent,
    getMyRegistrations,
    cancelRegistration
} = require("../controllers/registrationController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Register for an event
router.post(
    "/register",
    authMiddleware,
    registerForEvent
);

// Get logged-in user's registrations
router.get(
    "/my-registrations",
    authMiddleware,
    getMyRegistrations
);

// Cancel a registration
router.put(
    "/cancel/:registrationId",
    authMiddleware,
    cancelRegistration
);

module.exports = router;
