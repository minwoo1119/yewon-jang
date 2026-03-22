import { HealthController } from './health.controller';

describe('HealthController', () => {
  it('should return health status', () => {
    const controller = new HealthController();

    expect(controller.getHealth()).toEqual({
      ok: true,
      service: 'backend',
    });
  });
});
