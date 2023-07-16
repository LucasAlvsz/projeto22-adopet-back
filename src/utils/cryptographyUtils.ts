import bcrypt from "bcrypt"

const hashWithSalt = (password: string, salt = 10) => {
	return bcrypt.hashSync(password, salt)
}

const compare = (password: string, comparedPassword: string) => {
	return bcrypt.compareSync(password, comparedPassword)
}

export default { hashWithSalt, compare }
