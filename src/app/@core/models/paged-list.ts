import { Pager } from './pager';

export class PagedList<T> {
    public pager: Pager;
    public pagedItems: [T];

    constructor(pager: Pager, pagedItems: [T]) {
        this.pager = pager;
        this.pagedItems = pagedItems;
    }
}
