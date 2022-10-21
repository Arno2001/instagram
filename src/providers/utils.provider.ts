import * as bcrypt from 'bcrypt';

export class UtilsProvider {
  /**
   * generate hash from password or string
   * @param {string} password
   * @returns {string}
   */
  static async generateHash(password: string): Promise<string> {
    return bcrypt.hashSync(password, 10);
  }
  /**
   * validate text with hash
   * @param {string} password
   * @param {string} hash
   * @returns {Promise<boolean>}
   */
  static async validateHash(password: string, hash: string): Promise<boolean> {
    if (!password || !hash) {
      return Promise.resolve(false);
    }
    return bcrypt.compare(password, hash);
  }
}
