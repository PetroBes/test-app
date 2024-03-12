import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

export const hashPassword = async pass => {
  const salt = randomBytes(8).toString('hex');
  const hash = (await scrypt(pass, salt, 32)) as Buffer;
  return `${salt}.${hash.toString('hex')}`;
};

export const isPasswordValid = async pass => {
  const [salt, storedHash] = pass.split('.');
  const hash = (await scrypt(pass, salt, 32)) as Buffer;
  return storedHash !== hash.toString('hex');
}
