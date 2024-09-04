import {
  GameServiceDefinition,
  PlatformServiceDefinition,
  EmulatorServiceDefinition,
  MetadataServiceDefinition,
  LibraryServiceDefinition,
  ClientServiceDefinition,
  JobServiceDefinition,
  ServerServiceDefinition,
} from "@/generated/retrom/services";
import { createClient, createChannel } from "nice-grpc-web";

export class RetromClient {
  readonly host: string;
  readonly gameClient;
  readonly platformClient;
  readonly emulatorClient;
  readonly metadataClient;
  readonly libraryClient;
  readonly clientsClient;
  readonly serverClient;
  readonly jobClient;

  constructor(host: string) {
    this.host = host;
    this.gameClient = createClient(GameServiceDefinition, createChannel(host));

    this.platformClient = createClient(
      PlatformServiceDefinition,
      createChannel(host),
    );

    this.emulatorClient = createClient(
      EmulatorServiceDefinition,
      createChannel(host),
    );

    this.metadataClient = createClient(
      MetadataServiceDefinition,
      createChannel(host),
    );

    this.libraryClient = createClient(
      LibraryServiceDefinition,
      createChannel(host),
    );

    this.clientsClient = createClient(
      ClientServiceDefinition,
      createChannel(host),
    );

    this.serverClient = createClient(
      ServerServiceDefinition,
      createChannel(host),
    );

    this.jobClient = createClient(JobServiceDefinition, createChannel(host));
  }
}