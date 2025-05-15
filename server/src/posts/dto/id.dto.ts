import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class IdDto {
    @IsNotEmpty()
    @IsUUID()
    @IsString()
    userId: string
}