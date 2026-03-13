package ibrahim.backend.exception;

import lombok.experimental.StandardException;

@StandardException
public class exception extends RuntimeException {
    public exception(String message) {
        super(message);
    }
}

