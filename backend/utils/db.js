import mongoose from "mongoose";

export const connectDb = () => {
  const dbString = process.env.URI;
  mongoose
    .connect(dbString, {
      useNewUrlParser: true,
    })
    .then((con) => {
      // console.log(con.connections);
      console.log("DB connection completed");
    })
    .catch((e) => console.log(e));
};
