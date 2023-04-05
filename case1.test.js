// Import global testing methods from Jest
const { beforeEach, describe, it, expect } = require('@jest/globals');

// Import a browser simulator. We can use JSDOM;
const { JSDOM } = require('jsdom');

// Import the uploadProfilePhoto function
import { uploadProfilePhoto } from './profile';

// Load the HTML file with the form
const html = `
  <html>
      <body>
        <form>
          <input type="file" name="photo"/>
        </form>
      </body>
    </html>
  `;

// Initialize a browser DOM with the html file
const { window } = new JSDOM(html);
global.window = window;
global.document = window.document;

// Define the test scenario
describe('User uploads Profile Photo', () => {
  let input;

  beforeEach(() => {
    // Get the file input element
    input = document.querySelector('input[name="photo"]');
  });

  // Define the test case
  it('User can upload a profile photo successfully', async () => {
    // Create a dummy user and photo file to use in the test
    const user = { id: 1, name: 'John Doe' };
    const photoFile = new File([''], 'photo.jpg', { type: 'image/jpeg' });

    // Call the function that handles profile photo uploading
    const result = await uploadProfilePhoto(user, photoFile);

    // Trigger the file input change event with the created files
    const event = new Event('change');
    Object.defineProperty(event, 'target', {
      value: { files: [photoFile] }
    });
    input.dispatchEvent(event);

    // Expect the file to be uploaded successfully
    expect(input.files[0]).toBe(photoFile);

    // Assert that the photo was uploaded successfully
    expect(result).toBe('Photo uploaded successfully');
  });
});