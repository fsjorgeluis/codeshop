import asyncHandler from 'express-async-handler';

import Order from '../models/orderModel.js';

// @desc    Create new Order
// @route   POST /api/orders
// @access  private
const addOrder = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
});

// @desc    Get order by id
// @route   POST /api/orders/:id
// @access  private
const getOrderById = asyncHandler(async (req, res) => {
    const { params: { id } } = req;
    const order = await Order.findById({ _id: id })
        .populate('user', 'name email');

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found!');
    }
});

export {
    addOrder,
    getOrderById
};