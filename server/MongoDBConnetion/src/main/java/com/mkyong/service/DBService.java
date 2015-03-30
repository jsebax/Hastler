package com.mkyong.service;

import java.util.List;
import java.util.Optional;

import entity.Person;
import entity.Servi;
import entity.User;

public interface DBService {
	void deleteUser(User deleted);
	 
    List<User> findAllUser();
 
    Optional<User> findOneUser(String id);
 
    User saveUser(User saved);
    
    User updateUser(String id, String toUp, Object update);
    
    void deletePerson(Person deleted);
	 
    List<Person> findAllPerson();
 
    Optional<Person> findOnePerson(String id);
 
    Person savePerson(Person saved);
    
    Person updatePerson(String id, String toUp, Object update);
    
    void deleteServi(Servi deleted);
	 
    List<Servi> findAllServi();
 
    Optional<Servi> findOneServi(String id);
 
    Servi saveServi(Servi saved);
    
    Servi updateServi(String id, String toUp, Object update);
}
