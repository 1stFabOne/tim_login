import sjcl from 'sjcl';

export function encryptPassword(password) {
    const saltBits = sjcl.random.randomWords(2, 0);
    const salt = sjcl.codec.base64.fromBits(saltBits);
    const passwort = sjcl.codec.base64.fromBits(sjcl.misc.pbkdf2(password, saltBits, 2000, 256));
    return `${passwort}$${salt}`;
}

export function verifyPassword(password, storedPasswordHash) {
    const [_key, _salt] = storedPasswordHash.split('$');
    const saltBits = sjcl.codec.base64.toBits(_salt);
    const derivedKey = sjcl.misc.pbkdf2(password, saltBits, 2000, 256);
    const derivedBaseKey = sjcl.codec.base64.fromBits(derivedKey);

    if (_key != derivedBaseKey) {
        return false;
    }

    return true;
}

export function sha256(data) {
    const hashBytes = sjcl.hash.sha256.hash(data);
    return sjcl.codec.hex.fromBits(hashBytes);
}
