const AddCourseButton = ({ onClick }) => {
    return (
      <div className="mt-12 text-center">
        <div className="inline-block p-4">
          <span className="text-xl">✨</span>
        </div>
        <h2 className="text-xl text-black font-semibold mb-4">Let's get started!</h2>
        <button 
          onClick={onClick}
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
        >
          Add your first course
        </button>
      </div>
    );
  };
  
  export default AddCourseButton;