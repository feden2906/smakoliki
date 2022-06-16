import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../entities/user.entity';
import { VerifyCode } from '../../../entities/verify-code.entity';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';
import { MailSender } from '../mail-sender';
import { PasswordHasher } from '../password-hasher';

/**
 * WIP - unit test examples
 */
const mockRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  softDelete: jest.fn(),
  remove: jest.fn(),
  create: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
type MockProvider<T = any> = Partial<Record<keyof T, jest.Mock>>;

function createMockProvider<T extends { prototype: any }>(
  target: T,
): { provide: T; useValue: MockProvider<T> } {
  const provider: any = {};
  for (const key of Reflect.ownKeys(target.prototype)) {
    provider[key] = jest.fn();
  }
  return {
    provide: target,
    useValue: provider,
  };
}

describe('AuthService', () => {
  let authService: AuthService;
  let userService: MockProvider<UserService>;
  let verfiyCodeRepository: MockRepository<VerifyCode>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(VerifyCode),
          useValue: mockRepository(),
        },
        createMockProvider(UserService),
        createMockProvider(JwtService),
        createMockProvider(PasswordHasher),
        createMockProvider(MailSender),
      ],
    }).compile();

    authService = moduleRef.get(AuthService);
    userService = moduleRef.get(UserService);
    verfiyCodeRepository = moduleRef.get(getRepositoryToken(VerifyCode));
  });

  describe('sendEmail', () => {
    it('return isUserExist to true, when userService return any user', async () => {
      userService.findOneByEmail.mockResolvedValue({});
      await expect(authService.sendEmail({ email: '' })).resolves.toEqual({
        isUserExist: true,
      });
    });

    it('verifyCodeRepository is called when there already verifyCode for the email exist.', async () => {
      userService.findOneByEmail.mockResolvedValue(null);
      verfiyCodeRepository.findOne.mockResolvedValueOnce({ code: '012345' });
      verfiyCodeRepository.create.mockResolvedValueOnce({ code: '012345' });
      await authService.sendEmail({ email: '' });
      expect(verfiyCodeRepository.remove).toBeCalledWith({ code: '012345' });
    });
  });
});
