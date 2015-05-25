package repositories;

import java.util.List;

import entity.Servi;

public interface ServiRepository extends Repository {
	 void deleteServi(Servi deleted);
	 
	    List<Servi> findAllServi();
	 
	    Servi findOneServi(String id);
	    
	    List<Servi> findCategory(String category);
	 
	    Servi saveServi(Servi saved);
	    
	    Servi updateServi(String id, String toUp, Object update);

		List<Servi> findServi(String serviceName);

		List<Servi> findServiEmail(String email);

		Servi findServiId(String id);
}
