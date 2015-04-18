package entity;

import org.springframework.data.annotation.Id;

public class Servi implements ServiceI {
	
	public static final int MAX_LENGTH_DESCRIPTION = 500;
	public static final int MAX_LENGTH_TITLE = 100;
	
	@Id
	private String id;

	private String serviceName;
	
	private String category;
	
	private String owner;	
	
	private String cellPhone;
	
	private String email;
	
	private String city;
	
	private String pic;
	
	private String hastly;		
	
	public Servi() {
		super();
	}

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getServiceName() {
		return serviceName;
	}
	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getOwner() {
		return owner;
	}
	public void setOwner(String owner) {
		this.owner = owner;
	}
	public String getCellPhone() {
		return cellPhone;
	}
	public void setCellPhone(String cellPhone) {
		this.cellPhone = cellPhone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getPic() {
		return pic;
	}
	public void setPic(String pic) {
		this.pic = pic;
	}
	public String getHastly() {
		return hastly;
	}
	public void setHastly(String hastly) {
		this.hastly = hastly;
	}
	
	private void notNull(String title2, String string) throws Exception {
		if(title2==null){
			throw new Exception (string);
		}
		
	}
	
	private void notEmpty(String title2, String string) throws Exception {
		if(title2.isEmpty()){
			throw new Exception (string);
		}
	}
	
	private void isLonger(int length, int maxLength) throws Exception {
		if(length <= maxLength){
        	throw new Exception ("this cannot be longer than"+ 
        			maxLength +"characters"); 
        }
		
	}
	
    private void checkTitleAndDescription(String title, String description) throws Exception {
        notNull(title, "Title cannot be null");
        notEmpty(title, "Title cannot be empty");
        isLonger(title.length(),MAX_LENGTH_TITLE);
 
        if (description != null) {
        	 isLonger(description.length(),MAX_LENGTH_DESCRIPTION);
        }
    }


	public void update(String serviceName, String description, String owner) throws Exception {
        checkTitleAndDescription(serviceName, description);
 
        this.serviceName = serviceName;
        this.category = description;
        this.owner = owner;
    }
}
