const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const comboSchema = new mongoose.Schema(
    {
        comboName: {
            type: String,
            required: true,
        },
        comboDescription: {
            type: String,
            required: true,
        },
        comboProducts: [
            {
                type: ObjectId,
                ref: "products",
                required: true,
            },
        ],
        comboPrice: {
            type: Number,
            required: true,
        },
        comboStatus: {
            type: String,
            required: true,
        },
        comboReviews: [
            {
                review: String,
                user: { type: ObjectId, ref: "users" },
                rating: String,
                createdAt: {
                    type: Date,
                    default: Date.now(),
                },
            },
        ],
    },
    { timestamps: true }
);

const comboModel = mongoose.model("combos", comboSchema);
module.exports = comboModel;
