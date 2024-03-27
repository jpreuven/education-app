# from app import app, db
# from models import *
# from datetime import datetime


# def seed_users():
#     # Create sample users

#     User.query.delete()
#     Student.query.delete()
#     Teacher.query.delete()
#     Course.query.delete()
#     TeacherCourseAssociation.query.delete()
#     Enrollment.query.delete()
#     Assignment.query.delete()
#     Submission.query.delete()

#     # Create sample student and teacher records
#     student1 = Student(username='student1', email='student1@example.com', 
#                        _password_hash='password', first_name='John', last_name='Doe', role='student')
#     student1.password_hash='password'
    
#     teacher1 = Teacher(username='teacher1', email='teacher1@example.com', 
#                        _password_hash='password', first_name='Jane', last_name='Smith', role='teacher')
#     teacher1.password_hash='password'
    

#     # Add students and teachers to the session
#     db.session.add(student1)
#     db.session.add(teacher1)
#     db.session.commit()

#     # Create sample courses
#     current_date = datetime.now().date()
#     course1 = Course(course_title='Mathematics', description='Introduction to Mathematics', start_date=current_date, end_date=current_date)
#     course2 = Course(course_title='Physics', description='Introduction to Physics', start_date=current_date, end_date=current_date)

#     # Add courses to the session
#     db.session.add(course1)
#     db.session.add(course2)
#     db.session.commit()

#     # Create sample teacher course associations
#     association1 = TeacherCourseAssociation( teacher_id=teacher1.teacher_id, course_id=course1.course_id)
#     association2 = TeacherCourseAssociation( teacher_id=teacher1.teacher_id, course_id=course2.course_id)

#     # Add associations to the session
#     db.session.add(association1)
#     db.session.add(association2)
#     db.session.commit()

#     # Create sample enrollments
#     enrollment1 = Enrollment(student_id=student1.student_id, course_id=course1.course_id, enrollment_date=datetime.now())
#     enrollment2 = Enrollment(student_id=student1.student_id, course_id=course2.course_id, enrollment_date=datetime.now())

#     # Add enrollments to the session
#     db.session.add(enrollment1)
#     db.session.add(enrollment2)
#     db.session.commit()

#     # Create sample assignments
#     assignment1 = Assignment(course_id=course1.course_id, title='Assignment 1', description='First assignment', due_date=datetime.now())
#     assignment2 = Assignment(course_id=course2.course_id, title='Assignment 1', description='First assignment', due_date=datetime.now())

#     # Add assignments to the session
#     db.session.add(assignment1)
#     db.session.add(assignment2)
#     db.session.commit()

#     # Create sample submissions
#     submission1 = Submission(student_id=student1.student_id, assignment_id=assignment1.assignment_id, submission_date=datetime.now(), files='file1')
#     submission2 = Submission(student_id=student1.student_id, assignment_id=assignment2.assignment_id, submission_date=datetime.now(), files='file2')

#     # Add submissions to the session
#     db.session.add(submission1)
#     db.session.add(submission2)
#     db.session.commit()


# if __name__ == '__main__':
#     print("Starting seed...")
#     with app.app_context():  # Enter application context
#         seed_users()
#     print("Seed completed successfully.")



########################################
# from app import app, db
# from models import *
# from faker import Faker
# from datetime import datetime

# fake = Faker()

# COURSE_NAMES = [
#     "Biology 101",
#     "Calculus I",
#     "Chemistry Fundamentals",
#     "Introduction to Psychology",
#     "English Composition"
# ]

# def seed_data():
#     db.drop_all()
#     db.create_all()

#     # Create Teachers
#     teachers = []
#     for _ in range(5):
#         teacher = Teacher(username=fake.user_name(), email=fake.email(),
#                            first_name=fake.first_name(), last_name=fake.last_name(), role='teacher')
#         teacher.password_hash = 'password'
#         teachers.append(teacher)
#         db.session.add(teacher)

#     # Create Courses
#     courses = []
#     for name in COURSE_NAMES:
#         course = Course(course_title=name, description=fake.text(),
#                         start_date=datetime.now().date(), end_date=datetime.now().date())
#         courses.append(course)
#         db.session.add(course)

#     # Assign Teachers to Courses
#     for i, teacher in enumerate(teachers):
#         association = TeacherCourseAssociation(
#             teacher_id=teacher.teacher_id, course_id=courses[i].course_id)
#         db.session.add(association)

#     # Create Students
#     students = []
#     for _ in range(30):
#         student = Student(username=fake.user_name(), email=fake.email(),
#                            first_name=fake.first_name(), last_name=fake.last_name(), role='student')
#         student.password_hash = 'password'
#         students.append(student)
#         db.session.add(student)

#     db.session.commit()

#     # Enroll Students in Courses (Each course has 6 students)
#     for i in range(5):
#         for j in range(i*6, (i+1)*6):
#             enrollment = Enrollment(student_id=students[j].id,
#                                     course_id=courses[i].course_id, enrollment_date=datetime.now())
#             db.session.add(enrollment)

#     # Create Assignments for Each Course
#     for course in courses:
#         assignment1 = Assignment(course_id=course.course_id, title=fake.sentence(),
#                                  description=fake.paragraph(), due_date=fake.future_date())
#         assignment2 = Assignment(course_id=course.course_id, title=fake.sentence(),
#                                  description=fake.paragraph(), due_date=fake.future_date())
#         db.session.add(assignment1)
#         db.session.add(assignment2)

#     db.session.commit()

# if __name__ == '__main__':
#     print("Starting seed...")
#     with app.app_context():  
#         seed_data()
#     print("Seed completed successfully.")

# ##############################################
# from app import app, db
# from models import *
# from faker import Faker
# from datetime import datetime

# fake = Faker()

# COURSE_NAMES = [
#     "Biology 101",
#     "Calculus I",
#     "Chemistry Fundamentals",
#     "Introduction to Psychology",
#     "English Composition"
# ]

# def seed_data():
#     try:
#         db.drop_all()
#         db.create_all()

#         # Create Teachers
#         teachers = []
#         for _ in range(5):
#             teacher = Teacher(username=fake.user_name(), email=fake.email(),
#                             _password_hash='password', first_name=fake.first_name(), last_name=fake.last_name(), role='teacher')
#             teacher.password_hash = 'password'
#             teachers.append(teacher)
#             db.session.add(teacher)

#         # Create Courses
#         courses = []
#         for name in COURSE_NAMES:
#             course = Course(course_title=name, description=fake.text(),
#                             start_date=datetime.now().date(), end_date=datetime.now().date())
#             courses.append(course)
#             db.session.add(course)

#         # Create Students
#         students = []
#         for _ in range(30):
#             student = Student(username=fake.user_name(), email=fake.email(),
#                               _password_hash='password', first_name=fake.first_name(), last_name=fake.last_name(), role='student')
#             student.password_hash = 'password'
#             students.append(student)
#             db.session.add(student)

#         db.session.commit()

#         # Assign Teachers to Courses
#         for i, teacher in enumerate(teachers):
#             course = courses[i % len(courses)]  # Ensure each teacher is assigned to a course
#             association = TeacherCourseAssociation(
#                 teacher_id=teacher.id, course_id=course.course_id)  # Use .id instead of .teacher_id
#             db.session.add(association)

#         # Enroll Students in Courses (Each course has 6 students)
#         for i in range(5):
#             for j in range(i * 6, (i + 1) * 6):
#                 enrollment = Enrollment(student_id=students[j].id,
#                                         course_id=courses[i].course_id, enrollment_date=datetime.now())
#                 db.session.add(enrollment)

#         db.session.commit()

#         print("Seed completed successfully.")

#     except Exception as e:
#         print(f"Error occurred: {e}")
#         db.session.rollback()
#         print("Seed failed.")

# if __name__ == '__main__':
#     print("Starting seed...")
#     with app.app_context():
#         seed_data()

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
    "English Composition"
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

        # Assign Teachers to Courses
        for i, teacher in enumerate(teachers):
            course = courses[i % len(courses)]  # Ensure each teacher is assigned to a course
            association = TeacherCourseAssociation(
                teacher_id=teacher.id, course_id=course.course_id)  # Use .id instead of .teacher_id
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
