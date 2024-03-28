from app import app, db
from models import *
from faker import Faker
from datetime import datetime

fake = Faker()

COURSE_NAMES = [
    "Biology 101",
    "Calculus I",
    "Chemistry Fundamentals",
    "Introduction to Psychology",
    "English Composition",
    "History of Art",
    "Computer Science Basics",
    "Linear Algebra"
]

def seed_data():
    try:
        db.drop_all()
        db.create_all()

        # Create Teachers
        teachers = []
        for _ in range(5):
            teacher = Teacher(username=fake.user_name(), email=fake.email(),
                            _password_hash='password', first_name=fake.first_name(), last_name=fake.last_name(), role='teacher')
            teacher.password_hash = 'password'
            teachers.append(teacher)
            db.session.add(teacher)

        # Create Courses
        courses = []
        for name in COURSE_NAMES:
            course = Course(course_title=name, description=fake.text(),
                            start_date=datetime.now().date(), end_date=datetime.now().date())
            courses.append(course)
            db.session.add(course)

        db.session.commit()

        # # Assign Teachers to Courses
        # for i, teacher in enumerate(teachers):
        #     course = courses[i % len(courses)]  # Ensure each teacher is assigned to a course
        #     association = TeacherCourseAssociation(
        #         teacher_id=teacher.id, course_id=course.course_id)  # Use .id instead of .teacher_id
        #     db.session.add(association)
        # Assign Teachers to Courses
        for i, teacher in enumerate(teachers):
            if i == 0:  # Check if it's the first teacher
                if len(courses) >= 6:  # Check if there are at least 6 courses
                    # Assign the first teacher to approximately 6 courses
                    for j in range(6):
                        association = TeacherCourseAssociation(
                            teacher_id=teacher.id, course_id=courses[j].course_id)
                        db.session.add(association)
                else:
                    print("Error: Not enough courses to assign to the first teacher.")
                    break
            else:
                # Assign other teachers to courses as before
                course = courses[i % len(courses)]
                association = TeacherCourseAssociation(
                    teacher_id=teacher.id, course_id=course.course_id)
                db.session.add(association)



        # Create Assignments for Each Course
        for course in courses:
            assignment1 = Assignment(course_id=course.course_id, title=fake.sentence(),
                                    description=fake.paragraph(), due_date=fake.future_date())
            assignment2 = Assignment(course_id=course.course_id, title=fake.sentence(),
                                    description=fake.paragraph(), due_date=fake.future_date())
            db.session.add(assignment1)
            db.session.add(assignment2)

        db.session.commit()

        # Create Students
        students = []
        for _ in range(30):
            student = Student(username=fake.user_name(), email=fake.email(),
                            _password_hash='password', first_name=fake.first_name(), last_name=fake.last_name(), role='student')
            student.password_hash = 'password'
            students.append(student)
            db.session.add(student)

        db.session.commit()

        # Enroll Students in Courses (Each course has 6 students)
        for i in range(5):
            for j in range(i * 6, (i + 1) * 6):
                enrollment = Enrollment(student_id=students[j].id,
                                        course_id=courses[i].course_id, enrollment_date=datetime.now())
                db.session.add(enrollment)

        db.session.commit()

        print("Seed completed successfully.")

    except Exception as e:
        print(f"Error occurred: {e}")
        db.session.rollback()
        print("Seed failed.")

if __name__ == '__main__':
    print("Starting seed...")
    with app.app_context():
        seed_data()
