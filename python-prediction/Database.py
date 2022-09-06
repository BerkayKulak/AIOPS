import mysql.connector
from mysql.connector import Error
import json
import sys
import time,os
connection = ""
SenderisChanged = False

def main():
    try:
        connection = mysql.connector.connect(host='localhost',
                                             database='aiopsdb',
                                             user='root',
                                             password='root')
        if connection.is_connected():


            db_Info = connection.get_server_info()
            print("Connected to MySQL Server version ", db_Info)
            cursor = connection.cursor()
            cursor.execute("select database();")
            record = cursor.fetchone()
            print("You're connected to database: ", record)


            # Opening JSON file
            f = open('data.json')
            file = open('Suggested.json')

            # returns JSON object as
            # a dictionary
            data = json.load(f)
            suggestedData = json.load(file)
            c = dict(data.items() | suggestedData.items())


            add_usageofserver = ("INSERT INTO usageserver "
                            "(id, SPH, UOM, UOC, IsPdfSend,paymentSystem,usingRAM,SuggestedPayment,SuggestedRam,memory,cpu,CreatedAt)"
                            "VALUES (%(id)s, %(SPH)s, %(UOM)s, %(UOC)s, %(IsPdfSend)s, %(paymentSystem)s,%(usingRAM)s, %(SuggestedPayment)s,%(SuggestedRam)s, %(memory)s, %(cpu)s, %(CreatedAt)s)")

            cursor.execute(add_usageofserver, c)
            connection.commit()


    except Error as e:
        print("Error while connecting to MySQL", e)
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

            print("MySQL connection is closed")



if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Interrupted')
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)


