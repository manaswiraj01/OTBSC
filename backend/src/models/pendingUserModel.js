import mongoose from "mongoose";
import validator from "validator";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { getNames } from "country-list";

const { Schema } = mongoose;

const pendingUserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 50,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            maxlength: 50,
            unique: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Invalid email format");
                }
            },
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        phoneNo: {
            type: String,
            required: true,
            trim: true,
            validate(value) {
                const phoneNumber = parsePhoneNumberFromString(value);
                if (!phoneNumber || !phoneNumber.isValid()) {
                    throw new Error("Invalid phone number");
                }
                if (
                    this.countryCode &&
                    phoneNumber.countryCallingCode !== this.countryCode.replace("+", "")
                ) {
                    throw new Error("Phone number and country code do not match");
                }
            },
        },
        countryCode: {
            type: String,
            required: true,
            trim: true,
            maxlength: 5,
            minlength: 1,
            validate(value) {
                if (!value.startsWith("+")) {
                    throw new Error("Country code must start with +");
                }
                if (!/^\+\d{1,4}$/.test(value)) {
                    throw new Error("Invalid country code format");
                }
            },
        },
        gender: {
            type: String,
            required: true,
            trim: true,
            validate(value) {
                if (!["male", "female", "other"].includes(value.toLowerCase())) {
                    throw new Error("Enter a valid gender type");
                }
            },
        },
        dob: {
            type: Date,
            required: true,
            validate(value) {
                if (!validator.isDate(value)) {
                    throw new Error("Invalid date format");
                }
            },
        },
        nationality: {
            type: String,
            required: true,
            trim: true,
            validate(value) {
                if (!["Indian", "Foreigner"].includes(value)) {
                    throw new Error("Invalid nationality");
                }
            },
        },
        country: {
            type: String,
            required: true,
            trim: true,
            validate(value) {
                const validCountries = getNames();
                if (!validCountries.includes(value)) {
                    throw new Error("Invalid country name");
                }
            },
        },

        otp: {
            type: String,
            required: true,
        },

        otpExpiresAt: {
            type: Date,
            required: true,
        },

        otpLastSentAt: {
            type: Date,
            required: true,
        },
        sessionExpiresAt: {
            type: Date,
            default: () => new Date(Date.now() + 30 * 60 * 1000), // 30 min
            expires: 0
        }
    },
    {
        timestamps: true,
    }
);

// Auto delete pending user after 30 min
pendingUserSchema.index({ createdAt: 1 }, { expireAfterSeconds: 1800 });

const PendingUser = mongoose.model("PendingUser", pendingUserSchema);
export default PendingUser;