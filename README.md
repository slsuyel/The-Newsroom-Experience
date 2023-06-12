# Summer Camp Learning School - The Newsroom Experience

Welcome to the README file for the Summer Camp Learning School project, **The Newsroom Experience**. This project aims to create an interactive web application that simulates a newsroom experience for summer camp students. 

The project is built using the MERN stack (MongoDB, Express.js, React.js, and Node.js) along with Firebase and Vercel for deployment. It provides a comprehensive learning platform where students can explore journalism, news reporting, and media production in a fun and educational way.

## Features

The Newsroom Experience web application offers the following features:

- **Top Slider Section**: A relevant slider displaying text, information, messages, and pictures to engage users. The design is customizable.

- **Popular Classes Section**: Display relevant pictures related to the classes or activities. Show the top 6 classes based on the number of students.

- **Popular Instructors Section**: Display relevant pictures related to the instructors. Show the top 6 instructors based on the number of students in their class. (Optional: Selecting top instructors based on the number of students)

**Student Dashboard**:
- **My Selected Classes**: Display the classes the student has booked, including relevant information. Provide options to delete or pay for a selected class.
- **My Enrolled Classes**: Show all the classes a student has successfully booked after payment.
- **Payment**: Redirect students to the payment page upon clicking the "Pay" button for a class in the "My Selected Classes" section. After successful payment, reduce available seats by 1, display class information in the "My Enrolled Classes" section, and remove it from the "My Selected Classes" section.
- **Payment History**: Create a payment history page for students, displaying their payment records sorted in descending order.

**Instructor Dashboard**:
- **Add a Class**: Allow instructors to add classes using a form with fields such as class name, class image, instructor name (read-only), instructor email (read-only), available seats, price, and an "Add" button. The added class's status will be set to pending.
- **My Classes**: Show all the classes an instructor has added, including relevant information such as status (pending/approved/denied), total enrolled students, feedback, and an "Update" button. Initially, the total enrolled students will be zero. If any student successfully books the class, display the total number of students.
- **Feedback**: If a class is pending or approved, no feedback will be available. If a class is denied by the admin, the admin can provide feedback explaining the denial reason, which will be displayed in the feedback column.

**Admin Dashboard**:
- **Manage Classes**: Display all classes added by instructors, including class image, class name, instructor name, instructor email, available seats, price, and status (pending/approved/denied). Provide buttons for approving, denying, and sending feedback.
- **Manage Users**: Allow the admin to view relevant information of all registered users. By default, all users are students. The admin can make users instructors or admins by clicking the respective buttons, which will then be disabled.
