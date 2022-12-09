import time

while True:
    # Use 100% CPU for 5 seconds
    start_time = time.time()
    while time.time() - start_time < 5:
        pass

    # Use 50% CPU for 5 seconds
    start_time = time.time()
    while time.time() - start_time < 5:
        time.sleep(0.5)
