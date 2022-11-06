import mongoose from "mongoose";
const database = {
  name: "database",
  password: "1478963",
};

const conectiongString = `mongodb+srv://Destroxides:${database.password}@cluster0.wjyc1.mongodb.net/${database.name}?retryWrites=true&w=majority`;

const initialConnect = async () => {
  mongoose.connect(conectiongString,)
  .then(() =>   console.log('Database connected')       
  )
  .catch(() =>  console.log('Database Problem with connected')) 
  
};

export default  initialConnect


