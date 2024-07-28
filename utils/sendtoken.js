


exports.sendtoken = (student, statusCode, res) => {
    const token = student.jwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        http: true,
        // for secure https protocol
        // secure:true,
    };

    res.status(statusCode).cookie("token",token, options).json({success:true, id:student._id,token:token})

    res.status(statusCode).json({ token })
}