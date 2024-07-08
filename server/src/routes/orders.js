const express = require("express");
const router = express.Router();
const Order = require("../models/order");

router.post("/create", async (req, res) => {
    try {
        const {
            clientName,
            email,
            phone,
            address,
            items,
            totalPrice
        } = req.body;
        
        const newOrder = new Order({
            clientName,
            email,
            phone,
            address,
            items,
            totalPrice
        });

        const savedOrder = await newOrder.save();
        res.status(201).send(savedOrder);
    } catch(err){
        console.error(err);
        res.status(401).json({ message: err.message });
    }
});

router.put("/:id", async (req, res) => {
    const { clientName, email, phone, address, items, totalPrice } = req.body;

    try{ 
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                clientName, 
                email, 
                phone, 
                address, 
                items, 
                totalPrice
            },
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).send({ message: "Order not found" });
        }

        res.json(updatedOrder);
    }catch ( err){
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try{
        const order = await Order.findById(req.params.id);
        
        if (!order) {
            return res.status(404).json({ message : "Order not found" });
        }

        await order.remove();
        res.json({ message: "Order removed" });
    } catch (err){
        console.error(err);
        res.status(500).json({message: err.message});
    }
});

router.get("/", async (req,res)=>{
    try {
        const orders = await Order.find().sort({orderDate: -1 });
        res.json(orders)
    } catch(err){
        console.error(err);
        res.status(401).json({ message: err.message });
    }
});

module.exports = router;