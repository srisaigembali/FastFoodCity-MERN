const router = require("express").Router();
const admin = require("firebase-admin");

router.get("/", (req, res) => {
  return res.send("inside user router");
});

router.get("/jwtverification", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send("Token Not Found");
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decodedValue = await admin.auth().verifyIdToken(token);
    if (!decodedValue) {
      return res
        .status(500)
        .send({ success: false, message: "Unauthorized Access" });
    }
    return res.status(200).json({ success: true, data: decodedValue });
  } catch (error) {
    return res.send({
      success: false,
      message: `Error in extracting the token: ${error}`,
    });
  }
});

module.exports = router;
