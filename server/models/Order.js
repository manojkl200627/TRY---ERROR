import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  image: { type: String, required: true },
  selectedSize: { type: String },
  selectedColor: { type: String }
});

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true
    },
    items: [orderItemSchema],
    shippingDetails: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, default: 'United States' }
    },
    paymentDetails: {
      method: {
        type: String,
        enum: ['CARD', 'CRYPTO', 'CASH_ON_DELIVERY'],
        default: 'CARD'
      },
      last4: { type: String, default: '4242' },
      status: {
        type: String,
        enum: ['PAID', 'PENDING', 'FAILED'],
        default: 'PAID'
      }
    },
    subtotal: { type: Number, required: true },
    shippingFee: { type: Number, required: true, default: 0 },
    discountAmount: { type: Number, default: 0 },
    couponCode: { type: String, default: null },
    tax: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true },
    orderStatus: {
      type: String,
      enum: ['CONFIRMED', 'PROCESSING', 'DISPATCHED', 'DELIVERED', 'CANCELLED'],
      default: 'CONFIRMED'
    },
    trackingNumber: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
