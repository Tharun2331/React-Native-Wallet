import { Redis } from '@upstash/redis'
import {Ratelimit} from "@upstash/ratelimit"
import "dotenv/config";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1000,"60 s"), // Increased from 100 to 1000 requests per minute
})

export default ratelimit;