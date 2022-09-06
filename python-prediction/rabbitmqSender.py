import sys
import threading
import time,os
import pika
import json

SenderisChanged = False
data = {}
def main():

    def channel(alive):
        connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
        channel = connection.channel()
        channel.queue_declare(queue="hello12")
        with open('data.json') as file:
            data = json.load(file)
        with open('Suggested.json') as f:
            suggested = json.load(f)
        c = dict(data.items() | suggested.items())
        channel.basic_publish(exchange='', routing_key='hello12', body=json.dumps(c),mandatory=False)
        print(" [x] Sent 'prediction sent")
        channel.stop_consuming()
        connection.close()

    def changed():
        global SenderisChanged
        while True:
            if (SenderisChanged):
                SenderisChanged = False
            else:
                time.sleep(0.2)


    t1 = threading.Thread(target=channel, args=(lambda: SenderisChanged,))
    t2 = threading.Thread(target=changed)

    t1.start()
    t2.start()




if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Interrupted')
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)
