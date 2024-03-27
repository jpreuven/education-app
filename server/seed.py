from app import app, db
from models import *
from datetime import datetime


# def recreate_tables():
#     with app.app_context():
#         db.create_all()


def seed_users():
    #  with app.app_context():
    #     User.query.delete()
    #     yoni = User(username="yoni", email="yoni@gmail.com")
    #     yoni.password_hash = 'password'
    #     devorah = User(username="devorah", email="devorah@gmail.com")
    #     devorah.password_hash = 'password'
    #     db.session.add(yoni)
    #     db.session.add(devorah)

    #     db.session.commit()
    # Create sample users

    User.query.delete()
    Student.query.delete()
    Teacher.query.delete()
    Course.query.delete()
    TeacherCourseAssociation.query.delete()
    Enrollment.query.delete()
    Assignment.query.delete()
    Submission.query.delete()



    # user1 = User(username='student1', first_name='John', last_name='Doe', email='john@example.com', role='student')
    # user1.password_hash='password'
    # user2 = User(username='teacher1', first_name='Jane', last_name='Smith', email='jane@example.com', role='teacher')
    # user2.password_hash='password'

    # Add users to the session
    # db.session.add(user1)
    # db.session.add(user2)
    # db.session.commit()

    # Create sample student and teacher records
    student1 = Student(username='student1', email='student1@example.com', 
                       _password_hash='password', first_name='John', last_name='Doe', role='student')
    student1.password_hash='password'
    
    teacher1 = Teacher(username='teacher1', email='teacher1@example.com', 
                       _password_hash='password', first_name='Jane', last_name='Smith', role='teacher')
    teacher1.password_hash='password'
    

    # Add students and teachers to the session
    db.session.add(student1)
    db.session.add(teacher1)
    db.session.commit()

    # Create sample courses
    current_date = datetime.now().date()
    course1 = Course(course_title='Mathematics', description='Introduction to Mathematics', start_date=current_date, end_date=current_date)
    course2 = Course(course_title='Physics', description='Introduction to Physics', start_date=current_date, end_date=current_date)

    # Add courses to the session
    db.session.add(course1)
    db.session.add(course2)
    db.session.commit()

    # Create sample teacher course associations
    association1 = TeacherCourseAssociation( teacher_id=teacher1.teacher_id, course_id=course1.course_id)
    association2 = TeacherCourseAssociation( teacher_id=teacher1.teacher_id, course_id=course2.course_id)

    # Add associations to the session
    db.session.add(association1)
    db.session.add(association2)
    db.session.commit()

    # Create sample enrollments
    enrollment1 = Enrollment(student_id=student1.student_id, course_id=course1.course_id, enrollment_date=datetime.now())
    enrollment2 = Enrollment(student_id=student1.student_id, course_id=course2.course_id, enrollment_date=datetime.now())

    # Add enrollments to the session
    db.session.add(enrollment1)
    db.session.add(enrollment2)
    db.session.commit()

    # Create sample assignments
    assignment1 = Assignment(course_id=course1.course_id, title='Assignment 1', description='First assignment', due_date=datetime.now())
    assignment2 = Assignment(course_id=course2.course_id, title='Assignment 1', description='First assignment', due_date=datetime.now())

    # Add assignments to the session
    db.session.add(assignment1)
    db.session.add(assignment2)
    db.session.commit()

    # Create sample submissions
    submission1 = Submission(student_id=student1.student_id, assignment_id=assignment1.assignment_id, submission_date=datetime.now(), files='file1')
    submission2 = Submission(student_id=student1.student_id, assignment_id=assignment2.assignment_id, submission_date=datetime.now(), files='file2')

    # Add submissions to the session
    db.session.add(submission1)
    db.session.add(submission2)
    db.session.commit()


if __name__ == '__main__':
    print("Starting seed...")
    with app.app_context():  # Enter application context
        seed_users()
    # seed_users()
    print("Seed completed successfully.")
