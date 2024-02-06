import bcrypt from 'bcryptjs'
const saltRounds = 10

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(saltRounds)
  const hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}

export const compare = async (password: string, hashedPassword: string) => {
  const result = await bcrypt.compare(password, hashedPassword)
  return result
}
