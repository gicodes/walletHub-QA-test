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
describe('Valid photo upload', () => {
  let input;

  beforeEach(() => {
    // Get the file input element
    input = document.querySelector('input[name="photo"]');
  });

  // Define the test case
  it('User can only upload a valid image file type', async () => {
    // create a dummy user and file to use in the test
    const user = { id: 1, name: 'John Doe' };
    const invalidFileType = new File(['photo data'], 'document.pdf', { type: 'application/pdf' });

    // call the function that handles profile photo uploading with an invalid file type
    const result = await uploadProfilePhoto(user, invalidFileType);

    // Trigger the file input change event with the invalid file
    const event = new Event('change');
    Object.defineProperty(event, 'target', {
      value: { files: [invalidFileType] }
    });
    input.dispatchEvent(event);

    // Expect the file NOT to upload due to invalid file type
    expect(input.files).toHaveLength(0);

    // Assert that an error message is returned
    expect(result).toBe('Please select a valid image file type e.g JPG, PNG');
  });
});
