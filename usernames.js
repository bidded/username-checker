const axios = require('axios');

// Function to generate all possible 2-3 letter combinations
function generateUsernames() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const usernames = [];
    for (let i = 0; i < alphabet.length; i++) {
        usernames.push(alphabet[i]);
        for (let j = 0; j < alphabet.length; j++) {
            usernames.push(alphabet[i] + alphabet[j]);
            for (let k = 0; k < alphabet.length; k++) {
                usernames.push(alphabet[i] + alphabet[j] + alphabet[k]);
            }
        }
    }
    return usernames;
}

// Function to check the availability of a username
async function checkUsernameAvailability(username) {
    try {
        const response = await axios.head(`https://twitter.com/${username}`);
        return response.status === 404; // 404 means username is available
    } catch (error) {
        return false; // Error occurred, username might not be available
    }
}

// Main function to check availability of all usernames
async function checkAllUsernames() {
    const usernames = generateUsernames();
    for (let i = 0; i < usernames.length; i++) {
        const available = await checkUsernameAvailability(usernames[i]);
        console.log(`${usernames[i]}: ${available ? 'Available' : 'Not Available'}`);
    }
}

// Call the main function
checkAllUsernames();