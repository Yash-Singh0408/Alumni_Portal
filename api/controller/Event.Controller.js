import Event from "../model/Event.Model.js";
import Student from "../model/student.model.js";

const createEvent = async(req,res) =>{
    try {
        //get data from body
        const {title,description,eventImg,date,location, createdBy} = req.body;
        //check if all the required data are submitted
        if(!title){
            return res.status(400).json({message:"title is required"})
        }
        if(!description){
            return res.status(400).json({message:"description is required"})
        }
        if(!date){
            return res.status(400).json({message:"date is required"})
        }
        if(!location){
            return res.status(400).json({message:"location is required"})
        }

        const studentExists = await Student.findById(createdBy);
        if (!studentExists) {
            return res.status(404).json({ error: "Student not found" });
        }

        //add data in mongodb
        const event = new Event({
            title:title,
            description:description,
            eventImg:eventImg,
            date:date,
            location:location,
            createdBy: createdBy
        })
        //save data in mongodb
        await event.save()
        console.log(event);
        

        //give response
        res.status(201).json({message:"Event created successfully"})

        
    } catch (error) {
        console.log("Error while Creating Event ",error);
        res.status(500).send({message:"Internal Server Error"});
    }
}

const getEvents = async (req,res)=>{
    try {
        const events = await Event.find()
        res.json(events);
    } catch (error) {
        console.log( "Error while getting Events ",error);

        
    }
}

export {createEvent, getEvents}
