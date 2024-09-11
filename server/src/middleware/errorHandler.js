module.exports = (err,req,res,next) => {
    console.error(err.stack);

    // if (err.name === "ValidationError") {
    //     res.status(400).json({message:err.message});
    // }else if (err.name === "DatabaseError") {
    //     res.status(500).json({message: "Database error occurred"});
    // }else if (err.name === "TokenError") {
    //     res.status(401).json({message: "Authentication token is missing"});
    // } else {
    //     res.status(500).json({message: err.message});
    // }
};