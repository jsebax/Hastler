package DTO;


import entity.ProfileI;

public class PersonDTO {
	private String id;
	 
    private ProfileI profile;

	public PersonDTO() {
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
    
    
}