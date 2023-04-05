# Manual Test 1

This documentation is a solution to WalletHub's *Manual Test 1*,

written by Gideon Iduma.

---

### Testing the profile photo upload process on WalletHub

#### Task:

Your task is to write scenerios in an excel spreadsheet to test the profile photo uploading process on the wallethub account provided below.

Sign in and go to the settings page https://wallethub.com/home/settings/ in order to do so. Create all the possible scenerios that would thoroughly test that the profile photo function is working correctly for a wide diversity of photos.

Be specific with the instructions you provide for your scenerio and provide as much detail as possible so that another tester would be able to follow your instructions without any questions.

As you go through the uploading process, you must confirm each time that the image becomes visible on the profile page, https://wallethub.com/profile/30202191/

Next to each testing scenerio, please record if it worked ok and if not what issue you observed.

#### Solution:

Test cases for uploading a profile photo can be gotten by evaluating the function and options available to a user in the process of uploading a profile photo. Like, what does the user do, what does the user expect and how does the function respond. These are what determines the cases to test.

Personally, I choose to simplify the task by categorizing; Function, Actions, Expect

- Function: `UploadProfilePhoto` takes user action as input and returns a success or fail message.
- Actions: user action may vary, but with `UploadProfilePhoto` function, we can determine the cases.
- Expect: relies on user action and the `UploadProfilePhoto` function. This is the result of our test cases.

To determine the various case scenerios to test, we must:

- Consider a 'case' By user actions (*Action)* and expected result (*Expected).*
- Require a testing library like Mocha or JEST. I choose JEST.
- Require key testing modules like describe, beforeEach, expect.
- Require in the key function and define test functions and variables.
- Test the user actions against the function and get the expected result.

---

### Instruction:

- Initialize node package manager (npm) to run and manage the dependencies for the tests.
  From your command line or terminal, run `npm init -y`
- Install JEST globally as it is a great testing library and a major dependency for the tests.
  From your command line or terminal, run `npm install jest --global`
- Install JSDOM for the simulation of the web browser environment used in the tests.
  From your command line or terminal, run `npm install jsdom`
- Import the `uploadProfilePhoto` function to run the various test scenarios.

Now you are ready to use JEST, manipulate the DOM and run the test scripts.

- From your command line or terminal, run `jest <test case>`

---

## TEST CASE 1: Verify that a user can upload a profile photo successfully

This is a general but regular case of users uploading a profile photo successfully.

Let's consider the key elements and components required for this test:

- A walletHub form with input field for uploading a profile photo
- A walletHub `uploadProfilePhoto` function from './profile'
- A web browser instance to simulate the test scenario

Let's discuss the user action and what to expect:

*Action*:
  User uploads a profile photo.

*Expected*:
  Photo is successfully uploaded and displayed on the user's profile.

### Test Code 1

<script>
// To see the source code for Test 1, Visit case1.test.js

</script>

### Recorded

This test case uses JSDOM to simulate the DOM environment.

In this test case, we used a testing library (Jest) to create a test scenario called 'User uploads profile photo'

Within that scenario, we get the file input element,
then create a dummy user object and a dummy photo file object in JPEG image,
call the uploadProfilePhoto function with these dummy objects as arguments
dispatch a change event on the file input element with the created file,  assert that the uploaded file matches the expected file.
Finally, we use the expect function to assert that the result of the uploadProfilePhoto function call is the string 'Photo uploaded successfully'.

This verifies that the photo was uploaded successfully.

---

## TEST CASE 2: Verify that a user can only upload a valid image file type

This can be a regular case of users uploading an invalid profile photo file.

Let's consider the key elements and components required for this test:

- A walletHub form with input field for uploading a profile photo
- A walletHub `uploadProfilePhoto` function from './profile'
- A web browser instance to simulate the test scenario

Let's discuss the user action and what to expect:

*Action*:
  User tries to upload a file that is not an image (e.g. a PDF file).

*Expected*:
  User is prompted to select a valid image file type (e.g. JPEG, PNG).

### Test Code 2

<script>

// To see the source code for Test 2, Visit case2.test.js

</script>

### Recorded

This test case uses JSDOM to simulate the DOM environment.

In this test case, we used a testing library (Jest) to create a test scenario called 'Valid photo upload'

Within that scenario, we get the file input element
create a dummy user object with an invalid file type to use in the test,
call the uploadProfilePhoto function with these dummy objects as arguments,
dispatch a change event on the file input element with the created file,
assert that the uploaded file matches the expected file.
Finally, we use the expect function to assert that the result of the uploadProfilePhoto function call is the string 'Please select a valid image file type e.g JPG, PNG'.

This verifies that the function is properly validating file types and returning an error message if the file type is invalid.

---

## TEST CASE 3: Verify that a user can only upload a profile photo that is within the specified file size limit

This can be a random case where a user tries to upload a photo that is larger than the maximum allowed file size.

Let's consider the key elements and components required for this test.

- A walletHub form with input field for uploading a profile photo
- A walletHub `uploadProfilePhoto` function from './profile'
- A web browser instance to simulate the test scenario

Let's discuss the user action and what to expect:

*Input (Action)*:
  User tries to upload a photo that is larger than the maximum allowed file size.

*Output (Expected)*:
  User is prompted to select a photo that is within the specified file size limit.

### Test Code 3

<script>

// To see the source code for Test 3, Visit case3.test.js

</script>

### Recorded

This test case uses JSDOM to simulate the DOM environment.

In this test case, we used a testing library (Jest) to create a test scenario called 'Profile Photo Upload within limit'.

Within that scenario, we get the file input element and set file size limit'.

We go ahead to test two scenarios: uploading a file within the limit and uploading a file exceeding the limit.

We create files with the desired sizes using the File API,
dispatch a change event on the file input element with the created file,
assert that the uploaded file matches the expected file,
or that the file was rejected. If so, it asserts that an error message "Please select a photo with maximum file size of 3 MB" was returned.

This verifies that the function is properly validating the file sizes and returning an error message if the file size is beyond limit.

---

## TEST CASE 4: Verify that a user can update/ replace their profile photo

This can be a rare case where a user tries to replace a photo with a new image.

Let's consider the key elements and components required for this test.

- A walletHub form with input field for uploading a profile photo
- A walletHub `uploadProfilePhoto` function from './profile'
- A web browser instance to simulate the test scenario
- An existing profile photo file to be replaced
- A return URL value that will be asserted

Let's discuss the scenario, user input and what to expect:

*Action*:
  User uploads a new profile photo.

*Expected*:
  New photo is successfully uploaded and displayed on the user's profile, replacing the previous photo.

### Test Code 4

<script>

// To see the source code for Test 4, Visit case4.test.js

</script>

### Recorded

This test case uses JSDOM to simulate the DOM environment.

In this test case, we used a testing library (Jest) to create a test scenario called 'Profile photo Update'

Within this scenario, we get the file input element and the existing photo element,
create a dummy user object and file with a JPEG image,
call the object and file with the UploadProfilePhoto function,
dispatch a change event on the file input element with the created file,
assert that asserts that the existing photo source has been updated with the new file URL.
and finally assert that the result or message is 'Photo updated successfully'.

Note:

This test case assumes that the server returns the URL of the uploaded photo that can be used to update the photo source.

This verifies that the function is properly updating and replacing the current profile photo, and passes a message if it is successful.

---

## OBSERVATION

In order to create as many possible scenerios, I tried the process of uploading a profile picture from
https://wallethub.com/home/settings/ using the credentials provided.

What I observed is that with .png and .jpg (major image file extentions), a user is unable to successfully update profile photo, any other test scenerio does not really matter, considering the need to validate this process.

My test case scenerios presumes the `uploadProfilePhoto` function simply works as suggested in Manual 1.
My test (case2.test.js) considers valid photo files as '.png' and '.jpg' as it suits a *wide diversity* of photos.
My test case has a *Recorded* section that explains the process and results of each test case scenario.

## Conclusion

By testing all possible scenerios and their corresponding expected results, we can ensure that the `uploadProfilePhoto` function works correctly and produces the desired results for the various cases.

### More Test Cases:

- Test and debug the `uploadProfilePhoto` function
- Verify that a user can delete a Profile Photo
- Test device responsiveness
- Test cross-compatibility
- Test file upload security

These can be regular, random or rare cases, however, they are not part of the scope of this test.

# Written & Documented by Gideon, I.
