import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import parsePhoneNumberFromString from "libphonenumber-js";
import jwt from "jsonwebtoken";

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        trim: true,
        maxlength: [50, "Name cannot exceed 50 characters"],
        minlength: [3, "Name must be at least 3 characters long"],
    },
    photoUrl: {
        type: String,
        default: 'https://res.cloudinary.com/dpff5adhn/image/upload/v1753735617/esref-yasa-MOQ-CUuED8w-unsplash_x11c7w.jpg',
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid Photo Url");
            }
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 50,
        lowercase: true,
        enum : {
            values: ['manaswirajsharma1001@gmail.com', 'kb2426111@gmail.com', 'mohitmittal8955@gmail.com'],
            message: 'Not a valid email. Please use one of the predefined emails.'
        },
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email format');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error('password is not strong enough');
            }
        }
    },
    phoneNo: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            const phoneNumber = parsePhoneNumberFromString(value);
            if (!phoneNumber || !phoneNumber.isValid()) {
                throw new Error('Invalid phone number');
            }
            if (this.countryCode && phoneNumber.countryCallingCode !== this.countryCode.replace('+', '')) {
                throw new Error(`Phone number and country code do not match`);
            }
        }
    },
    countryCode: {
        type: String,
        required: true,
        trim: true,
        maxlength: 5,
        minlength: 1,
        validate(value) {
            if (!value.startsWith('+')) {
                throw new Error('Country code must start with +');
            }
            if (!/^\+\d{1,4}$/.test(value)) {
                throw new Error('Invalid country code format');
            }
        }
    },
}, { timestamps: true });

adminSchema.methods.getJWT = async function () {

    const user = this;
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "3d"
    })
    return token;
};
adminSchema.methods.validatePassword = async function (PasswordInputByUser) {
    const user = this;
    const isPasswordValid = await bcrypt.compare(
        PasswordInputByUser,
        user.password
    );
    return isPasswordValid;
};

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
