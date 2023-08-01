import { useState } from 'react';
import axios from 'axios';

//import window from 'razorpay';
const { STRIPE_KEY_ID } = process.env;
function Premium() {
  const [inputs, setInput] = useState({ name: '', email: '', amount: 500, phone: '' });
  const handleInput = async (e) => {
    e.preventDefault();
    console.log(inputs);
    let order = await axios.post('http://localhost:8080/payment', inputs);
    order = order.data;
    console.log(order.status);
    if (order.status === '404' || order.status==='500') {
      alert(order.data.message);
    } else {
  
      console.log(order);
      let id = order.order.id;
      const options = {
        key: STRIPE_KEY_ID,
        amount: inputs.amount * 100,
        currency: "INR",
        order_id: id,

        prefill: {
          name: inputs.name,
          email: inputs.email,
          contact: inputs.phone
        },
        handler: async (res) => {
          try {
            const data = await axios.post('http://localhost:8080/payment/verify/'+inputs.email, res);
            console.log(data);
          } catch (err) {
            console.log('error');
          }
        },
        notes: {
          address: 'Razorpay Corporate Office'
        },
        theme: {
          color: '#121212'
        }
      };
      const razor = new window.Razorpay(options);
      razor.open();
    }
  };
  return (
    <div className="row">
      <div className="mx-auto col-10 col-md-8 col-lg-6">

        <form className="form-example" onSubmit={handleInput}>
          <h1>Payment For Premium Account</h1>

          <div className="form-group">
            <label for="name">Name:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="name..."
              name="name"
              onChange={(e) => {
                setInput({ ...inputs, name: e.target.value });
              }}
              value={inputs.name || ""}

            />
          </div>
          <div className="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email..."
              name="email"
              onChange={(e) => {
                setInput({ ...inputs, email: e.target.value })
              }}
              value={inputs.email || ""}

            />
          </div>
          <div className="form-group">
            <label for="phone">Phone:</label>
            <input
              type="phone"
              className="form-control"
              id="phone"
              placeholder="phone..."
              name="email"
              onChange={(e) => {
                setInput({ ...inputs, phone: e.target.value })
              }}
              value={inputs.phone || ""}

            />
          </div>
          <div className="form-group">
            <label for="premium">Premium Cost:</label>
            <input
              type="number"
              className="form-control"
              id="premium"
              placeholder="Premium..."
              name="premium"
              value={inputs.amount}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-customized mt-4">
            Pay
          </button>
        </form>

      </div>
    </div>
  )
}
export default Premium;