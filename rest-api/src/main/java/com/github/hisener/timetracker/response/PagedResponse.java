package com.github.hisener.timetracker.response;

import java.util.List;

public class PagedResponse<T> {

    private List<T> data;

    private Integer page;

    private Integer totalPages;

    public List<T> getData() {
        return data;
    }

    public PagedResponse<T> setData(List<T> data) {
        this.data = data;
        return this;
    }

    public Integer getPage() {
        return page;
    }

    public PagedResponse<T> setPage(Integer page) {
        this.page = page;
        return this;
    }

    public Integer getTotalPages() {
        return totalPages;
    }

    public PagedResponse<T> setTotalPages(Integer totalPages) {
        this.totalPages = totalPages;
        return this;
    }
}
