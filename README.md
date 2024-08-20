Edupro - E-learning Platform Backend

Edupro is an e-learning platform backend designed to replicate the core functionalities of platforms like Udemy. This backend is built using Node.js, Express.js, MongoDB, and JWT authentication to manage course creation, user management, and purchase workflows.

Features:

Admin Routes:

Sign Up & Sign In:
Admins can create accounts and sign in using the provided authentication routes. Upon successful sign-up via the /admin/signup route, admins can log in using /admin/signin, which returns a JWT token for subsequent authorized actions.

Course Management:
Admins can create new courses by sending a POST request to /admin/courses, including the course title, description, price, and image link. This operation requires an authorization token. Admins can also fetch a list of all courses using the /admin/courses GET route.


User Routes:

User Registration & Authentication:
Users can sign up for a new account using the /users/signup route and sign in using /users/signin, which returns a JWT token for authenticating future requests.

Browse & Purchase Courses:
Users can view all available courses via the /users/courses route. To purchase a course, users can send a POST request to /users/courses/:courseId, where courseId is the ID of the course they wish to purchase. The purchased courses can be retrieved through the /users/purchasedCourses route.
