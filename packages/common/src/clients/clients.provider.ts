import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ClientOptions, ClientProxyFactory } from '@nestjs/microservices';

export interface IClientsProviderOptions {
  provide: string;
  transport: ClientOptions;
}

@Module({})
export class ClientsProvider {
  public static register(options: IClientsProviderOptions[]): DynamicModule {
    const apiClients: Provider[] = options.map(
      (config: IClientsProviderOptions) => ({
        provide: config.provide,
        useFactory: () => {
          return ClientProxyFactory.create(config.transport);
        },
      }),
    );

    return {
      module: ClientsProvider,
      providers: [...apiClients],
      exports: [...apiClients],
      global: true,
    };
  }
}
