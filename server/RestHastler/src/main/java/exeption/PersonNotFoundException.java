package exeption;

public class PersonNotFoundException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public PersonNotFoundException(String id) {
		super(id);
	}
	
}
