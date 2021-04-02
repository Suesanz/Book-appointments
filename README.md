# Book appointments

### Ask for appointment from anyone by sending them mail and once they accept the invitation, you will get a notification and now you can generate a QR code which can be shown at the time of apoointment.


## Setup client side

1.    Clone the repo.
2.    Run ````npm install && cd ios && pod install````.
3.    Setup RNFirebase.
      - [Android](https://rnfirebase.io/#2-android-setup)
      - [iOS](https://rnfirebase.io/#3-ios-setup)
4.    Run ````npx react-native start````.

## Setup backend side

1.    Clone the repo.
2.    Run ````npm install````.
3.    Setup [Firebase functions](https://firebase.google.com/docs/functions/get-started).
4.    Run ````firebase emulators start:functions````.


## Presentation

### Screens


|               Splash Screen                                                                                           |            Registration Screen                                                                                              |
|-----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
|![splash-screen](https://user-images.githubusercontent.com/26189041/113390467-66e86c00-93af-11eb-8c08-bc211e71739b.gif)|![registration-screen](https://user-images.githubusercontent.com/26189041/113390597-b038bb80-93af-11eb-9d6e-749f05c26754.gif)|

|               Login Screen                                                                                            |            Profile Screen                                                                                               |
|-----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
|![login-screen](https://user-images.githubusercontent.com/26189041/113390606-b3cc4280-93af-11eb-98d8-8faf20cf9743.gif) |![profile-screen](https://user-images.githubusercontent.com/26189041/113390627-be86d780-93af-11eb-928f-1ff258c7edba.gif)     |

|               Book appointment success Screen                                                                          |               Book appointment success Screen                                                                               |
|------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
|![success-screen](https://user-images.githubusercontent.com/26189041/113390640-c3e42200-93af-11eb-8049-e8340385c4a2.gif)|![failed-screen](https://user-images.githubusercontent.com/26189041/113390652-c6df1280-93af-11eb-95ae-11a267055d7b.gif)      |

|               Appointment email to appointer                                                                           |               Check appointment Screen                                                                               |                          No appointment Screen                                                                             |
|------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
|![success-screen](https://user-images.githubusercontent.com/26189041/113390640-c3e42200-93af-11eb-8049-e8340385c4a2.gif)|![check-screen](https://user-images.githubusercontent.com/26189041/113390666-cd6d8a00-93af-11eb-9b11-5dfe476da13e.gif)|![check-empty-screen](https://user-images.githubusercontent.com/26189041/113390695-dc543c80-93af-11eb-9b42-c01447c880c4.gif)|

|               QR code Screen                                                                                      |               Contact me Screen                                                                                           |
|-------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
|![qr-screen](https://user-images.githubusercontent.com/26189041/113390704-e1b18700-93af-11eb-9042-cb92334b0cd9.gif)|![contact-me-screen](https://user-images.githubusercontent.com/26189041/113390727-e9712b80-93af-11eb-98e9-86b908671777.gif)|
