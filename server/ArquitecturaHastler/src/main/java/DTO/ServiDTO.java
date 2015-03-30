package DTO;

import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotEmpty;

import entity.Servi;

public class ServiDTO {
	private String id;
	 
    @Size(max = Servi.MAX_LENGTH_DESCRIPTION)
    private String description;
 
    @NotEmpty
    @Size(max = Servi.MAX_LENGTH_TITLE)
    private String title;
    
    private String owner;

	public ServiDTO() {
		super();
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

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}
    
    
}
