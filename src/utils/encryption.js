import CryptoJS from "crypto-js";

const AES_SECRET = process.env.AES_SECRET;

let key = CryptoJS.enc.Utf8.parse('4352678453967926');
let iv = CryptoJS.enc.Utf8.parse('4352678453967926');

export const encryptUsingAES256 = (data) => {
  var encrypted = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(data),
    key,
    {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return encrypted.toString();
}



export const decryptUsingAES256 = (decString) => {
  const keys = crypto.getRandomValues(new Uint8Array(16));
  const secureKey = Array.from(keys, (byte) => ('00' + byte.toString(16)).slice(-2)).join('');

  var decrypted = CryptoJS.AES.decrypt(decString, key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8)

}


