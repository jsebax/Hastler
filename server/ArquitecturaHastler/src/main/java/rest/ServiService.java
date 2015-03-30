package rest;

import java.util.List;

import DTO.ServiDTO;

public interface ServiService {
	ServiDTO create(ServiDTO todo);
	 
	ServiDTO delete(String id)throws Exception ;
 
    List<ServiDTO> findAll();
 
    ServiDTO findById(String id)throws Exception ;
 
    ServiDTO update(ServiDTO todo)throws Exception ;
}
