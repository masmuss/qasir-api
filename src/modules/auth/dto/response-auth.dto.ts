import { Exclude, Expose, Type } from 'class-transformer';

class UserRoleDto {
  @Exclude()
  id: number;

  @Expose()
  name: string;
}

export class AuthResponseDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Exclude()
  password: string;

  @Exclude()
  roleId: number;

  @Expose()
  @Type(() => UserRoleDto)
  role: UserRoleDto;

  @Expose()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Expose()
  access_token: string;

  @Expose()
  refresh_token: string;
}

class UserDto {
  @Expose()
  name: string;

  @Expose()
  username: string;

  @Expose()
  roleId: number;
}

export class AuthUserResponseDto {
  @Type(() => UserDto)
  @Expose()
  sub: UserDto;

  @Expose()
  id: string;

  @Exclude()
  iat: number;

  @Exclude()
  exp: number;
}
