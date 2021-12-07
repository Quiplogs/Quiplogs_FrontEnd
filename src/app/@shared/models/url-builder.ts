import { QueryStringParameters } from './query-string-parameters';

export class UrlBuilder {

  public url: string;
  public queryString: QueryStringParameters;

  constructor(
    public baseUrl: string,
    public action: string,
    queryString?: QueryStringParameters,
  ) {
    this.url = [baseUrl, action].join('/');
    this.queryString = queryString || new QueryStringParameters();
  }

  public toString(): string {
    const qs: string = this.queryString ?
                       this.queryString.toString() : '';

    return qs ? `${this.url}?${qs}` : this.url;
  }
}
