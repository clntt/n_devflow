// // {mongodb password and username}
// // XHnN1Wh6Uh7TrPdN
// // cconnery14


// // mogodb connection string
// //mongodb+srv://cconnery14:XHnN1Wh6Uh7TrPdN@cluster0.qcikwc3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0



import mongoose from 'mongoose';

let isConnected : boolean = false;

export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URL) {
       return console.log('MISSING MONGODB_URL')
    };
    
    

    if(isConnected) {
       return console.log('MongoDB is already connected');
    };

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName : 'ndevflow',
            useNewUrlParser : true,
            useUnifiedTopology : true,
        })

        isConnected = true;

        console.log('Mongodb is connected')
    } catch (error) {
        console.log('Mongodb connection failed',error);
    }

};





