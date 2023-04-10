import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

describe('AppController', () => {
  let appController: AppController;
  const defaultMock = [
    {
      id: 1,
      name: 'Afonso Fernando',
      email: 'fernando.analista.si@gmail.com',
      password: '$2a$10$5Z.RyoYiJWwo4a95HCexNePqeJk/GFZEHhBJvwrItrqlvz0FH4Rke',
      oauth_provider: null,
      oauth_id: null,
      created_at: '2023-04-09T16:58:59.529Z',
      updated_at: '2023-04-09T16:58:59.529Z',
    },
  ];
  const mockPrismaService = {
    user: {
      findMany: () =>
        new Promise((resolve, reject) => {
          resolve(defaultMock);
        }),
    },
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      const result = await appController.getHello();
      expect(result).toBe(defaultMock);
    });
  });
});
