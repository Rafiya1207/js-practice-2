import { connect } from "@db/redis";

const redis = await connect({
  username: "default",
  password: "gMN1sKsMd1h4fLEoGRwpbYkMFT3TT8fr",
  socket: {
    host: "redis-10030.c212.ap-south-1-1.ec2.cloud.redislabs.com",
    port: 10030,
  },
});

await redis.set("bar", "baz", { ex: 1 });
// await redis.expire("bar", 1)
setTimeout(async () => {
  if (await redis.get("bar")) {
    console.log(await redis.get("bar"))
    console.log(await redis.del("bar"))
    console.log(await redis.get("bar"))
    console.log("included");
  }
}, 2000);

console.log(await redis.get("bar"));
