import express from 'express';
import { validateLocation } from '../utils/validation.js';
import Place from '../models/palceModel.js';
import cloudinary from '../utils/cloudinary.js';
import { adminAuth } from '../middlewares/adminAuth.js';

const placeRouter = express.Router();

placeRouter.post('/add/place', adminAuth, async (req, res) => {
    try {
        const {
            name,
            description,
            category,
            address,
            city,
            state,
            pincode,
            contactEmail,
            contactPhone,
            openingTime,
            closingTime,
            photoUrls,
            pricing
        } = req.body;

        const result = await validateLocation(state, city, pincode);
        if (!result.success) {
            return res.status(400).json(result);
        }

        const finalImageUrls = [];

        for (const [index, url] of photoUrls.entries()) {
            const uploadResponse = await cloudinary.uploader.upload(url, {
                transformation: [
                    { width: 1000, height: 750, crop: "fill", gravity: "auto" },
                    { quality: "auto" },
                    { fetch_format: "auto" },
                ],
                folder: `places/${name}/images`,
                public_id: `place_${name}_${Date.now()}_${index}`,
            });

            finalImageUrls.push(uploadResponse.secure_url);
        }

        const newPlace = new Place({
            name,
            description,
            category,
            address,
            city,
            state,
            pincode,
            contactEmail,
            contactPhone,
            openingTime,
            closingTime,
            photoUrls: finalImageUrls,
            pricing
        });

        const savedPlace = await newPlace.save();

        return res.status(200).json({
            success: true,
            message: 'Place added successfully',
            data: savedPlace
        });

    } catch (err) {
        console.error("Error adding place:", err.message);
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});

placeRouter.get('/get/places', adminAuth, async (req, res) => {
    try {
        const places = await Place.find();
        return res.status(200).json({
            success: true,
            data: places
        });
    } catch (err) {
        console.error("Error fetching places:", err.message);
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});

placeRouter.get('/get/place/:id', adminAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const place = await Place.findById(id);
        if (!place) {
            return res.status(404).json({
                success: false,
                message: 'Place not found',
            });
        }
        return res.status(200).json({
            success: true,
            data: place
        });
    } catch (err) {
        console.error("Error fetching place:", err.message);
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});

placeRouter.patch('/update/place/:id', adminAuth, async (req, res)=> {
    try {
        const { id } = req.params;
        const updates = req.body;

        const result = await validateLocation(updates.state, updates.city, updates.pincode);
        if (!result.success) {
            return res.status(400).json(result);
        }


        if (updates.photoUrls && updates.photoUrls.length > 0) {
            const finalImageUrls = [];
            for (const [index, url] of updates.photoUrls.entries()) {
                const uploadResponse = await cloudinary.uploader.upload(url, {
                    transformation: [
                        { width: 1000, height: 750, crop: "fill", gravity: "auto" },
                        { quality: "auto" },
                        { fetch_format: "auto" },
                    ],
                    folder: `places/${updates.name}/images`,
                    public_id: `place_${updates.name}_${Date.now()}_${index}`,
                });
                finalImageUrls.push(uploadResponse.secure_url);
            }
            updates.photoUrls = finalImageUrls;
        }

        const updatedPlace = await Place.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedPlace) {
            return res.status(404).json({
                success: false,
                message: 'Place not found',
            });
        }
        return res.status(200).json({
            success: true,
            data: updatedPlace
        });
    } catch (err) {
        console.error("Error updating place:", err.message);
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
})

export default placeRouter;
