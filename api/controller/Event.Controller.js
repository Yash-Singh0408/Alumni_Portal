import Event from "../model/Event.Model.js";
import Student from "../model/student.model.js";
import dotenv from 'dotenv';
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import multer from "multer"; // For handling multipart form data

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup for file upload
const storage = multer.memoryStorage(); // Store file in memory buffer
export const upload = multer({ storage });

const createEvent = async (req, res) => {
  try {
    // Extract data from the request body
    const { title, description, date, location, createdBy } = req.body;

    // Check if all required fields are provided
    if (!title || !description || !date || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

 

    // Handle image upload to Cloudinary
    let eventImgUrl = null;
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: "image" }, (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        }).end(req.file.buffer);
      });

      eventImgUrl = result.secure_url; // Store the Cloudinary image URL
    }

    // Create new event
    const event = new Event({
      title,
      description,
      eventImg: eventImgUrl, // Use the Cloudinary URL
      date,
      location,
      createdBy,
    });

    // Save event to the database
    await event.save();

    // Return success response
    res.status(201).json({ message: "Event created successfully" });
  } catch (error) {
    console.error("Error while creating event:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getEvents = async (req,res)=>{
    try {
        const events = await Event.find()
        res.json(events);
    } catch (error) {
        console.log( "Error while getting Events ",error);
        res.status(500).send({message:"Internal Server Error"});

        
    }
}

// const updateEvent = async (req,res)=>{
//     try {
//         //get event from id
//         const eventId = req.params.id

//         //check if event exist
//         const event = await Event.findById(eventId);
//         if (!event) {
//             return res.status(404).json({ error: "Event not found" });
//             }

//         //get changes from body
//         const update = req.body

//         //update event
//         await Event.updateOne(
//             {"_id": eventId},
//             {$set: update}
//         )

//         //give response
//         res.status(200).json({ message: "Event updated successfully" });
//     } catch (error) {
//         console.log( "Error while updating Event ",error);
//         res.status(500).send({message:"Internal Server Error"});
//     }
// }

const updateEvent = async (req, res) => {
    try {
      const eventId = req.params.id;
  
      // Find the event by its ID
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
  
      // Update the existing fields
      const { title, description, date, location } = req.body;
      const update = { title, description, date, location };
  
      // Handle image upload if provided
      if (req.file) {
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ resource_type: "image" }, (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result);
          }).end(req.file.buffer);
        });
  
        update.eventImg = result.secure_url; // Use the new Cloudinary URL
      }
  
      // Update the event in the database
      await Event.updateOne({ _id: eventId }, { $set: update });
  
      // Return success response
      res.status(200).json({ message: "Event updated successfully" });
    } catch (error) {
      console.error("Error while updating event:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  
  
//delete event
const deleteEvent = async (req,res) =>{
    try {
        //get event id
        const eventId = req.params.id
        //check if event exist
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        //delete event
        await Event.deleteOne({"_id": eventId})
        
        //notify user
        res.status(200).json({ message: "Event deleted successfully" });

    } catch (error) {
        console.log("Error while Deleteing event");
        res.status(500).send({message:"Internal Server Error"});
        
    }
}

export {createEvent, getEvents, updateEvent, deleteEvent}
