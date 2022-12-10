from flask import Flask, request, render_template

# Create a new Flask app, giving the name of the current Python module
app = Flask(__name__)

@app.route('/')
def upload_form():
    return render_template('upload_form.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part'

    file = request.files['file']

    if file.filename == '':
        return 'No file selected'

    if file:
        file.save('/app/uploads/' + file.filename)

    return render_template('upload_success.html', filename=file.filename)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
