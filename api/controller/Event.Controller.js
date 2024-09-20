import Event from "../model/Event.Model.js";
import Student from "../model/student.model.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer"; // For handling multipart form data

// Multer setup for file upload
const storage = multer.memoryStorage(); // Store file in memory buffer
export const upload = multer({ storage });



const createEvent = async (req, res) => {
    console.log("Request body:", req.body); 
  
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  
    try {
      // Get data from body
      const { title, description, eventImg, date, location, createdBy } = req.body;
  
      // Validate required fields
      if (!title) return res.status(400).json({ message: "Title is required" });
      if (!description) return res.status(400).json({ message: "Description is required" });
      if (!date) return res.status(400).json({ message: "Date is required" });
      if (!location) return res.status(400).json({ message: "Location is required" });
      if (!createdBy) return res.status(400).json({ message: "createdBy (student ID) is required" });
  
      // Check if the student exists
      const studentExists = await Student.findById(createdBy);
      if (!studentExists) return res.status(404).json({ error: "Student not found" });
  
      // Handle image upload to Cloudinary
      let ImageUrl = null;
      if (req.file) {
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
            if (error) {
              console.error("Cloudinary Upload Error:", error);
              return reject(error);
            }
            resolve(result);
          }).end(req.file.buffer);
        });
  
        ImageUrl = result.secure_url;
      }
  
      if (!req.file && !eventImg) {
        return res.status(400).json({ message: "Event image is required" });
      }
  
      // Add event to MongoDB
      const event = new Event({
        title,
        description,
        date,
        location,
        createdBy,
        eventImg: ImageUrl || eventImg, // Use Cloudinary URL if available, else use provided URL
      });
  
      // Save the event
      await event.save();
  
      // Respond with success
      res.status(201).json({ message: "Event created successfully", event });
    } catch (error) {
      console.log("Error while Creating Event", error);
      res.status(500).send({ message: "Internal Server Error" });
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

const updateEvent = async (req,res)=>{
    try {
        //get event from id
        const eventId = req.params.id

        //check if event exist
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
            }

        //get changes from body
        const update = req.body

        //update event
        await Event.updateOne(
            {"_id": eventId},
            {$set: update}
        )

        //give response
        res.status(200).json({ message: "Event updated successfully" });
    } catch (error) {
        console.log( "Error while updating Event ",error);
        res.status(500).send({message:"Internal Server Error"});
    }
}

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
