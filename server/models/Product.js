import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    default: 'Anonymous Daredevil'
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  verifiedPurchase: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    tagline: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0
    },
    originalPrice: {
      type: Number,
      min: 0
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Streetwear', 'Footwear', 'Tech & Gadgets', 'Accessories', 'Art & Prints', 'Collectibles']
    },
    tags: [
      {
        type: String,
        trim: true
      }
    ],
    badge: {
      type: String,
      default: null
    },
    badgeColor: {
      type: String,
      default: 'yellow' // yellow, pink, cyan, lime, orange
    },
    images: {
      type: [String],
      required: [true, 'At least one product image is required']
    },
    stock: {
      type: Number,
      required: true,
      default: 25,
      min: 0
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    isNewDrop: {
      type: Boolean,
      default: false
    },
    sizes: {
      type: [String],
      default: ['S', 'M', 'L', 'XL']
    },
    colors: [
      {
        name: { type: String, required: true },
        hex: { type: String, required: true }
      }
    ],
    specs: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true }
      }
    ],
    rating: {
      type: Number,
      default: 5.0,
      min: 0,
      max: 5
    },
    numReviews: {
      type: Number,
      default: 0
    },
    reviews: [reviewSchema]
  },
  {
    timestamps: true
  }
);

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function () {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

// Configure JSON serialization to include virtuals
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
