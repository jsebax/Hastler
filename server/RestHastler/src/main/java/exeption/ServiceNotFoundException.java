package exeption;

public class ServiceNotFoundException extends Exception {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public ServiceNotFoundException(String id) {
		super(id);
	}
}