package entity;

public class Profile implements ProfileI {
	private String Name;

	public Profile(String name) {
		super();
		Name = name;
	}

	public String getName() {
		return Name;
	}

	public void setName(String name) {
		Name = name;
	}
	
	
}
