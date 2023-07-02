import { scrypt, randomBytes } from "crypto"
import { promisify } from "util"

const scryptAsync = promisify(scrypt)
class PasswordHashing {

    static async toHash(password: string): Promise<string> {
        const salt = randomBytes(8).toString('hex')
        const buff = await scryptAsync(password, salt, 64) as Buffer

        return `${buff.toString('hex')}.${salt}`
    }

    static async toUnHash(storedPassword: string, suppliedPassword: string): Promise<boolean> {
        const [hashed, salt] = storedPassword.split('.')
        const buff = await scryptAsync(suppliedPassword, salt, 64) as Buffer

        return hashed === buff.toString('hex')
    }
}

export default PasswordHashing