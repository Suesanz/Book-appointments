# Book appointments

### Ask for appointment from anyone by sending them mail and once they accept the invitation, you will get a notification and now you can generate a QR code which can be shown at the time of appointment.


## Setup client side

1.    Clone the repo.
2.    Run ````npm install && cd ios && pod install````.
3.    Setup RNFirebase.
      - [Android](https://rnfirebase.io/#2-android-setup)
      - [iOS](https://rnfirebase.io/#3-ios-setup)
4.    Run ````npx react-native start````.

## Setup backend side

1.    Clone the repo.
2.    In firebase directory, run ````npm install````.
3.    Setup [Firebase functions](https://firebase.google.com/docs/functions/get-started).
4.    Run ````firebase emulators start:functions````.


## Presentation

#### Note: The animations in below gifs might seems stuttery because gifs are converted to lesser fps to reduce their size and reduce loading time. Please wait for gifs to load.

### Screens


|               Splash Screen                                                                                           |            Registration Screen                                                                                              |
|-----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
|![splash-screen](https://user-images.githubusercontent.com/26189041/113442900-882c7500-940e-11eb-9783-e6534096c68d.gif)|![registration-screen](https://user-images.githubusercontent.com/26189041/113440181-8613e780-9409-11eb-8a05-85c9696afd9c.gif)|

|               Login Screen                                                                                            |            Profile Screen                                                                                              |
|-----------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|
|![login-screen](https://user-images.githubusercontent.com/26189041/113440164-7dbbac80-9409-11eb-8609-d8eda89c6b91.gif) |![profile-screen](https://user-images.githubusercontent.com/26189041/113440168-7e544300-9409-11eb-8345-d23b5cbf15f3.gif)|

|               Book appointment success Screen                                                                         |               Book appointment failed Screen                                                                             |
|-----------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
![success-screen](https://user-images.githubusercontent.com/26189041/113440131-71375400-9409-11eb-8758-330f82d9c5e3.gif)|![book-failed-screen](https://user-images.githubusercontent.com/26189041/113440119-6c72a000-9409-11eb-8462-5fa2ea408eca.gif)|

|               Appointment email to appointer                                                                  |
|---------------------------------------------------------------------------------------------------------------|
|![email](https://user-images.githubusercontent.com/26189041/113440537-3eda2680-940a-11eb-805b-821177517f02.png)|

|               Check appointment Screen                                                                               |                          No appointment Screen                                                                             |
|----------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
|![check-screen](https://user-images.githubusercontent.com/26189041/113440145-75fc0800-9409-11eb-8273-df147aaffdc7.gif)|![check-empty-screen](https://user-images.githubusercontent.com/26189041/113440141-75637180-9409-11eb-9fe9-910efeee4b9a.gif)|

|               QR code Screen                                                                                      |               Contact me Screen                                                                                           |
|-------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
|![qr-screen](https://user-images.githubusercontent.com/26189041/113440486-279b3900-940a-11eb-9ee7-203132876203.gif)|![contact-me-screen](https://user-images.githubusercontent.com/26189041/113440161-7bf1e900-9409-11eb-8b71-70293da06bd5.gif)|

