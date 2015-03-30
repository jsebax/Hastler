package entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Servi")
public class Servi implements ServiceI {
	
	public static final int MAX_LENGTH_DESCRIPTION = 500;
	public static final int MAX_LENGTH_TITLE = 100;
	
	@Id
	private String id;

	private String description;
	
	private String title;
	
	private PersonI owner;
	
	
	
	public Servi(String description, String title, PersonI owner) {
		super();
		this.description = description;
		this.title = title;
		this.owner = owner;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public PersonI getOwner() {
		return owner;
	}

	public void setOwner(PersonI owner) {
		this.owner = owner;
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


	public void update(String title, String description, PersonI owner) throws Exception {
        checkTitleAndDescription(title, description);
 
        this.title = title;
        this.description = description;
        this.owner = owner;
    }
}
