import { Controller, Post, UseGuards, Request, Body, HttpCode } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard'
import { LoginDataDto } from './dto/login-data.dto'
import { AuthService } from './auth.service';
import { TokenDto } from './dto/token.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    @ApiOkResponse({description: 'Success',type: TokenDto})
    @ApiUnauthorizedResponse({description: 'Wrong user name or password'})
    @HttpCode(200)
    async login(
        @Request() req, 
        @Body() loginData: LoginDataDto
        ): Promise<TokenDto>{
        return this.authService.login(req.user);
    }
}
