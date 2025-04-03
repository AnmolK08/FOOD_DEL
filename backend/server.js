const express = require('express');
const app = express();

const cors = require('cors');
const connectDB = require('./config/db');
const userRouter = require('./routes/userRoute');
const foodRouter = require('./routes/foodRoute');
const cartRouter = require('./routes/cartRoute');
const orderRouter = require('./routes/orderRoute');

const port = process.env.PORT || 1800;

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/food", foodRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, (err) => {
    if(err) throw err;
    console.log(`Server running on port ${port}`);
})