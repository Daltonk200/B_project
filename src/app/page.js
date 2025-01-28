'use client';

import { useState } from 'react';
import Navbar from '../components/NavBar';
import CourseCard from '../components/CourseCard';
import AddCourseButton from '../components/AddCourseButton';

const courses = [
  {
    id: 1,
    title: 'DevOps',
    description: 'DevOps is a methodology in the sof...',
    image: '/images/img_1.png'
  },
  {
    id: 2,
    title: 'Software Testing',
    description: 'Software testing is the art of tes...',
    image: '/images/software_testing.png'
  },
  {
    id: 3,
    title: 'Technical Writing',
    description: 'Technical writing or drafting...',
    image: '/images/img-3.jpeg'
  }
];

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCourse = () => {
    // Add course functionality here
    console.log('Add course clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onSearch={setSearchQuery} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-6 text-black">My Published Courses</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <CourseCard
              key={course.id}
              {...course}
            />
          ))}
        </div>

        <AddCourseButton onClick={handleAddCourse} />
      </main>
    </div>
  );
};

export default Marketplace;