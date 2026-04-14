// checkout.js

const API_URL = 'https://online-course-58y2.onrender.com/api';

document.addEventListener('DOMContentLoaded', () => {
    // Load course from localStorage
    const courseDataStr = localStorage.getItem('selectedCourse');
    if (!courseDataStr) {
        alert('No course selected. Returning to home.');
        window.location.href = 'index.html';
        return;
    }

    const course = JSON.parse(courseDataStr);

    // Display summary
    document.getElementById('course-title-display').textContent = course.title;
    document.getElementById('course-price-display').textContent = `₹${course.price}`;
    document.getElementById('course-total-display').textContent = `₹${course.price}`;

    // Handle form submit
    const form = document.getElementById('payment-form');
    const payBtn = document.getElementById('pay-btn');
    const simulateBtn = document.getElementById('simulate-btn');
    const loadingMsg = document.getElementById('loading-msg');

    if (simulateBtn) {
        simulateBtn.addEventListener('click', async () => {
            const name = document.getElementById('name').value || "Test User";
            const email = document.getElementById('email').value || "test@example.com";
            
            simulateBtn.disabled = true;
            loadingMsg.textContent = "Simulating payment verification...";
            loadingMsg.style.display = 'block';

            try {
                // Create dummy order and bypass razorpay completely just to hit backend code
                const orderRes = await axios.post(`${API_URL}/create-order`, {
                    courseId: course.id,
                    userName: name,
                    userEmail: email
                });

                const dbOrderId = orderRes.data.order._id;
                
                // For a proper test, verify expects razorpayOrderId which we have in orderRes 
                const mockVerifyRes = await axios.post(`${API_URL}/verify-payment`, {
                    razorpayOrderId: orderRes.data.razorpayOrder.id,
                    razorpayPaymentId: "mock_payment_id_" + Date.now(),
                    // Generating a dummy signature won't work unless backend skips it. 
                    // Actually, if we hit the backend, it will fail signature check since we don't have the secret!
                    // Let's just bypass the verify route in simulate mode entirely and mock a successful localStorage:
                });
            } catch (err) {
                // The verification or order API might fail because of keys/sigs,
                // so we fallback strictly to frontend simulation:
            }

            // Fallback generic frontend mock (so user can preview success page without DB)
            localStorage.setItem('lastOrderId', 'mock_650a3b2b4f1a25c_id');
            document.getElementById('payment-modal').style.display = 'flex';
            setTimeout(() => {
                window.location.href = 'success.html';
            }, 3000);
        });
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        // UI Loading State
        payBtn.disabled = true;
        loadingMsg.style.display = 'block';

        try {
            // 1. Create order on backend
            const orderRes = await axios.post(`${API_URL}/create-order`, {
                courseId: course.id,
                userName: name,
                userEmail: email
            });

            const { razorpayOrder, order: dbOrder } = orderRes.data;

            // 2. Setup Razorpay options
            const options = {
                key: 'rzp_test_placeholder_key_id', // Replace with valid test key in actual env
                amount: razorpayOrder.amount, // amount in paise
                currency: "INR",
                name: "EduScale",
                description: `Payment for ${course.title}`,
                order_id: razorpayOrder.id,
                handler: async function (response) {
                    // 3. Verify Payment
                    try {
                        const verifyRes = await axios.post(`${API_URL}/verify-payment`, {
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature
                        });

                        if (verifyRes.data.success) {
                            // Save orderId for receipt download on success page
                            localStorage.setItem('lastOrderId', verifyRes.data.orderId);
                            
                            // Show confirmation modal
                            document.getElementById('payment-modal').style.display = 'flex';
                            
                            // Redirect after 3 seconds
                            setTimeout(() => {
                                window.location.href = 'success.html';
                            }, 3000);
                        } else {
                            window.location.href = 'cancel.html';
                        }
                    } catch (err) {
                        console.error('Verification failed', err);
                        window.location.href = 'cancel.html';
                    }
                },
                prefill: {
                    name: name,
                    email: email
                },
                theme: {
                    color: "#6366f1"
                }
            };

            const rzp = new Razorpay(options);
            
            rzp.on('payment.failed', function (response){
                 console.error(response.error);
                 window.location.href = 'cancel.html';
            });

            rzp.open();

        } catch (error) {
            console.error('Error creating order:', error);
            alert('Failed to initiate payment. Please try again.');
        } finally {
            payBtn.disabled = false;
            loadingMsg.style.display = 'none';
        }
    });
});
