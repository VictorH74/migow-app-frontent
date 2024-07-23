export interface ResponsePageInterface<T> {
    totalPages: number,
    pageable: ResponsePageInterface.PageableType,
    first: number,
    last: number,
    size: number,
    content: T[],
    number: number,
    sort: ResponsePageInterface.SortType,
    numberOfElements: number,
    empty: boolean,
}

export namespace ResponsePageInterface {
    export type SortType = {
        sorted: boolean
        empty: boolean
        unsorted: boolean
    }

    export type PageableType = {
        pageNumber: number,
        pageSize: number,
        sort: SortType,
        offset: number,
        paged: boolean,
        unpaged: boolean,
    }

    export type PaginationType = {
        pageNumber?: number,
        pageSize?: number,
        startDate?: string,
        endDate?: string
    }
}