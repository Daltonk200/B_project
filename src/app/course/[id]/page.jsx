'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { getCourseAnswers } from './data';
import Link from 'next/link';

const CourseDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();

  // Navigation state
  const [activeTab, setActiveTab] = useState('questions');

  // Course data state
  const [courseAnswers, setCourseAnswers] = useState([]);

  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    name: '',
    comment: '',
    rating: ''
  });

  // Course data
  const courses = [
    {
      id: '1',
      title: 'DevOps',
      description: 'DevOps is a methodology in software development that emphasizes collaboration and automation.',
      reviews: [
        { name: 'John Doe', comment: 'Great course!', rating: 5 },
        { name: 'Jane Smith', comment: 'Very informative.', rating: 4 },
      ],
    },
    {
      id: '2',
      title: 'Software Testing',
      description: 'Software testing is the art of testing software for quality assurance.',
      reviews: [],
    },
    {
      id: '3',
      title: 'Technical Writing',
      description: 'Technical writing focuses on creating documentation and user guides.',
      reviews: [
        { name: 'Alice Johnson', comment: 'Clear and concise.', rating: 5 },
      ],
    },
  ];

  const course = useMemo(() => courses.find((c) => c.id === id), [id]);

  // Effect for loading course answers
  useEffect(() => {
    if (id) {
      const answers = getCourseAnswers(id);
      setCourseAnswers(answers);
    }
  }, [id]);

  // Separate effect for loading reviews
  useEffect(() => {
    if (course) {
      const savedReviews = JSON.parse(localStorage.getItem(`reviews-${id}`)) || [];
      const existingReviewIds = new Set(savedReviews.map(review => review.name));
      const uniqueCourseReviews = course.reviews.filter(review => !existingReviewIds.has(review.name));
      setReviews([...uniqueCourseReviews, ...savedReviews]);
    }
  }, [id, course]);

  // Event handlers
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    const updatedReviews = [
      ...reviews,
      {
        name: newReview.name,
        comment: newReview.comment,
        rating: newReview.rating ? parseInt(newReview.rating, 10) : null,
      },
    ];

    setReviews(updatedReviews);
    localStorage.setItem(`reviews-${id}`, JSON.stringify(updatedReviews));
    setNewReview({ name: '', comment: '', rating: '' });
  };

  // Render functions
  const renderQuestionsContent = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-700">Course Answers</h3>
        
        {user ? (
          courseAnswers.length > 0 ? (
            <div className="space-y-4">
              {courseAnswers.map((qa, index) => (
                <div key={index} className="bg-white shadow rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">{qa.question}</h4>
                  <p className="text-gray-600">{qa.answer}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No answers available yet for this course.</p>
          )
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
            <p className="text-gray-600 mb-4">Please sign in to see the course answers</p>
            <Link 
              href="/signin" 
              className="inline-block bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Sign In to View Answers
            </Link>
          </div>
        )}
      </div>
    );
  };

  if (!course) {
    return <p>Course not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">{course.title}</h1>

      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => handleTabChange('questions')}
          className={`flex-1 py-2 text-center ${
            activeTab === 'questions' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-500'
          }`}
        >
          Questions
        </button>
        <button
          onClick={() => handleTabChange('answers')}
          className={`flex-1 py-2 text-center ${
            activeTab === 'answers' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-500'
          }`}
        >
          Answers
        </button>
        <button
          onClick={() => handleTabChange('reviews')}
          className={`flex-1 py-2 text-center ${
            activeTab === 'reviews' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-500'
          }`}
        >
          Reviews
        </button>
      </div>

      <div>
        {activeTab === 'questions' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Course Details</h2>
            <p className="text-gray-600 mb-6">{course.description}</p>
          </div>
        )}
        {activeTab === 'answers' && renderQuestionsContent()}
        {activeTab === 'reviews' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Reviews</h2>

            <div className="space-y-4 mb-6">
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-md">
                    <p className="font-semibold text-gray-700">{review.name}</p>
                    <p className="text-gray-600">{review.comment || 'No comment provided.'}</p>
                    {review.rating && <p className="text-yellow-500">Rating: {review.rating}/5</p>}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No reviews yet</p>
              )}
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                required
              />
              <textarea
                placeholder="Your Comment (optional)"
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
              <input
                type="number"
                placeholder="Rating (1-5)"
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                min="1"
                max="5"
              />
              <button
                type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetailPage;