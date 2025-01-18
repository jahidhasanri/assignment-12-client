import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Testimonials = () => {
    const [reviews, setReviews] = useState([
        {
            id: 1,
            name: 'John Doe',
            rating: 5,
            comment: 'Amazing service! The delivery was fast, and the medicines were well-packaged.',
        },
        {
            id: 2,
            name: 'Sarah Ahmed',
            rating: 4,
            comment: 'Great experience overall. Customer support was very helpful.',
        },
        {
            id: 3,
            name: 'Ovi Ahmed',
            rating: 4,
            comment: 'Great experience overall. Customer support was very Good.',
        },
    ]);

    const [newReview, setNewReview] = useState({ name: '', rating: '', comment: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewReview((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newReview.name && newReview.rating && newReview.comment) {
            const updatedReviews = [
                ...reviews,
                { id: reviews.length + 1, ...newReview, rating: parseInt(newReview.rating, 10) },
            ];
            setReviews(updatedReviews);
            setNewReview({ name: '', rating: '', comment: '' });
            toast.success('Thank you for your feedback!');
        } else {
            toast.error('Please fill in all the fields.');
        }
    };

    return (
        <div className=' bg-gray-100'>
        <div className="container mx-auto p-6 md:p-12">
            <h2 className="text-2xl md:text-4xl font-bold text-center text-teal-600 mb-6">Customer Reviews & Testimonials</h2>
            <p className="text-center text-gray-700 mb-8">
                See what our customers are saying about MediCart. Your feedback helps us improve!
            </p>

            {/* Display Reviews */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                {reviews.map((review) => (
                    <div key={review.id} className="bg-white shadow-md rounded-lg p-4 border">
                        <h3 className="text-lg font-semibold text-teal-500">{review.name}</h3>
                        <p className="text-yellow-500">
                            {'⭐'.repeat(review.rating)}{' '}
                            <span className="text-gray-500">({review.rating}/5)</span>
                        </p>
                        <p className="text-gray-600 mt-2">{review.comment}</p>
                    </div>
                ))}
            </div>

            {/* Review Submission Form */}
            <div className="bg-white shadow-md rounded-lg p-6 md:p-10 mt-12 max-w-xl mx-auto">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Leave a Review</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={newReview.name}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-600">Rating</label>
                        <select
                            id="rating"
                            name="rating"
                            value={newReview.rating}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                            required
                        >
                            <option value="">Select Rating</option>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <option key={star} value={star}>
                                    {star} Star{star > 1 ? 's' : ''}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-600">Comment</label>
                        <textarea
                            id="comment"
                            name="comment"
                            value={newReview.comment}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                            placeholder="Write your review here"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-teal-500 text-white font-medium py-2 rounded-lg hover:bg-teal-600 transition duration-200"
                    >
                        Submit Review
                    </button>
                </form>
            </div>
        </div>

        </div>
    );
};

export default Testimonials;
