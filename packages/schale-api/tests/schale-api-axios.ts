import axios, { AxiosProxyConfig } from "axios";
import { SchaleApi, SchaleApiOptions, Proxy } from "../src/schale-api";

export class SchaleApiAxios extends SchaleApi {
  constructor(options: SchaleApiOptions) {
    super(options);
  }

  async get<T>(url: string, commonProxy?: Proxy): Promise<T> {
    let proxy: AxiosProxyConfig | false = false;
    if (commonProxy !== undefined) {
      const { protocol, host, port } = commonProxy;
      proxy = {
        protocol,
        host,
        port,
      };
    }
    const resp = await axios.get<T>(url, {
      proxy,
    });
    return resp.data;
  }
}
