import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  date: String,
  slots: [
    {
      time: String,
      booked: { type: Boolean, default: false },
      userDetails: {
        name: String,
        email: String
      },
      paymentStatus: String,
      completed: { type: Boolean, default: false },

    }

  ]
});

const Slot = mongoose.models.Slot || mongoose.model("Slot", slotSchema);

export default Slot;
