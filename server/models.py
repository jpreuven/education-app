from app import db, bcrypt
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_rules = ('-_password_hash', '-id')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    role = db.Column(db.String(20), nullable=False)

    __mapper_args__ = {
        'polymorphic_identity': 'user',
        'polymorphic_on': role
    }

    def __repr__(self):
        return '<User %r>' % self.username
    
    @hybrid_property
    def password_hash(self):
        raise AttributeError("password hashes may not be viewed")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))


class Student(User):
    __tablename__ = 'students'
    student_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)

    enrollments = db.relationship("Enrollment", back_populates="student", cascade="delete")
    courses = association_proxy("enrollments", "course")

    submissions = db.relationship("Submission", back_populates="student", cascade="delete")
    # Think about switching this to "submitted_assignments" as this will only populate once submissions occur
    assignments = association_proxy("submissions", "assignment")

    student_notes = db.relationship("StudentNote", back_populates="student", cascade="delete")

    serialize_rules = ('-_password_hash','-enrollments', '-submissions')

    __mapper_args__ = {
        'polymorphic_identity': 'student',
    }

    def to_dict(self, include_courses=True, include_assignments=True):
        student_dict = super().to_dict()
        if include_courses:
            student_dict['courses'] = [course.to_dict(include_students=False) for course in self.courses]
        if include_assignments:
            student_dict['assignments'] = [assignment.to_dict(include_students=False) for assignment in self.assignments]
        return student_dict


class Teacher(User):
    __tablename__ = 'teachers'
    serialize_rules = ('-_password_hash','-teacher_course_association' )
    teacher_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    
    teacher_course_association = db.relationship("TeacherCourseAssociation", back_populates="teacher", cascade="delete")
    courses = association_proxy("teacher_course_association", "course")
    
    teacher_notes = db.relationship("TeacherNote", back_populates="teacher", cascade="delete")

    
    __mapper_args__ = {
        'polymorphic_identity': 'teacher',
    }

    def to_dict(self, include_courses=True):
        teacher_dict = super().to_dict()
        if include_courses:
            teacher_dict['courses'] = [course.to_dict(include_teachers=False) for course in self.courses]
        return teacher_dict

class Course(db.Model, SerializerMixin):
    __tablename__ = 'courses'
    serialize_rules = ('-teacher_course_association','-enrollments', '-assignments.course')

    course_id = db.Column(db.Integer, primary_key=True)
    course_title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)

    teacher_course_association = db.relationship("TeacherCourseAssociation", back_populates="course", cascade="delete") 
    teachers = association_proxy("teacher_course_association", "teacher")

    enrollments = db.relationship("Enrollment", back_populates="course", cascade="delete") 
    students = association_proxy("enrollments", "student")

    assignments = db.relationship("Assignment", back_populates="course", cascade="delete") 

    student_notes = db.relationship("StudentNote", back_populates="course", cascade="delete") 
    teacher_notes = db.relationship("TeacherNote", back_populates="course", cascade="delete") 


    
    def to_dict(self, include_teachers=True, include_students=True):
        course_dict = super().to_dict()
        if include_teachers:
            course_dict['teachers'] = [teacher.to_dict(include_courses=False) for teacher in self.teachers]
        if include_students:
            course_dict['students'] = [student.to_dict(include_courses=False) for student in self.students]
        return course_dict


class TeacherCourseAssociation(db.Model, SerializerMixin):
    __tablename__ = 'teacher_course_associations'
    serialize_rules = ('-teacher.teacher_course_association', '-course.teacher_course_association')

    teacher_course_association_id = db.Column(db.Integer, primary_key=True)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.teacher_id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.course_id'), nullable=False)
    teacher = db.relationship("Teacher", back_populates="teacher_course_association")
    course = db.relationship("Course", back_populates="teacher_course_association")


class Enrollment(db.Model, SerializerMixin):
    __tablename__ = 'enrollments'
    enrollment_id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.student_id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.course_id'), nullable=False)
    enrollment_date = db.Column(db.Date, nullable=False)
    student = db.relationship("Student", back_populates="enrollments")
    course = db.relationship("Course", back_populates="enrollments")

class Assignment(db.Model, SerializerMixin):
    __tablename__ = 'assignments'
    serialize_rules = ('-submissions', '-course.assignments')
    # serialize_rules = ('-teacher_course_association','-enrollments')

    assignment_id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.course_id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    due_date = db.Column(db.Date, nullable=False)

    submissions = db.relationship("Submission", back_populates="assignment", cascade="delete") 
    students = association_proxy("submissions", "student")

    course = db.relationship("Course", back_populates="assignments")


    def to_dict(self, include_students=True):
        assignment_dict = super().to_dict()
        if include_students:
            assignment_dict['students'] = [student.to_dict(include_courses=False) for student in self.students]
        return assignment_dict

class Submission(db.Model, SerializerMixin):
    __tablename__ = 'submissions'
    serialize_rules = ('-student.submissions', '-assignment.submissions')

    submission_id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.student_id'), nullable=False)
    assignment_id = db.Column(db.Integer, db.ForeignKey('assignments.assignment_id'), nullable=False)
    submission_date = db.Column(db.Date, nullable=False)
    files = db.Column(db.String(255), nullable=False)
    student = db.relationship("Student", back_populates="submissions")
    assignment = db.relationship("Assignment", back_populates="submissions")

class StudentNote(db.Model, SerializerMixin):
    __tablename__ = "student_notes"
    serialize_rules = ('-student.student_notes', '-course.student_notes')

    note_id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.student_id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.course_id'), nullable=False)
    note_text = db.Column(db.String, nullable=False)
    student = db.relationship("Student", back_populates="student_notes")
    course = db.relationship("Course", back_populates="student_notes")

class TeacherNote(db.Model, SerializerMixin):
    __tablename__ = "teacher_notes"
    serialize_rules = ('-teacher.teacher_notes', '-course.teacher_notes')

    note_id = db.Column(db.Integer, primary_key=True)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.teacher_id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.course_id'), nullable=False)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    google_id = db.Column(db.String, nullable=False)
    teacher = db.relationship("Teacher", back_populates="teacher_notes")
    course = db.relationship("Course", back_populates="teacher_notes")


