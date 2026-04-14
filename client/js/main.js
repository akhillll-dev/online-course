// main.js

function buyCourse(courseId, title, price) {
    const course = {
        id: courseId,
        title: title,
        price: price
    };
    
    // Store in localStorage
    localStorage.setItem('selectedCourse', JSON.stringify(course));
    
    // Redirect to checkout
    window.location.href = 'checkout.html';
}
