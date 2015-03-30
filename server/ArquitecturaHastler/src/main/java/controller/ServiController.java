package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import exeption.ServiceNotFoundException;
import DTO.ServiDTO;
import rest.ServiService;

import javax.validation.Valid;

import java.util.List;
 
@RestController
@RequestMapping("/api/servi")
public class ServiController {
	 private final ServiService service;
	 
	    @Autowired
	    ServiController(ServiService service) {
	        this.service = service;
	    }
	 
	    @RequestMapping(method = RequestMethod.POST)
	    @ResponseStatus(HttpStatus.CREATED)
	    ServiDTO create(@RequestBody @Valid ServiDTO todoEntry) {
	        return service.create(todoEntry);
	    }
	 
	    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	    ServiDTO delete(@PathVariable("id") String id) throws Exception {
	        return service.delete(id);
	    }
	 
	    @RequestMapping(method = RequestMethod.GET)
	    List<ServiDTO> findAll() {
	        return service.findAll();
	    }
	 
	    @RequestMapping(value = "{id}", method = RequestMethod.GET)
	    ServiDTO findById(@PathVariable("id") String id) throws Exception {
	        return service.findById(id);
	    }
	 
	    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
	    ServiDTO update(@RequestBody @Valid ServiDTO todoEntry) throws Exception {
	        return service.update(todoEntry);
	    }
	 
	    @ExceptionHandler
	    @ResponseStatus(HttpStatus.NOT_FOUND)
	    public void handleTodoNotFound(ServiceNotFoundException ex) {
	    }

}
