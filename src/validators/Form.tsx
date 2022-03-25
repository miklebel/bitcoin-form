import { IsEmail, IsString, IsNotEmpty } from 'class-validator'

export class Form {
  @IsString()
  @IsNotEmpty({ message: 'First name field can not be empty.' })
  firstName: string

  @IsString()
  @IsNotEmpty({ message: 'Last name field can not be empty.' })
  lastName: string

  @IsString()
  @IsNotEmpty({ message: 'Phone field can not be empty.' })
  phone: string

  @IsEmail(undefined, { message: 'Email must be valid.' })
  @IsNotEmpty({ message: 'Email field can not be empty.' })
  email: string
}
