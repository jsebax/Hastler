package entity;

import java.util.Iterator;
import java.util.List;

import org.springframework.data.annotation.Id;

public class Match {
	
	@Id
	private String id;
	
	private String hastly;
	
	private String serviId;
	
	private List<String> users;

	public Match() {
		super();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getHastly() {
		return hastly;
	}

	public void setHastly(String hastly) {
		this.hastly = hastly;
	}

	public String getServiId() {
		return serviId;
	}

	public void setServiId(String serviId) {
		this.serviId = serviId;
	}

	public List<String> getUsers() {
		return users;
	}

	public void setUsers(List<String> users) {
		this.users = users;
	}
	
	public boolean findUser(String user){
		boolean result = false;
		for (Iterator<String> iterator = users.iterator(); iterator.hasNext();) {
			String string = (String) iterator.next();
			if(string.equals(user)){
				result = true;
				break;
			}
		}		
		return result;
	}
	
}
