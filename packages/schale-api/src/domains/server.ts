export enum Server {
  Japan = "jp",
  Global = "global",
  China = "cn",
}

export type ServerIndex = 0 | 1 | 2;

export const Servers = [Server.Japan, Server.Global, Server.China];

export function toServerIndex(server: Server): ServerIndex {
  let index = Servers.findIndex((s) => s === server);
  if (index >= 0 && index < Servers.length) {
    return index as ServerIndex;
  }
  return 0;
}
