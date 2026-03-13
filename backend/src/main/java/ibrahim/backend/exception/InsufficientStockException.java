package ibrahim.backend.exception;

public class InsufficientStockException extends RuntimeException {

    public InsufficientStockException(String message) {
        super(message);
    }

    public InsufficientStockException(int available, int requested) {
        super("Insufficient stock. Available: " + available + ", Requested: " + requested);
    }
}
