import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { getNames } from 'country-list';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 50,
    },
    photoUrl: {
        type: String,
        default: "",
        validate(value) {
            if (value && !validator.isURL(value)) {
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
    gender: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!['male', 'female', 'other'].includes(value.toLowerCase())) {
                throw new Error('Enter a valid gender type');
            }
        }
    },
    dob: {
        type: Date,
        required: true,
        validate(value) {
            if (!validator.isDate(value)) {
                throw new Error('Invalid date format');
            }
        }
    },
    nationality: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!['Indian', 'Foreigner'].includes(value)) {
                throw new Error('Invalid nationality');
            }
        }
    },
    country: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            const validCountries = getNames();
            if (!validCountries.includes(value)) {
                throw new Error('Invalid country name');
            }
        }
    }
},
    {
        timestamps: true
    });

userSchema.methods.getJWT = async function () {

    const user = this;
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "3d"
    })
    return token;
};
userSchema.methods.validatePassword = async function (PasswordInputByUser) {
    const user = this;
    const isPasswordValid = await bcrypt.compare(
        PasswordInputByUser,
        user.password
    );
    return isPasswordValid;
};


const User = mongoose.model('User', userSchema);
export default User;