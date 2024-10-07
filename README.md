HotelRoomBookingSystem/
    ├── index.js               # Main server file
    ├── src/
        ├── configs/
        │   └── dbConnection.js    # Database connection file
        ├── controllers/
        │   └── userController.js  # User-related operations
        │   └── roomController.js  # Room-related operations
        │   └── bookingController.js  # Booking-related operations
        ├── models/
        │   └── user.js            # User schema
        │   └── room.js            # Room schema
        │   └── booking.js         # Booking schema
        ├── middlewares/
        │   └── authMiddleware.js  # User authentication and role-based access control
        │   └── errorHandler.js    # Error handling middleware
        ├── routes/
        │   └── userRoutes.js      # User-related routes
        │   └── roomRoutes.js      # Room-related routes
        │   └── bookingRoutes.js   # Booking-related routes
        └── utils/
            └── helpers.js         # Utility functions
    ├── .env                   # Environment variables
    ├── .gitignore             # Ignored files and directories
    ├── package.json           # Project dependencies and scripts
    └── README.md              # Project documentation
