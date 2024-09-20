import Event from "../model/Event.Model.js";

const createEvent = async(req,res) =>{
    try {
        //get data from body
        const {title,description,eventImg,date,location} = req.body;
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

        //add data in mongodb
        const event = new Event({
            title:title,
            description:description,
            eventImg:eventImg,
            date:date,
            location:location
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

export default createEvent
