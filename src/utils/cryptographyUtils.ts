import bcrypt from "bcrypt"

const encryptWithSalt = (password: string, salt = 10) => {
	return bcrypt.hashSync(password, salt)
}

const decryptAndcompare = (password: string, comparedPassword: string) => {
	return bcrypt.compareSync(password, comparedPassword)
}

export { encryptWithSalt, decryptAndcompare }
