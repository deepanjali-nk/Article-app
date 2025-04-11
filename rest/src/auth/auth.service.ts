import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { PrismaService } from './../prisma/prisma.service';
  import { JwtService } from '@nestjs/jwt';
  import { AuthEntity } from './entity/auth.entity';
  import * as bcrypt from 'bcrypt';
  
  @Injectable()
  export class AuthService{
    constructor( private Prisma: PrismaService, private jwtService: JwtService) {}

    async login(email:string, password:string): Promise<AuthEntity>{
        //fetch users
        const user = await this.Prisma.user.findUnique({where: {email:email.toLowerCase()}});

        //check if user exists
        if(!user){
            throw new NotFoundException('User not found');
        }

        //check if password is correct
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword){
            throw new UnauthorizedException('Invalid password');
        }

        //generate JWT token
        return {
            accessToken: this.jwtService.sign({userId: user.id, name: user.name}),
        };
    }
  }
  