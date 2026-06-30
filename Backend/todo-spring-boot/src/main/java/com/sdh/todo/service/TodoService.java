package com.sdh.todo.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;
import com.sdh.todo.model.TodoEntity;
import com.sdh.todo.persistence.TodoRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class TodoService {

	@Autowired
	private TodoRepository repository;
	
	public List<TodoEntity> testService() {
		TodoEntity entity = TodoEntity.builder()
                .title("My first todo item")
                .userId("test-user")
                .todoDate(LocalDate.of(2026, 6, 30))
                .done(false)
                .build();
		
		repository.save(entity);
		
		TodoEntity savedEntity = repository.findById(entity.getId()).get();
        List<TodoEntity> savedEntities = repository.findByUserIdAndTodoDate(entity.getUserId(), entity.getTodoDate());
		
		return savedEntities;
	}
	
	public List<TodoEntity> create(final TodoEntity entity) {
		validate(entity);
		
		repository.save(entity);
		
		log.info("Entity Id : {} is saved", entity.getId());
		
		return repository.findByUserIdAndTodoDate(entity.getUserId(), entity.getTodoDate());
	}
	
	private void validate(final TodoEntity entity) {
		if(entity == null) {
			log.warn("Entity cannot be null.");
			throw new RuntimeException("Entity cannot be null.");
		}
		
		if(entity.getUserId() == null) {
			log.warn("Unknown user.");
			throw new RuntimeException("Unknown user");
		}
	}
	
	public List<TodoEntity> retrieve(final String userId, LocalDate todoDate) {
		return repository.findByUserIdAndTodoDate(userId, todoDate);
	}

    public List<TodoEntity> retrieveMonthTodo(final String userId, LocalDate startDate, LocalDate endDate) {
        return repository.findByUserIdAndTodoDateBetween(userId, startDate, endDate);
    }
	
	public List<TodoEntity> update(final TodoEntity entity){
		validate(entity);
		
		final Optional<TodoEntity> original = repository.findById(entity.getId());
		
		if(original.isPresent()) {
			final TodoEntity todo = original.get();
			todo.setTitle(entity.getTitle());
			todo.setDone(entity.isDone());
			repository.save(todo);
		}
		
		return retrieve(entity.getUserId(), entity.getTodoDate());
	}
	
	
	public List<TodoEntity> delete(final TodoEntity entity){
		validate(entity);
		
		try {
			repository.delete(entity);
		} catch(Exception e) {
			log.error("error deleting entity", entity.getId(), e);
			throw new RuntimeException("error deleting entity" + entity.getId());
		}
		
		return retrieve(entity.getUserId(), entity.getTodoDate());
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
}
