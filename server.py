#!/usr/bin/python3.6 
from flask import Flask, request,jsonify
import time
import string

app = Flask(__name__)
global Notification,KeyList,Valid
###########A list of dictionary, store cookie, messageId, App Icon, timeStamp, message###############
############status:0--new coming 1--have sent to web 2--have been read by user###############
Notification = []
DeviceNotification = {}
###########A list of dictionary, store UserName, DeviceId, DeviceName and cookie###########
AccountList = []
UserList = []
#####################A list of key#################
#KeyList =["0|com.tencent.mm|382907095|null|10191"]
#KeyList =["0|com.samsung.android.messaging|123|com.samsung.android.messaging:MESSAGE_RECEIVED:10|10041"]
KeyList = []
#### dictionary, store UserName, list of devices
#DeviceList = {}

MESSAGEID = 1

# def login_ldap(username, password):
#  try:
#    print("start...")
#    server = "ldap://citrite.net:389"
#    baseDN = "dc=citrite,dc=net"

#    username = "citrite\\" + username

#    retrieveAttributes = None

#    conn = ldap.initialize(server)
#    conn.set_option(ldap.OPT_REFERRALS, 0)

#    print(conn.simple_bind_s(username, password))
#    print("ldap connect successfully")
#    return 1

#  except ldap.LDAPError as e:
#    print("error")
#    print(e)
#    return 0

def after_request(resp):
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Headers'] ='Content-Type'
    return resp

app.after_request(after_request)


@app.route('/login',methods=['POST'])
def webLogin():
    print("start login")
    userName = request.json['userName']
    passWord = request.json['passWord']
    ts = time.time()
    cookie = userName + str(ts)
    print("create cookie")
    for i in range(0,len(UserList)):
      if UserList[i]['userName'] == userName and UserList[i]['passWord'] == passWord:
         UserList[i]['cookie'] = cookie
         print(userName)
         return jsonify({'Status': 1, 'Cookie': UserList[i]})
    
    return jsonify ({'Status': 0, 'Cookie': UserList[i]})


@app.route('/register',methods=['POST'])
def registerD():
    global Valid
    devicenumber = 1

    if not request.json:
      abort(400)
    #verify the user credential and get the cookie
    # Valid = login_ldap(request.json['userName'],request.json['password'])
    Valid = 1
    if Valid == 1:
      ts = time.time()
      cookie = request.json['deviceId'] + str(ts)
      if AccountList is not []:
         for i in range(0,len(AccountList)):
           if AccountList[i]['userName'] ==  request.json['userName'] and AccountList[i]['deviceId'] ==  request.json['deviceId']:
              AccountList[i]['cookie'] = cookie
              return jsonify({'Status': Valid, 'Cookie': AccountList[i]})
           elif AccountList[i]['userName'] ==  request.json['userName']:
                devicenumber = devicenumber + 1

      devicename = 'Android Mobile ' +str(devicenumber)
      AccountList.append(
         {
         'userName': request.json['userName'],
         'cookie': cookie,
         'deviceId': request.json['deviceId'],
         'deviceName': devicename,
         'deviceIcon':'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'
         }
       )
      i = len(AccountList)

      return jsonify({'Status': Valid, 'Cookie': AccountList[i-1]})
    else:
      return jsonify({'Status': Valid, 'Cookie': []})

@app.route('/unregister',methods=['POST'])



@app.route('/getdevicelist',methods=['GET'])

def GetDeviceList():
    username = request.args.get('userName')
    devicelist = []
    print(username)
    for i in range(0, len(AccountList)):
        if AccountList[i]['userName'] == username:
            print('device id is',AccountList[i]['deviceId'])
            print('device name is ',AccountList[i]['deviceName'])
            devicelist.append(
                {
                    'deviceId':AccountList[i]['deviceId'],
                    'deviceName': AccountList[i]['deviceName'],
                    'deviceIcon':AccountList[i]['deviceIcon']
                }
            )

    return jsonify(devicelist)



@app.route('/getdevicenotification',methods=['GET'])

def GetDeviceNotification():
    global Notification
    deviceid = request.args.get('deviceId')
    print('Asking for notification of deviceID %s', deviceid)
    print('Notification length is %s', len(Notification))
    devicenotification = []

    for i in range(0, len(Notification)):
        if Notification[i]['deviceId'] == deviceid:

 #           if Notification[i]['status'] == 0:
  #              Notification[i]['status'] = 1
            devicenotification.append(Notification[i])

    print(Notification)

    return jsonify(devicenotification)

@app.route('/postmessagestatus',methods=['POST'])

def SetMessageStatus():
    global Notification
    if not request.json:
        abort(400)
    messageid = request.json['msgId']
    print(messageid)
    for i in range(0, len(Notification)):
        if Notification[i]['msgId'] == messageid:
            Notification[i]['status'] = 1
            print('message %s status changes to read', messageid)
    return 'ok'

@app.route('/postclearmessagestatus',methods=['POST'])

def clearMessageStatus():
    global Notification
    if not request.json:
        abort(400)
    messageid = request.json['msgId']
    print(messageid)
    for i in range(0, len(Notification)):
        if Notification[i]['msgId'] == messageid:
            Notification[i]['status'] = 0
            print('message %s status changes back to 0', messageid)
    return 'ok'



## device post notification to server.
  ##         'icon': request.json['icon'],

@app.route('/postnotification',methods=['POST'])
def AddNotify():
    global MESSAGEID
    msgid = str(MESSAGEID)
    if not request.json:
      abort(400)
    Notification.insert(0,
            {
                'deviceId': request.json['deviceId'],
                'app': request.json['app'],
                'tickerText': request.json['tickerText'],
                'title': request.json['title'],
                'subText': request.json['subText'],
                'bigText': request.json['bigText'],
                'text': request.json['text'],
                'subText': request.json['subText'],
                'key': request.json['key'],
                'postTime': request.json['postTime'],
                'cookie': request.json['cookie'],
                'status': 0,
                'msgId' : msgid
                }
        )
    #print(KeyList)

    MESSAGEID = MESSAGEID + 1
    print('MESSAGEID is %s', MESSAGEID)
    ReKeyList = []
    for i in range(0, len(KeyList)):
      ReKeyList.append(KeyList[i])
    #print(ReKeyList)
    del KeyList[0:]
    #print(KeyList)
    return jsonify({'KeyCount': len(ReKeyList), 'KeyList': ReKeyList})

####################web get notification from server #################
@app.route('/getnotification',methods=['GET'])
def GetNotify():
    global Notification
    username = request.args.get('userName')
    print(username)
    ReNotification = []
#    LeftNotification = []
#    DelIndex = []
    for i in range(0, len(AccountList)):
      #print(len(AccountList))
      if AccountList[i]['userName'] == username:
         #print(AccountList[i])
         for j in range(0,len(Notification)):
           if AccountList[i]['cookie'] == Notification[j]['cookie']:
      #         if Notification[j]['status'] == 0 :
      #            Notification[j]['status'] = 1
               ReNotification.append(Notification[j])
#              DelIndex.append(j)
 #          else:
#              LeftNotification.append(Notification[j])
 #   Notification = LeftNotification
#    if DelIndex is not []:
#      for k in range(0,len(DelIndex)):
#        del Notification[k]
#    print(LeftNotification)
    return jsonify(ReNotification)

################once the user has read the message from storeFront, this function is called,
################we'll store the key in KeyList, and delete the Notification element correspond to the key
@app.route('/postread',methods=['POST'])
def PostRead():
    key = request.args.get('key')
    print(key)
    KeyList.append(key)
    '''
    for i in range(0,len(Notification)):
      if Notification[i]['key'] == key:
        del Notification[i]
        break
        '''
    return 'Ok'


if __name__ == '__main__':

    UserList.append(
        {
            'userName': "weige",
            'cookie': "",
            'passWord':"zjw666"
        }
    )
############### value for testing
    AccountList.append(
        {
            'userName': "yuanb",
            'cookie': "99971558943267.2937844",
            'deviceId': "9997",
            'deviceName': 'Android device 1',
            'deviceIcon':'iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAA32SURBVHhe7Z0LdJTFFcfvvnfzfkASQoBQQni3ISgvBTxUMNZa1Na2VK2cg0c51WprsdXWnr6OhfZ4aqtWW/XU+uix1BYBQaigqMBRCRDRJIABCSSsISxJyCb7fvTe2YnNY5N8+8D9vsz8ILBzdzff7sx/Zu7M3G9GF0ZAIix6/r9EUKQABEcKQHCkAARHCkBwNCWAs51H4K1jv+MpdXHSsRfeOPIbntIOmhLAh80b4O1jD+P/L3OLenjjyK9hZ/0vIBwOcYs20JQAlk3/JRgNFtj8wZ2qyuh9xx8FR3cDzJt4B+h02upVNecDfOvS58FsyICn3lnKLamlw9UMexoegTRTHlw/+0lu1Q6aE0BZwVIoHbUYLrib4f2TT3Nr6nilZg37/+qZ6wF07KGm0JwAiBsv+RtAGGAv1rwuj4NbP3/2YtN/zlmPolwGkwuXcau20OxaQEPrTthQvQrGZM2C1Yt2cOvg+AIu/HGyPpq+8rGW18AX9LDnCjKnQHFOBQTDAQiHApBpG8PsQ9HWdRKe2bscLMZMuPvKg1j5NVj9EU0vBm08tAaOtmyDK6bcDwsn3cmtEbo8rdDcfhAON7+EBd8NHe7TTASRgsJ/dfRIRw0JEv7MqQyhCHLTSsFgMMO43HkwNrcSphZdzZ7rzTN7roK27k/gutl/hvLC5dyqPTQtAJevHZ7dew3WZCfctmgX+IMu1iw3OvaAP+TG4tWjw5jGar1eZ8Bvi4XPvy0JoDefZQO9JBQkSUAw5MPfSa1EGPLSvwDTx3wNvjjum1Bv38zG/FOKvgIrKh6NvE+jaH45+OCp5+Ad9AWwiFlNt5qzwKi34DORWp4MKItC4SCKoRtFEQQTDkUDKIx7l9fxV2gXTQtgZ/2vWBdg1JsxlbwCHxrqLqirICHYYEn5fdgSVPHntIcmBVBn34IjgD+A29+OTljW51TwAwmhw9jldUBp/gKomrkOsmzF/BntoCkBUIa/tP8msF84BOmWgki/rgLIT6Du59LS1bC4/F5u1QaaEcDRlu2w/aMfgxGbXZPByq3qgbLR5XNADo4gVi3cAga9iT+jbjQhgAONf4fdx9ZhrR+NtV7dc1f+oBt9Eht8e+7zbDipdlQvgA3V34Wm9v2Qbh4dta8nZ8wb6MJH+DXwr8WUeVG6BsqmQMiD3r8Xcw3AoDNhS0RDzIGfiSaULnQ3wQ1z/gJTi67hVnWiagFswyb/Y2z6beZcbumLD8f9ejDA5ZPvRf/Az7zyfSf+BF6/kwkhWdCcgNvbDmWFy2BC3nwUQwgcXQ3wkf1lsBqzUQQDWyV6j9PVAjct2ABjcyq5VX2oVgB19s2wo/Z+bPZHYSpKLQv5IMtaArcs+De3/J9/Va+Cs876pPgKVJAeXwdUzVgH04q/yq0RHM7j8MJ7XwerKfpIhERJyy1rlrwDer06HNb+qLJDPX72DdhU8z3W50crfIKmdQfzuBeXr0WBeFmznShU2zOsYwYUPjEqswzKC6/Ea0XWFPqjR0cwDEF4ZNcsblEfqhOAF4dTO+p+BrnpE7klOpSx6ZZCnupLRDjJadhIABZjOk8NxGbKwysNHpxi0Jtx5GKFrR+u5RZ1oToBvF77IDpRXkXevkFv5I/6YtBFt8cLrSkMhh4/w3ANDQno6KdbofH8Pm5RD6oSQKNjH9TaN7Il1uEw6C2Yqdt5qi8Nrbvw3+RMDdOIosPdBH7scqJBn5lq+dDoIM2SD5trvs/T6kFVAthe+wBkp5Xw1NDQKt/+k09Bvf1Vbonwybm34O2Pf69IREro8fD/c+h2HF3QcJODtX5H7U/hgqcJRTL8pA8JKYB+Sc3pF7lFHahmFNDUtp9N82YpCMbogT66y98GRr2VPdZjjaeJmDRzXtShWSLQ+N8X7MLaTiMLWioO4GPTkP5Bf+gzdnla4L6qBm5JPappAWrPbMTxfg5PKYOa+HRzPrYGNiyINDYPQMPGZBc+QdHI5PDRtaj1sZmyYyp8gj6vDoeDrZ1HuCX1qEIAoVAQjmO/HVnHjx0q8J6fiwkrwM+uFZ9/YTFmwIHGZ3kq9ahCAM0dB9Dzp0mTxJ02tUMOo72jhqdSjyoE4HA2sP4xGV672tGBAbp9DnB5O7gltahCAHX2TWDGPlwESOTU2lFUsxpQhQD0bOJm5Nf+HtCTwK4guZNV8aIKAdDMH0ELLyP9D0FOJEUQqYGUzwN0ex3w29dKICdtPLeMfGglMy+jDG5fRDOWqUX1ASGSi4squgBJ6pACEBwpAMFJqg8QDPnZLBfN6xdmzYCi7FnsrtuhoIDOVz/4AVsuZUtsAkCBrBmWArhiyk+4ZTDC0Nx+CI7YX4VMayGU5M2Fktw5/LnkkDQBvHl0HRw69RyLfaPVOXYvXcgDWdYxcH3Fk1CQNZW/si90d8/D/52Go4BxmBJDAFRRcm0T4dbLNnHLQN498STsO/4YmziiiCKKTKLQM7oTakXFYzAOxZAMkiKADdW3olKrIc2cP2A6l5ZNO91n4JYFr6B6B0bHevwX4I+7ZqMAlMUBjARIADm2CXDT/H9yS1+2fXQf1J/ZBBnWogH5SRWLdke57kuPw7Tia7k1fhL2ATbV3MVv1aJl2IGzeTTjRWP8F9//BlxwNXGrZDB2H12PTf5WtklFtPykwJIc23jYfPjupCwrJySAtu5GaGh9HazGodfx6YtkYOuwo+7n3CKJhifQCTVNL7LKNBSUn5nYOmw5fA+3xE9CAqizvwImvS2qUvtDkTT2joPsvnpJdBpadmITH1KUnxSM2u46BZ0eO7fER0IC6PadY7HvSqHXOj0tPCXpj9PzKd/rYHh06LlRAA35V4mQkAAaHe+yUCklkKopro727ZFEp+HcmyysTRGYn5SntEVtIiQkgEg4tPJBBH1grdw2nQoiIXGxDMpwiKiwxRiMhAQg0T5SAIIjBSA4UgCCIwUgOFIAgiMFIDhSAIIjBSA4UgCCIwUgOFIAgiMFIDhSAIIjBSA4UgCCIwUgOFIAgiMFIDhSAIIjBSA4UgCCIwUgOFIAgiMFIDgJCSAcDvJHymA75cX4HpGge/9jJZ739CYhAdBtzHQ3qzLCQEevRM7zkUQjy1IQU4GyA60sRTwVHwkJYNKoJYpv96aNSIx6E4zPm88tkv5MKaxiZyEqoac1LStYyi3xkZAAMq3FqFja5n146GQt2t+G7muXRCfdWoAZFWKVZVjwNXRzbqJH4yQkgBljV2CtTmP7AA1Hl6cV5k28g6ck0aCNn/LSJ2F+RvZOHgqXvx0qxt+s+Pb8wUhIAASdlO32tbGNj6JBanbh85MLqvADr+RWyWCsnPsPdhx9IOTjloF4/J1QkDkdlpT/iFviJ2EB0CFPqxe9jgUdYhs/0yYQVOh01j8dtdblbYXJo6+E6ysf5++QDIXVlA13LX2fnX1IrSb5WCw/sb+nA7FoF5HinEq4Zf7L/B2JkdSNIg+degGa2w+ws/8KM2dCYfZ0WDjpLmzWBj8FVG4TNzj19s1w4txbcOTTrWxTqLG5c2Bu6W1QlD2TvyJxUr5buBRAakm4C5BoGykAwZECEBwpAMGRAhCclAuAzWmD0gWlkYNaVkVTLgDaHNFsyGCTHaJAhR85ICP1pFwAtDXq6KwpEAoPv54wUvAFXFBWsIynUosqfACaKlbLQYoXG9bS6QBK8xdyS2pRhQBmFF/HljZpPWGk4w+5WUwEraGoAVUIgDJj0eQfQofr9IgWAS2Uub3tsKJCPQtjKV8L6E1t80bY/fF6tgJGvgGdL0AHLfdHyYEKvYnnKybrGrSKR04fHRk/NmcO3FD5V0gz5/JnU4+qBEB40Rd478QTcK7rGNg7DkMAm8zeDZUeBWE2ZbCzcxSBX88f8qGo3DjcVEIkdtESwzUoC2mBxx90sUEt6+SZPQC5aROxwPNgwaQ7YUK++sLhVCeA3lDtoZ+eVoBO3Q6HAvD03uWsVlF6OHzBbqgoWQmLy9cOGrTSHzrT4IndC9nvV3INEldZwXKomvlQn2tQd5ZoxM7FRhU+wGBQDaQDEahA6IfSTm8rjhi68FllTbReZ4RW5zH2uOf3DPfjD7iZcJReQ4efi/wXovfvUXvhE6oWQDToqDSKnFXaRxt0JjjTXs1TyjjrrGciUHoNEpkDuyw6Fl5raE4AdA4h9dGxEDnaRjlUoLE6gRGHVXPZqcFPLEkqUgCCIwUgOFIAgiMFIDhSAIIjBSA4UgCCIwUgOFIAgqM9AXxea5eqXSNNLpoTQDAcYEvEsTDUvfbRoADVUIyh6rQMHOt71IDmBFCSdwnYzDlsrV0JgZAXJhcs5ylllOTOYffpK70GrQKW5F6S8Fn+qUBzAqA9cUIx1GjaxcxktPKUcii6Ryl0Y4seFEYoqQzNCYACLSimXmkBubwOuLzsHp5SzqWlq9lWLErw+J0wb9LtPKUttOcEIl+e9iC7uWI4X8DlbYPK8TdDmjn2u3AWs/13IrF+Q0EbXIzNqYSirFncoi00KQDqBlZfvgOc7ha2oRKFNfaENkYeh9j+OhPyL4OrZj7E7PGw5oo94A10otjcUa/R7T0P+enl8J15LzG7FlF1UOhwOL1nYdvhtdDUUQ0mPcXf6VirQFFDcyasiqvp7w91A1s+uBuaOw7ib8c/FJiK19DrTDCr5EZYOvUB/kptomkB9NDe3Qhtrk/g1Pn9MHv8Ssi2jcMCSm7jRi0KhaqfPv8eTBtzLdv4SgtBn8MxIgQgiR9N+gCS5CEFIDhSAIIjBSA4UgCCIwUgNAD/A/vTwgFSS3o1AAAAAElFTkSuQmCC'
        }
    )
    print('AccountList is %s ',AccountList)
##    "icon": "",
    Notification.append(
        {
            "deviceId": "9997",
            "app": "com.tencent.mm",
            "tickerText": "This is a new message from QQ",
            "title": "Title",
            "subText": "subText",
            "bigText": "bigText",
            "text": "This is a message",
            "subText": "",
            "key": "",
            "postTime": "",
            "cookie": "99971558943267.2937844",
            "status": 0,
            "msgId": "0"
        }
    )
    print('Notification is %s ', Notification)

    app.run(port=8080, debug=True)

