from flask import Flask, render_template

app = Flask(__name__)

print("hello")

@app.route('/')
def landing_page():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)