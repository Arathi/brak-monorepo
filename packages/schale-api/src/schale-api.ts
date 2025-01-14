import { Server, toServerIndex } from "./domains/server";
import { Language } from "./domains/language";
import { Numbered, Released, DataMap } from "./domains/response";

export interface Proxy {
  protocol: "http" | "https";
  host: string;
  port: number;
}

export interface SchaleApiOptions {
  baseURL?: string;
  language?: Language;
  server?: Server;
  proxy?: Proxy;
}

export interface GetDataOptions {
  language?: Language;
  server?: Server;
}

const DEFAULT_BASE_URL = "https://schaledb.com";
const DEFAULT_LANGUAGE = Language.Japanese;
const DEFAULT_SERVER = Server.Japan;

export class SchaleApi {
  baseURL: string;
  language: Language;
  server: Server;
  proxy?: Proxy;

  constructor({
    baseURL = DEFAULT_BASE_URL,
    language = DEFAULT_LANGUAGE,
    server = DEFAULT_SERVER,
    proxy,
  }: SchaleApiOptions = {}) {
    console.debug("正在初始化SchaleApi：", {
      baseURL,
      language,
      server,
      proxy,
    });

    this.baseURL = baseURL;
    this.language = language;
    this.server = server;
    this.proxy = proxy;
  }

  async get<T>(url: string, proxy?: Proxy): Promise<T> {
    const resp = await fetch(url, {
      method: "GET",
    });
    const body = await resp.json();
    return body as T;
  }

  private getDataPath(name: string, options: GetDataOptions = {}) {
    const language = options.language ?? this.language;
    const server = options.server ?? this.server;
    switch (name) {
      case "students":
      case "items":
        return `/data/${language}/${name}.json`;
    }
    return "";
  }

  private filter<D extends Numbered = Numbered>(
    input: DataMap<D>,
    condition: (data: D) => boolean
  ): DataMap<D> {
    const output: DataMap<D> = {};
    for (const key in input) {
      const id = Number.parseInt(key);
      const data = input[id];
      if (condition(data)) {
        output[id] = data;
      }
    }
    return output;
  }

  async getData<D>(name: string, options: GetDataOptions = {}) {
    const dataPath = this.getDataPath(name, options);
    const url = `${this.baseURL}/${dataPath}`;
    return this.get<D>(url, this.proxy);
  }

  async getStudents<D extends Released = Released>(
    options: GetDataOptions = {}
  ): Promise<DataMap<D>> {
    const data = await this.getData<DataMap<D>>("students", options);
    const server = options.server ?? this.server;
    const serverIndex = toServerIndex(server);
    return this.filter<D>(data, (s) => s.IsReleased[serverIndex]);
  }

  async getStudent<D extends Released = Released>(
    id: number,
    options: GetDataOptions = {}
  ): Promise<D | null> {
    const students = await this.getStudents<D>(options);
    return students[id] ?? null;
  }

  async getItems<D extends Released = Released>(
    options: GetDataOptions = {}
  ): Promise<DataMap<D>> {
    const data = await this.getData<DataMap<D>>("items", options);
    const server = options.server ?? this.server;
    const serverIndex = toServerIndex(server);
    return this.filter<D>(data, (i) => i.IsReleased[serverIndex]);
  }

  async getItem<D extends Released = Released>(
    id: number,
    options: GetDataOptions = {}
  ): Promise<D | null> {
    const items = await this.getItems<D>(options);
    return items[id] ?? null;
  }
}
