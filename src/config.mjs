import dotenv from "dotenv";

dotenv.config();

export default {
    publicUrl: process.env.PUBLIC_URL,
    port: parseInt(process.env.PORT, 10),
    dev: JSON.parse(process.env.DEV.toLowerCase())
};
