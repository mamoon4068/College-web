const imageBase = "https://res.cloudinary.com/dbmivpy1j/image/upload";

const imagePaths = {
  "AboutUs-College-image.jpg": "v1794988408/AboutUs-College-image.jpg",
  "Director-pic.png": "v1794991379/Director-pic.png",
  "Principal.png": "v1794991461/Principal.png",
  "college-logo.jpg": "v1794991365/college-logo.jpg",
  "hero-club-vew-image.jpeg": "v1794991403/hero-club-vew-image.jpg",
  "hero-computer-image.jpeg": "v1794991409/hero-computer-image.jpg",
  "hero-event-image.jpeg": "v1794991417/hero-event-image.jpg",
  "hero-prayar-vew-image.jpeg": "v1794991426/hero-prayar-vew-image.jpg",
  "hero-prayer-2 image.jpeg": "v1794991434/hero-prayer-2_image.jpg",
  "hero-section govt-image.jpeg": "v1794991442/hero-section_govt-image.jpg",
  "hero-staff-image.jpeg": "v1794991450/hero-staff-image.jpg",
  "hero.png": "v1794991395/hero.png",
  "student-Profile/6-8 image.png": "v1794991484/6-8_image.png",
  "student-Profile/9-12-image.png": "v1794991491/9-12-image.png",
  "student-Profile/Pri-Primary-image.png": "v1794991510/Pri-Primary-image.png",
  "student-Profile/Primary-image.png": "v1794991504/Primary-image.png",
  "student-Profile/student-01.png": "v1794991522/student-01.png",
  "student-Profile/student-02.png": "v1794991529/student-02.png",
  "student-Profile/student-03.png": "v1794991538/student-03.png",
  "student-Profile/student-04.png": "v1794991543/student-04.png",
  "student-Profile/student-05.png": "v1794991549/student-05.png",
  "student-Profile/student-06.png": "v1794991559/student-06.png",
  "student-Profile/student-07.png": "v1794991572/student-07.png",
  "student-Profile/student-08.png": "v1794991577/student-08.png"
};

export const schoolImages = Object.fromEntries(
  Object.entries(imagePaths).map(([key, imagePath]) => [key, `${imageBase}/${imagePath}`])
);
