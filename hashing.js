const bcrypt = require('bcrypt');
const crypto = require('crypto');

// 1. Hashing with bcrypt
async function hashWithBcrypt(password) {
    const saltRounds = 10; // More rounds = more secure, but slower
    const hash = await bcrypt.hash(password, saltRounds);
    console.log("bcrypt hashed password:", hash);

    return hash;
}

// 2. Comparing bcrypt hash with plain password
async function compareWithBcrypt(password, hash) {
    const match = await bcrypt.compare(password, hash);
    console.log("bcrypt comparison result:", match); // true if match, false if not
}

// 3. Hashing with crypto (SHA-256)
function hashWithSHA256(password) {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    const hashedPassword = hash.digest('hex');
    console.log("SHA-256 hashed password:", hashedPassword);

    return hashedPassword;
}

// 4. Hashing with crypto (MD5) - Example of a weaker algorithm
function hashWithMD5(password) {
    const hash = crypto.createHash('md5');
    hash.update(password);
    const hashedPassword = hash.digest('hex');
    console.log("MD5 hashed password:", hashedPassword);

    return hashedPassword;
}

// Example usage
async function run() {
    const password = "kucingimut";

    // bcrypt hashing
    // const bcryptHash = await hashWithBcrypt(password);

    // bcrypt comparison
    await compareWithBcrypt(password, "$2b$10$IPZ1QwQ1UiXkVu9kZCGO0Oa/OwhdY9hM0tc3E48OoIaS2bf9WCY5G");

    // SHA-256 hashing (useful for general hashing)
    const sha256Hash = hashWithSHA256(password);

    // MD5 hashing (for demonstration, not recommended for security purposes)
    const md5Hash = hashWithMD5(password);
}

run();
