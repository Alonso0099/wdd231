// responsive navigation on buttons
const navButton = document.querySelector('#ham-btn');
const navBar = document.querySelector('#nav-bar');

//toggle the show class off and on
navButton.addEventListener('click', () => {
  navButton.classList.toggle('show');
  navBar.classList.toggle('show');
});

// footer date
const currentYear = document.querySelector('#currentYear');
const lastModified = document.querySelector('#lastModified');

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modified: ${document.lastModified}`;

//Course data
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
        'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
        'Python'
        ],
        completed: true
        },
        {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
        'C#'
        ],
        completed: true
    },
        
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
        'HTML',
        'CSS'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
        'HTML',
        'CSS',
        'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
        'HTML',
        'CSS',
        'JavaScript'
        ],
        completed: false
    }
];

// course rendering
const coursesContainer = document.querySelector('#courses-container');
const totalCredits = document.querySelector('#total-credits');
const courseDetails = document.querySelector('#course-details');

function displayCourses(coursesList) {
  coursesContainer.innerHTML  = "";

  coursesList.forEach((course) => {
    const courseCard = document.createElement("div");
    courseCard.classList.add("course-card");

    if (course.completed === true){
      courseCard.classList.add("completed");
      courseCard.textContent =`✔ ${course.subject} ${course.number}`;
    } else{
      courseCard.textContent =`${course.subject} ${course.number}`;
    }
      courseCard.addEventListener('click', () => {
    displayCourseDetails(course);
    });
    coursesContainer.appendChild(courseCard);
  }); 
 //Display credits 
  displayCredits(coursesList);
}
// course credits
function displayCredits(coursesList) {
  const credits = coursesList.reduce((total, course) => total + course.credits, 0);
  totalCredits.textContent = credits;
}

//Course filtering 
const filterButtons = document.querySelectorAll('.course-filter');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
  const filter = button.dataset.filter;
 
  filterButtons.forEach((btn) => {
    btn.classList.remove('active');
  });

  button.classList.add('active');

  if (filter === 'ALL') {
    displayCourses(courses);
  } else {
    const filteredCourses = courses.filter((course) => course.subject === filter);
    displayCourses(filteredCourses);
  }
 });
});

//Initial display
displayCourses(courses);

function displayCourseDetails(course) {
  courseDetails.innerHTML = '';

  courseDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits:</strong> ${course.credits}</p>
    <p><strong>Certificate:</strong> ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
  `;

  courseDetails.showModal();

  const closeModal = document.querySelector('#closeModal');

  closeModal.addEventListener('click', () => {
    courseDetails.close();
  });
}