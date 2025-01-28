export const courseAnswers = [
    {
      courseId: '1',
      answers: [
        {
          question: "What is DevOps?",
          answer: "DevOps is a set of practices that combines software development and IT operations. It aims to shorten the systems development life cycle and provide continuous delivery with high software quality."
        },
        {
          question: "What are the key principles of DevOps?",
          answer: "The key principles include continuous delivery, automation, collaboration, and monitoring."
        }
      ]
    },
    {
      courseId: '2',
      answers: [
        {
          question: "What is software testing?",
          answer: "Software testing is the process of evaluating and verifying that a software product or application does what it is supposed to do."
        },
        {
          question: "What are the different types of testing?",
          answer: "Main types include unit testing, integration testing, system testing, and acceptance testing."
        }
      ]
    },
    {
      courseId: '3',
      answers: [
        {
          question: "What is technical writing?",
          answer: "Technical writing is the practice of documenting processes, such as software manuals or instructional materials."
        },
        {
          question: "What are the key skills for technical writing?",
          answer: "Key skills include clear communication, attention to detail, and understanding of technical concepts."
        }
      ]
    }
  ];
  
  export const getCourseAnswers = (courseId) => {
    const course = courseAnswers.find(course => course.courseId === courseId);
    return course ? course.answers : [];
  };