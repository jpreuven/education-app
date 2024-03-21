from app import db, bcrypt
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

# class User(db.Model, SerializerMixin):
#     __tablename__ = 'users'
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(80), unique=True, nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#     _password_hash = db.Column(db.String, nullable=False)


#     def __repr__(self):
#         return '<User %r>' % self.username
    
#     @hybrid_property
#     def password_hash(self):
#         raise AttributeError("password hashes may not be viewed")

#     @password_hash.setter
#     def password_hash(self, password):
#         password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
#         self._password_hash = password_hash.decode("utf-8")

#     def authenticate(self, password):
#         return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))

# class User(db.Model, SerializerMixin):
#     __tablename__ = 'users'
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(80), unique=True, nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#     _password_hash = db.Column(db.String, nullable=False)
#     first_name = db.Column(db.String(50), nullable=False)
#     last_name = db.Column(db.String(50), nullable=False)

#     def __repr__(self):
#         return '<User %r>' % self.username
    
#     @hybrid_property
#     def password_hash(self):
#         raise AttributeError("password hashes may not be viewed")

#     @password_hash.setter
#     def password_hash(self, password):
#         password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
#         self._password_hash = password_hash.decode("utf-8")

#     def authenticate(self, password):
#         return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))

#     serialize_rules = ('-password_hash',)

# class Student(db.Model, SerializerMixin):
#     __tablename__ = 'students'
#     student_id = db.Column(db.Integer, primary_key=True)
#     username_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     user = db.relationship('User', backref=db.backref('student', uselist=False))

#     serialize_rules = ('-user._password_hash',)

# class Teacher(db.Model, SerializerMixin):
#     __tablename__ = 'teachers'
#     teacher_id = db.Column(db.Integer, primary_key=True)
#     username_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     user = db.relationship('User', backref=db.backref('teacher', uselist=False))

#     serialize_rules = ('-user._password_hash',)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
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

    serialize_rules = ('-password_hash', '-id')

class Student(User):
    __tablename__ = 'students'
    student_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)

    __mapper_args__ = {
        'polymorphic_identity': 'student',
    }

    serialize_rules = ('-password_hash',)

class Teacher(User):
    __tablename__ = 'teachers'
    teacher_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)

    __mapper_args__ = {
        'polymorphic_identity': 'teacher',
    }

    serialize_rules = ('-password_hash',)

class Course(db.Model, SerializerMixin):
    __tablename__ = 'courses'
    course_id = db.Column(db.Integer, primary_key=True)
    course_title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)

    serialize_rules = ('-students',)

class TeacherCourseAssociation(db.Model, SerializerMixin):
    __tablename__ = 'teacher_course_associations'
    section_id = db.Column(db.Integer, primary_key=True)
    section_title = db.Column(db.String(100), nullable=False)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.teacher_id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.course_id'), nullable=False)

class Enrollment(db.Model, SerializerMixin):
    __tablename__ = 'enrollments'
    enrollment_id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.student_id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.course_id'), nullable=False)
    enrollment_date = db.Column(db.Date, nullable=False)

class Assignment(db.Model, SerializerMixin):
    __tablename__ = 'assignments'
    assignment_id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.course_id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    due_date = db.Column(db.Date, nullable=False)

class Submission(db.Model, SerializerMixin):
    __tablename__ = 'submissions'
    submission_id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.student_id'), nullable=False)
    assignment_id = db.Column(db.Integer, db.ForeignKey('assignments.assignment_id'), nullable=False)
    submission_date = db.Column(db.Date, nullable=False)
    files = db.Column(db.String(255), nullable=False)