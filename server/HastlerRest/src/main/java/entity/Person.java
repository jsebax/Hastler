package entity;

import org.springframework.data.annotation.Id;

public class Person implements PersonI {
	@Id
	private String id;
	
	private ProfileI profile;

	
	public Person() {
		super();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public ProfileI getProfile() {
		return profile;
	}

	public void setProfile(ProfileI profile) {
		this.profile = profile;
	}
	
	public void update(ProfileI profile){
		this.profile = profile;
	}
	
}
