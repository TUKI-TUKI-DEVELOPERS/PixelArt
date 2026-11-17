import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from './infrastructure/persistence/entities/user.orm-entity';
import { TypeOrmUserRepository } from './infrastructure/persistence/repositories/typeorm-user.repository';
import { USER_REPOSITORY } from './domain/ports/user-repository.port';
import { FindUserByEmailUseCase } from './application/use-cases/find-user-by-email.use-case';
import { FindUserByIdUseCase } from './application/use-cases/find-user-by-id.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  providers: [
    FindUserByEmailUseCase,
    FindUserByIdUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: TypeOrmUserRepository,
    },
  ],
  exports: [FindUserByEmailUseCase, FindUserByIdUseCase, USER_REPOSITORY],
})
export class UsersModule {}