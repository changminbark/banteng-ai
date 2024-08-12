from app import create_app

app = create_app('app.config.Config')


@app.route('/status', methods=['GET'])
def status():
    return 'Running!'


if __name__ == '__main__':
    app.run()
