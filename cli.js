const axios = require('axios');
const readlineSync = require('readline-sync');

const BASE_URL = 'http://localhost:5000/api/auth';

async function signup() {
  const username = readlineSync.question('Enter username: ');
  const email = readlineSync.questionEMail('Enter email: ');
  const password = readlineSync.question('Enter password: ', { hideEchoBack: true });

  try {
    const response = await axios.post(`${BASE_URL}/signup`, { username, email, password });
    console.log('Signup successful:', response.data.message);
  } catch (error) {
    console.error('Signup failed:', error.response?.data?.message || error.message);
  }
}

async function login() {
  const email = readlineSync.questionEMail('Enter email: ');
  const password = readlineSync.question('Enter password: ', { hideEchoBack: true });

  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
    console.log('Login successful! Token:', response.data.token);
  } catch (error) {
    console.error('Login failed:', error.response?.data?.message || error.message);
  }
}

async function main() {
  console.log('1. Signup');
  console.log('2. Login');
  const choice = readlineSync.question('Choose an option (1/2): ');

  if (choice === '1') {
    await signup();
  } else if (choice === '2') {
    await login();
  } else {
    console.log('Invalid choice');
  }
}

main();
