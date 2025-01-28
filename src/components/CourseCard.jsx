import Link from 'next/link';
import Image from 'next/image';

const CourseCard = ({ title, description, image, id }) => {
  return (
    <Link href={`/course/${id}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg">
        <div className="h-48 overflow-hidden relative"> {/* added relative for Next Image */}
          <Image
            src={image || "/images/default-course.jpg"}
            alt={title}
            fill={true}
            className="object-cover transition-transform duration-300 hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-[wheat] text-lg mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;