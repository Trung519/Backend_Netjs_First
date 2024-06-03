import { plainToInstance } from "class-transformer";
import { IsEnum, IsNumber, IsString, validateSync } from "class-validator";

enum Environment {
    Development = "development",
    Production = "production",
    Test = "test",
    Provision = "provision",
}

class EnviromentVariables {
    @IsEnum(Environment)
    NODE_ENV: Environment;
    @IsNumber()
    PORT: number;
    @IsString()
    DB_HOST: string;
    @IsString()
    USERNAME: string;
    @IsString()
    PASSWORD: string;
    @IsString()
    DB_NAME: string;
    @IsString()
    SECRET: string; 
}
export function validate(config: Record<string, unknown>) {
    const validateConfig = plainToInstance(EnviromentVariables, config,{
        enableImplicitConversion : true
    });
    const errorConfig = validateSync(validateConfig, {
        skipMissingProperties: false
    }) 
    if (errorConfig.length>0) throw (errorConfig.toString());
    return validateConfig;
}