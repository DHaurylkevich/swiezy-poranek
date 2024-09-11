const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/", orderController.getOrders);

router.post("/create", orderController.createOrder);

/*
router.put("/:id", orderController.updateOrderById);

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
*/

module.exports = router;