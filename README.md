# Student Registration

A three-screen React Native (Expo) app: a student registration form, a summary of
the submitted details, and a welcome/profile screen. Navigation is handled by
React Navigation's native stack.

## Requirements

- Node.js 20 or newer
- Expo Go on your phone, or an Android/iOS emulator

## Running

```bash
npm install
npm start
```

Then scan the QR code with Expo Go, or press `a` for Android, `i` for iOS,
`w` for the browser.

## Project structure

| File | Purpose |
| --- | --- |
| `index.js` | Entry point; registers `App` as the root component |
| `App.js` | Navigation container and the three-screen stack |
| `AppHeader.js` | The violet title bar with the back arrow, used by all screens |
| `StudentRegistrationForm.js` | Screen 1: the form, its state and validation |
| `SummaryScreen.js` | Screen 2: shows the details passed from the form |
| `ProfileScreen.js` | Screen 3: welcome/profile page |
| `app.json` | Expo config: name, orientation, platform settings |

## Navigation

```
Registration --REGISTER--> Summary --VIEW PROFILE--> Profile
```

- Summary has `BACK TO REGISTRATION`, Profile has `VIEW REGISTRATION`
  (back to Summary) and `BACK TO REGISTRATION`.
- The back arrow in `AppHeader` and the Android hardware back button also work
  on every screen.
- The stack's own header is turned off (`headerShown: false`) so the app keeps
  one phone-width column on every platform, including the browser.

## Passing data between screens

`handleRegister` in `StudentRegistrationForm.js` calls
`navigation.navigate('Summary', { ... })` with the full name, email, age,
course, student ID, phone number, gender, and notification preference.
`SummaryScreen` reads them from `route.params`, so nothing is hard-coded there.
Passwords are deliberately not passed between screens.

## Form fields

Full name, email, password, confirm password, age, course, student ID, phone
number, gender, notification preference, and terms agreement. Fields are
validated when REGISTER is pressed; errors appear under each field, and the
form only navigates once everything is valid and the terms are accepted.

## License

MIT — see [LICENSE](LICENSE).
