from app import app, db
from models import User

# def recreate_tables():
#     with app.app_context():
#         db.create_all()


def seed_users():
     with app.app_context():
        User.query.delete()
        yoni = User(username="yoni", email="yoni@gmail.com")
        yoni.password_hash = 'password'
        devorah = User(username="devorah", email="devorah@gmail.com")
        devorah.password_hash = 'password'
        db.session.add(yoni)
        db.session.add(devorah)

        db.session.commit()

if __name__ == '__main__':
    print("Starting seed...")
    seed_users()
    print("Seed completed successfully.")
