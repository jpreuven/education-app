from models import *
from flask import request, make_response, session, abort
from flask_restful import Resource
from datetime import datetime


from app import app, db, api

class Signup(Resource):
    def post(self):
        username = request.get_json()["username"]
        email = request.get_json()["email"]
        new_user = User(
            username=username,
            email=email,
        )
        password = request.get_json()["password"]
        new_user.password_hash = password
        db.session.add(new_user)
        db.session.commit()
        session["user_id"] = new_user.id
        print(f"User ID from session: {session}")
        return make_response(new_user.to_dict(), 200)
    

api.add_resource(Signup, "/signup", endpoint="signup")

class Login(Resource):
    def post(self):
        username = request.get_json()["username"]
        user = User.query.filter(User.username == username).first()
        password = request.get_json()["password"]
        if user.authenticate(password):
            session["user_id"] = user.id
            session.modified = True
            print(f"User Logged in. Session data: {session}")

            return make_response(user.to_dict(), 200)

        return {"error": "Invalid username or password"}, 401

api.add_resource(Login, "/login", endpoint="login")

class CheckSession(Resource):
    def get(self):
        user_id=session.get("user_id")
        session.modified = True
        user = User.query.filter(User.id == session.get("user_id")).first()
        # user_id=session

        print(f"User ID from session: {session}")
        if user:
            return make_response(user.to_dict(), 200)

        else:
            return {"message": "401: Not Authorized"}, 401

api.add_resource(CheckSession, "/check_session")

class Logout(Resource):
    def delete(self):
        session.pop("user_id", None)  # Remove user_id from session
        print(session)
        return {"message": "User logged out successfully"}, 204

api.add_resource(Logout, "/logout")


class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]

        return make_response(users, 200)
    
api.add_resource(Users, "/users")

class UserByID(Resource):
    def get(self, id):
        user = User.query.filter(User.id == id).first()
        if user:
            return make_response(user.to_dict(), 200)
        else:
            return {"message": "401: Not Authorized"}, 401
api.add_resource(UserByID, "/users/<int:id>")

class Students(Resource):
    def get(self):
        students = [student.to_dict() for student in Student.query.all()]

        return make_response(students, 200)
    
api.add_resource(Students, "/students")


class Teachers(Resource):
    def get(self):
        teachers = [teacher.to_dict() for teacher in Teacher.query.all()]

        return make_response(teachers, 200)
    
api.add_resource(Teachers, "/teachers")

class Courses(Resource):
    def get(self):
        courses = [courses.to_dict() for courses in Course.query.all()]

        return make_response(courses, 200)
    
api.add_resource(Courses, "/courses")

class Assignments(Resource):
    def get(self):
        assignments = [assignments.to_dict() for assignments in Assignment.query.all()]

        return make_response(assignments, 200)
    def post(self):
        data = request.get_json()
        description = data["description"]
        title = data["title"]
        date  = data["due_date"]
        year = int(date[0:4])
        month = int(date[5:7])
        day = int(date[8:10])
        due_date = datetime(year, month, day)
        course_id = data["course_id"]
        try:
            new_assignment = Assignment(course_id=course_id, title=title, description=description, due_date=due_date)
        except ValueError as e:
            abort(422, e.args[0])
        db.session.add(new_assignment)
        db.session.commit()
        return make_response(new_assignment.to_dict(), 201)
    
api.add_resource(Assignments, "/assignments")

class TeacherNotes(Resource):
    def get(self):
        teacher_notes = [teacher_notes.to_dict() for teacher_notes in TeacherNote.query.all()]

        return make_response(teacher_notes, 200)
    def post(self):
        data = request.get_json()
        teacher_id = data["teacher_id"]
        course_id = data["course_id"]
        note_text = data["note_text"]
        try:
            new_teacher_note = TeacherNote(course_id=course_id, teacher_id=teacher_id, note_text=note_text)
        except ValueError as e:
            abort(422, e.args[0])
        db.session.add(new_teacher_note)
        db.session.commit()
        return make_response(new_teacher_note.to_dict(), 201)
    
api.add_resource(TeacherNotes, "/teachernotes")




# class Enrollments(Resource):
#     def get(self):
#         enrollments = [enrollments.to_dict() for enrollments in Enrollment.query.all()]

#         return make_response(enrollments, 200)
    
# api.add_resource(Enrollments, "/enrollments")
