const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);

module.exports = router;

// POST-The login function from the userController is invoked when a request is made to this route.
// GET-The logOut function from the userController is invoked when a request is made to this route.
// The :id parameter likely represents the user who is logging out.
