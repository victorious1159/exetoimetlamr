const PayOS = require("@payos/node");
const payos = new PayOS(
  process.env.PayOS1,
  process.env.PayOS2,
  process.env.PayOS3
);

const getCheckoutComboUrl = async (req, res) => {
  try {
    const data = req.body;
    const { amountTotal, address, phone } = data;
    const orderCode = new Date().getTime();
    
    const order = {
      amount: amountTotal,
      description: `Checkout order`,
      orderCode: orderCode,
      returnUrl: `${process.env.WEBAPP_URL}/payment/success?address=${encodeURIComponent(address)}&phone=${encodeURIComponent(phone)}&amount=${encodeURIComponent(amountTotal)}`,
      cancelUrl: `${process.env.WEBAPP_URL}/payment/cancel`,
    };

    const paymentLink = await payos.createPaymentLink(order);
    res.json({ url: paymentLink.checkoutUrl });
  } catch (error) {
    console.error("Error creating checkout URL:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCheckoutComboUrl,
};
