package entity;

public class Comment {
	
	private String email;
	private String name;
	private String content;
	private int calification;
	
	public Comment(){
		
	}
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public int getCalification() {
		return calification;
	}
	public void setCalification(int calification) {
		this.calification = calification;
	}
	
	
	
}