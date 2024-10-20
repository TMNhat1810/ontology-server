import { Module } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../configs';
import { RoleGuard } from './guards/role.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConfig.secret,
    }),
  ],
  providers: [AuthGuard, RoleGuard],
  exports: [AuthGuard, RoleGuard],
})
export class SharedModule {}
