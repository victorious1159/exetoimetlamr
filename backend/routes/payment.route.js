const express = require("express");
const {
  getCheckoutUrl,
  sendEmailNotify,
} = require("../controller/payment.controller");
const { getCheckoutComboUrl } = require("../controller/paymentcombos.controller");
const router = express.Router();

router.post("/checkout", getCheckoutUrl);
router.post("/sendEmailNotify", sendEmailNotify);
router.post('/checkout-url', getCheckoutComboUrl);
module.exports = router;
