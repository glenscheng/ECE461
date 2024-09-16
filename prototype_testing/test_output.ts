import * as fs from 'fs';

try {
  const data = fs.readFileSync('jest-output.txt', 'utf8');
  const lines = data.split('\n');
  // Check if there are at least 5 lines
  if (lines.length >= 5) {
    // Get the 5th line (index 4)
    const fifthLine = lines[4];
    
    // Split the line into words/values
    const values = fifthLine.split(/\s+/);
    
    // Check if there are at least 4 values
    if (values.length >= 4) {
      // Get the 4th value and convert it to an integer
      const fourthValue = parseInt(values[3], 10);
      
      if (!isNaN(fourthValue)) {
        console.log(`The 4th integer value on the 5th line is: ${fourthValue}`);
      } else {
        console.log('The 4th value on the 5th line is not a valid integer');
      }
    } else {
      console.log('The 5th line does not have 4 values');
    }
  } else {
    console.log('The file does not have 5 lines');
  }
} catch (error) {
  console.error('Error reading or parsing the Jest output file:', error);
}