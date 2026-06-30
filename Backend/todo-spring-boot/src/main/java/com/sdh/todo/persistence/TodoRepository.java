package com.sdh.todo.persistence;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.sdh.todo.model.TodoEntity;

@Repository
public interface TodoRepository extends JpaRepository<TodoEntity, String> {
	List<TodoEntity> findByUserId(String userId);

    List<TodoEntity> findByUserIdAndTodoDate(String userId, LocalDate todoDate);

    List<TodoEntity> findByUserIdAndTodoDateBetween(
            String userId,
            LocalDate startDate,
            LocalDate endDate
    );

}
