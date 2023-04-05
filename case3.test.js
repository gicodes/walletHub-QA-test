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

// Instantiate a browser DOM with the html file
const { window } = new JSDOM(html);
global.window = window;
global.document = window.document;

// Define the test scenario
describe('Profile photo upload within limit', () => {
  let input;

  beforeEach(() => {
    // Get the file input element and set the maximum file size limit
    input = document.querySelector('input[name="photo"]');
    // Set limit to 3 MB in bytes
    input.setAttribute('max-size', 3 * 1024 * 1024);
  });

  // Define the test case
  it('should allow file upload within the maximum size limit', async () => {
    // Create a dummy user and new file with a size of 1 MB
    const user = { id: 1, name: 'John Doe' };
    const file = new File([''], 'photo.jpg', { type: 'image/jpeg' });
    Object.defineProperty(file, 'size', { value: 1024 * 1024 }); // 1 MB in bytes

    // call the function that handles profile photo uploading
    const result = await uploadProfilePhoto(user, file)

    // Trigger the file input change event with the created file
    const event = new Event('change');
    Object.defineProperty(event, 'target', { value: { files: [file] } });
    input.dispatchEvent(event);

    // Expect the file to be uploaded successfully
    expect(input.files[0]).toBe(file);

    // Assert that an error message is returned
    expect(result).toBe('Image file is within size limit')
  });

  // Verify the test case fails with the wrong input

  it('should reject file upload exceeding the maximum size limit', async () => {
    // Create a file that exceeds the maximum size limit
    const file = new File([''], 'photo.jpg', { type: 'image/jpeg' });
    // 4 MB in bytes
    Object.defineProperty(file, 'size', { value: 4 * 1024 * 1024 });

    // call the function that handles profile photo uploading
    const result = await uploadProfilePhoto(user, file)

    // Trigger the file input change event with the created file
    const event = new Event('change');
    Object.defineProperty(event, 'target', { value: { files: [file] } });
    input.dispatchEvent(event);

    // Expect the file not to be uploaded due to exceeding the maximum size limit
    expect(input.files).toHaveLength(0);

    // Assert that an error message is returned
    expect(result).toBe('Please select a photo with maximum file size of 3 MB');
  });
});