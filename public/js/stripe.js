/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = stripe('pk_test_51Mt5PuSCFXRL87G3GUSHujSd4h8Tm8WhRX3s4jzjEs97MIKFcyb7WxuGh24CjupDhZdq28IJMT1WuvnMKlbPWyIS00vxDbxANC');

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
