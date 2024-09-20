import Student from "../model/student.model.js";

export const test = ( req, res)=>{
    res.send("hello world");
}

export const deleteStudent = async (req,res) =>{
    try {
        //get event id
        const studentId = req.params.id
        //check if event exist
        const event = await Student.findById(studentId);
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