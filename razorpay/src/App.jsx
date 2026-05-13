import { useEffect } from "react";
import axios from "axios";

function App() {
  // Load Razorpay Script
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.async = true;

    document.body.appendChild(script);
  }, []);

  const payNow = async () => {
    // Create Order
    const response = await axios.post("http://localhost:3000/create-order");

    const order = response.data;

    // Razorpay Options
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,

      amount: order.amount,

      currency: order.currency,

      order_id: order.id,

      name: "My Website",
      method: {
        upi: true,
      },

      description: "Test Payment",

      // Success
      handler: async function (response) {
        const verifyResponse = await axios.post(
          "http://localhost:3000/verify-payment",
          response,
        );

        if (verifyResponse.data.status === "success") {
          alert("Payment Success");
        } else {
          alert("Payment Failed");
        }
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      console.log(response.error);

      alert("Payment Failed By razorpay handler ");
    });

    rzp.open();
  };

  return (
    <div>
      <button onClick={payNow}>Pay ₹500</button>
    </div>
  );
}

export default App;
