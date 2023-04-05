// Import global testing methods from Jest
const { beforeEach, describe, it, expect } = require('@jest/globals');

// Import a browser simulator. We can use JSDOM;
const { JSDOM } = require('jsdom');

// Import the uploadProfilePhoto function
import { uploadProfilePhoto } from './profile';

// Load the HTML file with the form and the existing photo
const html = `
  <html>
      <body>
        <form>
          <input type="file" name="photo">
        </form>
        <img src="existing-photo.jpg" alt="Profile photo">
      </body>
    </html>
  `;

// Instantiate a browser DOM with the html file
const { window } = new JSDOM(html);
global.window = window;
global.document = window.document;

// Define the test scenario
describe('Profile photo update', () => {
  let input;
  let existingPhoto;

  beforeEach(() => {
    // Get the file input element and the existing photo element
    input = document.querySelector('input[name="photo"]');
    existingPhoto = document.querySelector('img');
  });

  // Define the test case
  it('should replace the existing profile photo with the new one', async () => {
    // Create a dummy user object with an image file
    const user = { id: 1, name: 'John Doe' };
    const file = new File([''], 'photo.jpg', { type: 'image/jpeg' });

    // call the function that handles profile photo uploading
    const result = await uploadProfilePhoto(user, file);

    // Trigger the file input change event with the created file
    const event = new Event('change');
    Object.defineProperty(event, 'target', { value: { files: [file] } });
    input.dispatchEvent(event);

    // Expect the existing photo source to be updated with the new file URL
    expect(existingPhoto.src).toContain(file.name);

    // Assert that the photo was uploaded successfully
    expect(result).toBe('Photo updated successfully');
  });
});