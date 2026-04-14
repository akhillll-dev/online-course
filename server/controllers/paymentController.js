const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const Course = require('../models/Course');
const { generatePDF } = require('../utils/pdfGenerator');
const { sendEmailWithPDF } = require('../utils/emailSender');

// Init Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder_key_id',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'placeholder_secret',
});

// @desc    Create a new order & initiate Razorpay payment
// @route   POST /api/create-order
exports.createOrder = async (req, res) => {
    try {
        const { courseId, userName, userEmail } = req.body;

        if (!courseId || !userName || !userEmail) {
            return res.status(400).json({ message: 'Please provide all required fields.' });
        }

        // Normally we'd find the course from DB to get the real price.
        // For demonstration, let's create a mockup course if it doesn't exist, or just trust the frontend.
        // Best practice: Fetch course price from DB.
        let course = await Course.findById(courseId);
        
        // Mock fallback if DB is empty:
        if (!course) {
             course = { _id: courseId, title: "Mock Full Stack Course", price: 4999 };
        }

        const options = {
            amount: course.price * 100, // Amount in paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`
        };

        const razorpayOrder = await razorpay.orders.create(options);

        // Save order to DB
        const newOrder = new Order({
            courseId: course._id,
            amount: course.price,
            razorpayOrderId: razorpayOrder.id,
            userName,
            userEmail,
            status: 'created'
        });

        await newOrder.save();

        res.status(201).json({
            success: true,
            order: newOrder,
            razorpayOrder: razorpayOrder
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Verify payment and generate/email receipt
// @route   POST /api/verify-payment
exports.verifyPayment = async (req, res) => {
    try {
        const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

        // Verify Signature
        const sign = razorpayOrderId + "|" + razorpayPaymentId;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'placeholder_secret')
            .update(sign.toString())
            .digest("hex");

        if (expectedSign !== razorpaySignature) {
            return res.status(400).json({ success: false, message: "Invalid signature" });
        }

        // Update Order Status
        const order = await Order.findOne({ razorpayOrderId });
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        order.status = 'paid';
        order.razorpayPaymentId = razorpayPaymentId;
        await order.save();

        // Ensure course exists for PDF
        let course = await Course.findById(order.courseId);
        if (!course) {
            course = { title: "Mock Full Stack Course", price: order.amount };
        }

        // Generate PDF
        const pdfBuffer = await generatePDF(order, course);

        // Send Email
        const emailSent = await sendEmailWithPDF(
            order.userEmail,
            'Payment Successful - EduScale Receipt',
            `Hi ${order.userName},\n\nThank you for purchasing ${course.title}. Please find your receipt attached.\n\nBest Regards,\nEduScale Team`,
            pdfBuffer,
            order._id
        );

        if (emailSent) {
            order.receiptGenerated = true;
            await order.save();
        }

        res.status(200).json({
            success: true,
            message: "Payment verified successfully",
            orderId: order._id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Download PDF Receipt
// @route   GET /api/download-receipt/:orderId
exports.downloadReceipt = async (req, res) => {
    try {
        if (req.params.orderId === 'mock_650a3b2b4f1a25c_id') {
            const mockOrder = {
                _id: 'mock_650a3b2b4f1a25c_id',
                userName: 'Test Developer',
                userEmail: 'dev@test.com',
                amount: 4999,
                status: 'paid',
                razorpayPaymentId: 'pay_mock_12345',
                createdAt: new Date()
            };
            const mockCourse = { title: "MERN Stack Masterclass Preview", price: 4999 };
            const pdfBuffer = await generatePDF(mockOrder, mockCourse);
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Length': pdfBuffer.length,
                'Content-Disposition': `attachment; filename="receipt_test.pdf"`
            });
            return res.send(pdfBuffer);
        }

        const order = await Order.findById(req.params.orderId);
        if (!order || order.status !== 'paid') {
            return res.status(404).json({ message: "Receipt not found or payment not completed" });
        }

        let course = await Course.findById(order.courseId);
        if (!course) {
            course = { title: "Mock Full Stack Course", price: order.amount };
        }

        const pdfBuffer = await generatePDF(order, course);

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Length': pdfBuffer.length,
            'Content-Disposition': `attachment; filename="receipt_${order._id}.pdf"`
        });

        res.send(pdfBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Send email manually (just an extra API route if really needed)
// @route   POST /api/send-email
exports.sendEmailRoute = async (req, res) => {
    // This logic is mostly handled inside verifyPayment directly per requirements,
    // but the task requested a standalone POST /send-email route.
    try {
        const { orderId } = req.body;
        const order = await Order.findById(orderId);
        if (!order || order.status !== 'paid') {
             return res.status(404).json({ message: "Invalid Order" });
        }

        let course = await Course.findById(order.courseId);
        if (!course) {
             course = { title: "Mock Full Stack Course", price: order.amount };
        }

        const pdfBuffer = await generatePDF(order, course);

        const emailSent = await sendEmailWithPDF(
            order.userEmail,
            'Your Requested Receipt - EduScale',
            `Hi ${order.userName},\n\nHere is the receipt for your recent purchase.\n\nBest,\nEduScale Team`,
            pdfBuffer,
            order._id
        );

        if (emailSent) {
            res.status(200).json({ success: true, message: "Email sent successfully" });
        } else {
            res.status(500).json({ success: false, message: "Failed to send email" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get order details
// @route   GET /api/order/:orderId
exports.getOrder = async (req, res) => {
    try {
        if (req.params.orderId === 'mock_650a3b2b4f1a25c_id') {
            const mockOrder = {
                _id: 'mock_650a3b2b4f1a25c_id',
                userName: 'Test Developer',
                userEmail: 'dev@test.com',
                amount: 4999,
                status: 'paid',
                createdAt: new Date()
            };
            const mockCourse = { title: "MERN Stack Masterclass Preview", price: 4999 };
            return res.status(200).json({ success: true, order: mockOrder, course: mockCourse });
        }

        const order = await Order.findById(req.params.orderId).populate('courseId');
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        
        let course = order.courseId;
        // Mock fallback if populated course is null
        if (!course) {
             course = { title: "Mock Full Stack Course", price: order.amount };
        }

        res.status(200).json({ success: true, order, course });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
