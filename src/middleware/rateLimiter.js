import ratelimit from "../config/upstash.js";

const ratelimiter =  async(req,res,next) =>  {
  try{
    // Use IP address for rate limiting instead of global limit
    const identifier = req.ip || req.connection.remoteAddress || 'anonymous';
    const {success} = await ratelimit.limit(identifier);

    if(!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later.",
      })
    }
    next();
  }
  catch(error){
    console.log("Rate Limit error", error);
    next(error)
  }
}

export default ratelimiter;