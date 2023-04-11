import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;
  const user: User = {
    id: 1,
    name: 'Test User',
    email: 'email@email',
    password: 'password',
    oauth_provider: null,
    oauth_id: null,
    created_at: new Date(),
    updated_at: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findOne', () => {
    it('should return a user when given a valid email', async () => {
      const findUniqueSpy = jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValueOnce(user);

      const email = 'test@example.com';
      const result = await service.findOne(email);

      expect(findUniqueSpy).toHaveBeenCalledWith({ where: { email } });
      expect(result).toEqual(user);
    });

    it('should return undefined when given an invalid email', async () => {
      const findUniqueSpy = jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValueOnce(null);

      const email = 'nonexistent@example.com';
      const result = await service.findOne(email);

      expect(findUniqueSpy).toHaveBeenCalledWith({ where: { email } });
      expect(result).toBeUndefined();
    });
  });
});
