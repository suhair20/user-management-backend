import mongoose from "mongoose";

const connectDB=async()=>{
    try {
        const conn = await mongoose.connect("mongodb+srv://moidheensuhair:123456%40rz@mernauth.wzkkxzg.mongodb.net/?retryWrites=true&w=majority&appName=MernAuth", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`mongodb connected :${conn.connection.host}`);
    } catch (error) {
        console.log(`Error:${error.message}`);
        process.exit(1);

    }
}

export default connectDB
