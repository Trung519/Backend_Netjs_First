import { IsNotEmpty, IsString } from "class-validator";

export class ValidateToken {
    @IsNotEmpty()
    @IsString()
    token: string;
}