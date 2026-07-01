package com.sdh.todo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CalendarTodoStatusDTO {

    private LocalDate todoDate;

    private long totalCount;

    private long doneCount;

    private String status;
}